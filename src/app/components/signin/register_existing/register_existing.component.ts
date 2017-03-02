import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import {Subscription} from 'rxjs/Subscription';

//import { User } from '../../../interfaces/user.interface';

import { ShareMessageService } from '../../../services/share_message.service';
import { LoginRegisterService } from '../../../services/login_register.service';

import { ValidationForm } from '../../../validation/validation_fields';

@Component({
   selector: 'register_existing',
   templateUrl: 'register_existing.html'
})
export class RegisterExisting {
   showFoundMessage = -1;
   showPassword = false;
   icon_password = "assets/images/icon_eye.png";
   input_password = "password";
   showConfirm = false;
   icon_confirm = "assets/images/icon_eye.png";
   input_confirm = "password";
   userExist = {
      email: '',
      password: '',
      confirmPassword: ''
   };
   validationField: ValidationForm;
   
   constructor(private router: Router,
    private shareMessageService: ShareMessageService,
    private loginRegisterService: LoginRegisterService,
    private location: Location) {
      this.validationField = new ValidationForm();

      this.shareMessageService.subscribeSignOut('existEmail', (existEmailEvent) => {
         this.userExist.email = existEmailEvent.email;
      });
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

   completeSingIn = function(modelUser, formExistEmail){
      event.preventDefault(); 
      let validMessage = '';
      modelUser.locationId = localStorage.getItem('locationId');

      modelUser.email = this.userExist.email;
      validMessage = this.validationField.validEmptyField(formExistEmail.form.controls, modelUser);

      if(validMessage != ''){
         this.openErrorDialog(validMessage);
      }
      else{
         validMessage = this.validationField.validConfirmPassword(formExistEmail.valid);
         if(validMessage != '')
            this.openErrorDialog(validMessage);
         else{
            this.checkRegisterUser(modelUser);
         }
      }
   }

   checkRegisterUser = function(modelUser){
      let errorMessageDialog = '';
      let parameters = {
         loginID: (modelUser.email),
         password: (modelUser.password).trim(),
         machineId: (modelUser.email),
         isOnline: true,
         locationId: modelUser.locationId,
         authenticationType: 1,
         numDaysTillTokenExp: 7
      };

      this.loginRegisterService.checkUser(parameters)
         .subscribe(
            userToken => {
               if(userToken.returnCodeValue == -502 || userToken.returnCodeValue == 201 || userToken.returnCodeValue == 200){
                  this.loginUser(modelUser);
               }else{
                  if(userToken.returnCodeValue == -504)
                     errorMessageDialog = "We were unable to log you in due to the following reason: NoCustomerFound";
                  else
                     errorMessageDialog = "Please correct the following errors on the page: You enter incorrect password.";
                  this.openErrorDialog(errorMessageDialog);
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
            if (localStorage.getItem("backSignIn") == "/search_availability") {
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

   openErrorDialog = function (message){
      if(this.displayErrorMessage) this.displayErrorMessage = false;

      setTimeout(() => {
         this.displayErrorMessage = true;
         this.shareMessageService.setMessage(message);
      }, 125);
   }

}