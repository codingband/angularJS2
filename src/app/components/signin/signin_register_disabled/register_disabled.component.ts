import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'register_disabled',
  templateUrl: 'register_disabled.html'
})
export class RegisterDisabled {
   currentTitle="Sign In";
   showPassword = false;
   input_password = "password";
   icon_password = "assets/images/icon_eye.png";
   showConfirm = false;
   input_confirm = "password";
   icon_confirm = "assets/images/icon_eye.png";
   
   constructor(private router: Router) {
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
   
   signIn = function(){
      this.router.navigate(['']);
   }
   forgotPassword = function(){
      localStorage.setItem("returnPath","/register_disabled");
      this.router.navigate(['/forgot_password']);
      event.preventDefault();
   }
}