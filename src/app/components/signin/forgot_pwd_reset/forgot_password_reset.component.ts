import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
   selector: 'forgot_password_reset',
   templateUrl: 'forgot_password_reset.html'
})
export class ForgotPasswordReset {
   returnPath = "";
   signInPageUrl = "";
   
   constructor(private router: Router) { 
      if(localStorage.getItem("returnPath")){
         this.returnPath = localStorage.getItem("returnPath");
         localStorage.removeItem("returnPath");
      }
      if(localStorage.getItem("signinPage")){
         this.signInPageUrl = localStorage.getItem("signinPage");
      }
   }

   backToView = function(){
      if(this.returnPath != ""){
         this.router.navigate([this.returnPath]);
      }
   }
   
   signInPage = function(){
      this.router.navigate(['/signin']);
      /*if(this.signInPageUrl != ""){
         this.router.navigate([this.signInPageUrl]);
      }*/
   }
}