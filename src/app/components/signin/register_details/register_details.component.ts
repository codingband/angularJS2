import { Component, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../../interfaces/user.interface';

import { ShareMessageService } from '../../../services/share_message.service';
import { LoginRegisterService } from '../../../services/login_register.service';

import { ValidationForm } from '../../../validation/validation_fields';

@Component({
   selector: 'register_details',
   templateUrl: 'register_details.html'
})
export class RegisterDetails {
   showPassword = false;
   icon_password = "assets/images/icon_eye.png";
   input_password = "password";
   showConfirm = false;
   icon_confirm = "assets/images/icon_eye.png";
   input_confirm = "password";
   firstname = '';
   displayErrorMessage = false;
   user: User;
   errorFields = '';
   showAccountCheckbox = false;
   showPasswordContent = true;
   enableFields = false;
   checked = true;
   validField = false;
   validationField: ValidationForm;
   @Output() openExistEmail: EventEmitter<any> = new EventEmitter();
   
   constructor(private router: Router,
    private shareMessageService: ShareMessageService,
    private loginRegisterService: LoginRegisterService,
    private location: Location) {
      this.user = {
         firstname: '',
         lastname: '',
         email: '',
         phone: '',
         password: '',
         confirmPassword: '',
         locationId: 0
      }
      this.validationField = new ValidationForm();
      if(localStorage.getItem("backSignIn") == '/search_availability' && 
         localStorage.getItem('activeTabSignin') == '2' && localStorage.getItem("continueButton")){
         this.showAccountCheckbox = true;
      }
   }

   updateEmail = function(validEmail){
      if(validEmail.valid && this.showPasswordContent) {
         this.customerMatches(validEmail.value)
      }else{
         this.enableFields = false;
      }
   }

   customerMatches = function(email){
      this.loginRegisterService.getCustomerMatches(email)
         .subscribe(
            customerMatches => {
               if(customerMatches.length > 0) {
                  this.openExistEmail.emit({
                        existEmail: true,
                        email: email
                  });
               }
               else
                  this.enableFields = true;
            },
            error => {
            }
         );
   }
   
   showHidePassword = function () {
      this.showPassword = !this.showPassword;
      if (this.showPassword) {
         this.input_password = "text";
         this.icon_password = "assets/images/icon_eye_click.png"
      } else {
         this.input_password = "password";
         this.icon_password = "assets/images/icon_eye.png"
      }
   }

   showHideConfirm = function () {
      this.showConfirm = !this.showConfirm;
      if (this.showConfirm) {
         this.input_confirm = "text";
         this.icon_confirm = "assets/images/icon_eye_click.png"
      } else {
         this.input_confirm = "password";
         this.icon_confirm = "assets/images/icon_eye.png"
      }
   }

   eventCloseMessage = function(event){
      this.displayErrorMessage = event.statusClose;
   }

   displayPasswordContent = function(){
      this.showPasswordContent = !this.showPasswordContent;
   }

   completeRegister = function(modelUser: User, formRegisterDetails){

      modelUser.locationId = localStorage.getItem('locationId');
      event.preventDefault(); 

      this.validateData(modelUser, formRegisterDetails);
      
      if(formRegisterDetails.valid && this.validField){
         if(this.showPasswordContent){
            let UserData = {
               HomeAddress: null,
               HomePhone: null,
               UserAccount: {
                  //UserID: 1675991,
                  LoginID: modelUser.email.trim(),
                  Password: modelUser.password.trim(),
                  MachineId: modelUser.email.trim(),
                  IsOnline: true,
                  LocationId: modelUser.locationId,
                  AuthenticationType: 1,
                  NumDaysTillTokenExp: 7
               },
               SendPromoViaEmail: false,
               SendPromoViaMail: false,
               MobileNumber: modelUser.phone,
               //Id: 1675991,
               Lastname: modelUser.lastname.trim(),
               Firstname: modelUser.firstname.trim(),
               Email: modelUser.email.trim(),
               Birthday: null,
               BirthYear: 0,
               Sex: "N",
               Initials: null,
               Fullname: modelUser.firstname.trim() + " " + modelUser.lastname.trim(),
               IsMale: false,
               IsFemale: false
            }

            this.registerUser(modelUser, UserData);
         }else{
            let parameters = {
               email: modelUser.email,
               firstname: modelUser.firstname,
               lastname: modelUser.lastname,
               phone: modelUser.phone
            }
            this.selectOrCreateCustomer(parameters);
         }
      }
   }

   registerUser = function(modelUser, UserData) {
      let errorMessageRegister = '';

      this.loginRegisterService.register(modelUser.password.trim(), UserData)
      .subscribe(
         registerData => {
            localStorage.setItem("userToken", registerData.token);
            if(registerData.token != '')
               this.loginUser(modelUser);
            else{
               errorMessageRegister = "We were unable to log you";
               this.openErrorDialog(errorMessageRegister);
            }
         },
         error => {
            let errorJson = JSON.parse(error);
            let message = errorJson.message.split(":");

            if(error.indexOf("-505") > -1)
               this.openExistEmail.emit(
                  {
                     existEmail: true,
                     email: modelUser.email
                  }
               );

            if(message.length > 0){
               message = message[message.length - 1];
            }
                  
            errorMessageRegister = "We were unable to log you in due to the following reason: "+message;
                  
            this.openErrorDialog(errorMessageRegister);
            this.errorMessage = <any>error;
         });
   }

   selectOrCreateCustomer = function(parameters){
      let errorMessageRegister = '';

      this.loginRegisterService.selectOrCreateCustomer(parameters)
      .subscribe(
         customer => {
            localStorage.setItem('customerData', JSON.stringify(customer));

            if (localStorage.getItem("backSignIn") == "/search_availability") {
               this.location.back(localStorage.getItem("backSignIn"));
               localStorage.removeItem("backSignIn");
               localStorage.setItem("tabConfirm", "2");
            }
         },
         error => {
            console.log("error", error)
         });
   }

   loginUser = function(modelUser){
      let errorMessageDialog = '';
      let parameters = {
         loginID: (modelUser.email).trim(),
         password: (modelUser.password).trim(),
         machineId: (modelUser.email).trim(),
         isOnline: true,
         locationId: modelUser.locationId,
         authenticationType: 1,
         numDaysTillTokenExp: 7
      };

      this.loginRegisterService.getUserToken(parameters)
            .subscribe(
            userToken => {
               if(userToken.token){
                  localStorage.setItem("userToken", userToken.token);
                  this.getCustomerProfile();
               }
            },
            error => {
               let errorJson = JSON.parse(error);
               let message = errorJson.message.split(":");

               if(message.length > 0){
                  message = message[message.length - 1];
               }

               errorMessageDialog = "We were unable to log you in due to the following reason: "+message;
               this.errorMessage = <any>error;
               this.openErrorDialog(errorMessageDialog);
            });
   }

   getCustomerProfile = function(){
      this.loginRegisterService.getCustomerProfile()
         .subscribe(
         customerProfile => {
            localStorage.setItem("customerProfile", JSON.stringify(customerProfile));
            if (localStorage.getItem("backSignIn") == "/search_availability" && 
             localStorage.getItem("continueButton")) {
               this.location.back(localStorage.getItem("backSignIn"));
               localStorage.removeItem("backSignIn");
               localStorage.setItem("tabConfirm", "2");
            } else {
               localStorage.removeItem("backSignIn");
               this.router.navigate(['']);
            }
         },
         error => this.errorMessage = <any>error);
   }

   validateData = function(modelUser, formRegisterDetails){
      this.validField = true;
      let password = modelUser.password;
      let confirmPassword = modelUser.confirmPassword;
      let validMessage = '';
      let email = modelUser.email;
      let phone = modelUser.phone;

      if(!this.showPasswordContent)
         validMessage = this.validationField.validEmptyField(formRegisterDetails.form.controls, modelUser);
      else
         validMessage = this.validationField.validEmptyField(formRegisterDetails.form.controls, modelUser);

      if(validMessage != ''){
         this.openErrorDialog(validMessage);
      }
      else{
         if (email) {
            validMessage = this.validationField.validEmaiFormat(email);
            if (validMessage != '') {
               this.openErrorDialog(validMessage);
            } else {
               if (phone) {
                  validMessage = this.validationField.validOnlyNumber(phone);
                  if (validMessage != '') {
                     this.openErrorDialog(validMessage);
                      this.validField = false;
                  } else {
                     if (password && confirmPassword) {
                        validMessage = this.validationField.validConfirmPassword(formRegisterDetails.controls.confirmPassword.valid);
                        if (validMessage != '') {
                           this.openErrorDialog(validMessage);
                        } else {
                           validMessage = this.validationField.validMaxLength(formRegisterDetails.form.controls, modelUser);
                           if (validMessage != '') {
                              this.openErrorDialog(validMessage);
                              this.validField = false;
                           }
                        }
                     }
                  }
               }
            }
         }
      }
   }

   openErrorDialog = function (message) {
      if(this.displayErrorMessage) this.displayErrorMessage = false;

      setTimeout(() => {
         this.displayErrorMessage = true;
         this.shareMessageService.setMessage(message);
      }, 125);
   }
}