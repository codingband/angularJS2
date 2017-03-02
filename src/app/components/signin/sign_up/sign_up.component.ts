import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'sign_up',
  templateUrl: 'sign_up.html'
})
export class SignUp {
   @Output() openSignIn: EventEmitter<any> = new EventEmitter();

   signInEmail = function(value){
      if(value == "email"){
         this.openSignIn.emit({statusEmail:true, statusDetails: false });
      }else{
         this.openSignIn.emit({statusEmail:false, statusDetails: true });
      }
   }
   signInFacebook = function(){
      //this.openSignIn.emit({statusFacebook:true });
   }
}