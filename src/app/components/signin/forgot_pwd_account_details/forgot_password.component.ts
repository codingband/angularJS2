import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginRegisterService } from '../../../services/login_register.service';
import { ShareMessageService } from '../../../services/share_message.service';

@Component({
   selector: 'forgot_password_account',
   templateUrl: 'forgot_password.html'
})
export class ForgotPasswordAccount {
   returnPath = "";
   incorrectvalue = false;
   displayErrorMessage = false;
   forgotPwData = {};
   forgotPassword = [];
   invalidEmail = false;
   invalidLastName = false;
   
   constructor(private router: Router,
               private loginRegisterService: LoginRegisterService,
               private shareMessageService: ShareMessageService) { 
      if(localStorage.getItem("returnPath")){
         this.returnPath = localStorage.getItem("returnPath");
         localStorage.removeItem("returnPath");
      }
      this.forgotPwData = {
         lastName: '',
         email: ''
      }    
   }

   onKey = function(event, inputModel, form){
      if(form){
         if(inputModel.name == "lastName" && ((inputModel.value).trim()).length == 0 && this.invalidLastName)
            this.invalidLastName = false;
         if(inputModel.name == "email" && ((inputModel.value).trim()).length == 0 && this.invalidEmail)
            this.invalidEmail = false;
      }
   }

   backToView = function () {
      if (this.returnPath != '') {
         this.router.navigate([this.returnPath]);
      } else {
         if (localStorage.getItem("signinPage")) {
            let signIn = localStorage.getItem("signinPage");
            this.router.navigate([signIn]);
         }else{
            this.router.navigate(['/signin']);
         }
      }
   }
   
   resetPassword = function (formValid, emailValid, event) {
      event.preventDefault();
      let errorMessageDialog = '';

      if (this.displayErrorMessage) {
         this.displayErrorMessage = !this.displayErrorMessage;
         errorMessageDialog = '';
      }
      if (formValid) {
         this.loginRegisterService.getCustomerMatches(this.forgotPwData.email)
            .subscribe(
            customerMatches => {
               if(customerMatches.length > 0){
                  let foundUser = false;
                  for(let i = 0; i < customerMatches.length; i++){
                     if((customerMatches[0].lastname).toLowerCase() == ((this.forgotPwData.lastName).trim()).toLowerCase())
                        foundUser = true;
                  }
                  if(foundUser)
                     this.sendForgotPassword();
                  else{
                     this.invalidLastName = true;
                     this.invalidEmail = false;
                     errorMessageDialog = "Please correct the following errors on the page: The Last Name you entered is invalid.";
                     this.openErrorDialog(errorMessageDialog);
                  }
               }
               else{
                  this.invalidEmail = true;
                  this.invalidLastName = false;
                  errorMessageDialog = "Please correct the following errors on the page: The Email Address you entered is invalid.";
                  this.openErrorDialog(errorMessageDialog);
               }
            },
            error => {
            });
      } else {
         if ((this.forgotPwData.lastName).trim() == '' || (this.forgotPwData.email).trim() == '') {

            errorMessageDialog = "Looks like you have some incomplete fields.";
            this.openErrorDialog(errorMessageDialog);

         } else {
            if (!emailValid) {
               errorMessageDialog = "Looks like you've entered an invalid email or last name. Please try again.";
               this.openErrorDialog(errorMessageDialog);
            }
         }
      }
   }

   sendForgotPassword = function(){
      this.loginRegisterService.sendForgotPassword(this.forgotPwData.email)
         .subscribe(
            forgotPassword => {
               localStorage.setItem("returnPath", "/forgot_password");
               if (!localStorage.getItem("signinPage")) {
                  localStorage.setItem("signinPage", this.returnPath);
               }
               this.router.navigate(['/forgot_password_reset']);
            },
         error => {
         });
   }
   
   openErrorDialog(message) {
      setTimeout(() => {
         this.displayErrorMessage = true;
         this.shareMessageService.setMessage(message);
      }, 125);
   }

   eventCloseMessage = function (event) {
      this.displayErrorMessage = event.statusClose;
   } 
}