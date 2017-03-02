import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { LoginRegisterService } from '../../../services/login_register.service';
import { ShareMessageService } from '../../../services/share_message.service';

import { ErrorDialog } from '../../dialogs/error_dialog.component';

@Component({
  selector: 'returning_guest',
  templateUrl: 'returning_guest.html'
})

export class ReturningGuest {
   activeTab = 1;
   showPassword = false;
   input_password = "password";
   icon_password = "assets/images/icon_eye.png";
   showConfirm = false;
   input_confirm = "password";
   icon_confirm = "assets/images/icon_eye.png";
   showEmailOnly = false;
   loginData = {};
   displayErrorMessage = false;
   incorrectvalue = false;
   
   constructor(private router: Router,
    private loginRegisterService: LoginRegisterService,
    private shareMessageService: ShareMessageService,
    private location: Location) {
      this.loginData = {
         email: '',
         password: ''
      };

      if (localStorage.getItem("signinPage")) {
         localStorage.removeItem("signinPage");
      }   
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

   selectTab = function(index){
      this.activeTab = index;
   }

   onKey = function(event, inputModel){
      if(((inputModel.value).trim()).length == 0)
         this.incorrectvalue == true;
      else
         this.incorrectvalue = false;
   }
   
   signIn = function(loginData, emailModel, passwordModel){
      let errorMessageDialog = '';
      let parameters = {
         loginID: (loginData.email).trim(),
         password: (loginData.password).trim(),
         machineId: (loginData.email).trim(),
         isOnline: true,
         locationId: localStorage.getItem('locationId'),
         authenticationType: 1,
         numDaysTillTokenExp: 7
      };

      if(this.displayErrorMessage){
         this.displayErrorMessage = !this.displayErrorMessage;
         errorMessageDialog = '';
      }

      if((loginData.email).trim() == '' || (loginData.password).trim() == ''){
         errorMessageDialog = "Looks like you've got some incomplete fields.";
         this.openErrorDialog(errorMessageDialog, emailModel, passwordModel);
      }
      else{
         this.loginRegisterService.getUserToken(parameters)
            .subscribe(
            userToken => {
               if(userToken.token){
                  localStorage.setItem("userToken", userToken.token);
                  this.getCustomerProfile();
               }
            },
            error => {
               errorMessageDialog = "Please correct the following errors on the page: The email or password you entered is invalid";
               this.errorMessage = <any>error;
               this.openErrorDialog(errorMessageDialog);
            });
      }
   }

   openErrorDialog(message, emailModel, passwordModel){
      this.displayErrorMessage = true;
      this.incorrectvalue = true;
      this.shareMessageService.setMessage(message);
   }

   eventCloseMessage = function(event){
      this.displayErrorMessage = event.statusClose;
   }

   getCustomerProfile = function(){
      this.loginRegisterService.getCustomerProfile()
         .subscribe(
         customerProfile => {
            if(customerProfile.userAccount.isOnline){
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
            }
            else{
               localStorage.removeItem("userToken");
               let errorMessageDialog = "User is not available for online login.";
               this.openErrorDialog(errorMessageDialog);
            }
         },
         error => this.errorMessage = <any>error);
   }   

   forgotPassword = function(){
      localStorage.setItem("returnPath","/signin");
      this.router.navigate(['/forgot_password']);
      event.preventDefault();
   }
}