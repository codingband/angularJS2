import { Component } from '@angular/core';

import { ShareMessageService } from '../../../services/share_message.service';

@Component({
  selector: 'register',
  templateUrl: 'tabs_register.html'
})
export class TabsRegister  {
   activeTab = 2;
   showSignUp = true;
   showRegister = false;
   showRegisterDetails = false;

   constructor(private shareMessageService: ShareMessageService){}

   selectTab = function(index){
      this.activeTab = index;
   }

   backToView = function(){
      this.showSignUp = !this.showSignUp;
      if(this.showRegister){
         this.showRegister = !this.showRegister;
      }
      if(this.showRegisterDetails){
         this.showRegisterDetails = !this.showRegisterDetails;
      }
   }
   signInOption = function(event){
      this.showRegister = event.statusEmail;
      this.showRegisterDetails = event.statusDetails;
      this.showSignUp = false;
   }
   openExistEmailForm = function(event){
      this.showRegister = event.existEmail;
      this.showRegisterDetails = false;
      this.showSignUp = false;

      if(event.existEmail){
         let existEmailEvent = {
            email: event.email
         }
         setTimeout(() => {
            this.shareMessageService.signOutBroadcast('existEmail', existEmailEvent);   
         }, 125);
         
      }
   }
}