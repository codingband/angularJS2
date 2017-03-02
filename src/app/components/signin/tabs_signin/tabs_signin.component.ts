import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ShareMessageService } from '../../../services/share_message.service';

@Component({
   selector: 'signin',
   templateUrl: 'tabs_signin.html'
})
export class TabsSignIn {
   activeTab = 1;
   currentTitle = "Sign In";
   showNewGuestForm = true;
   accountPreferences = [];
   displayRegister = false;
   existEmailEvent = {
      email: ''
   };

   constructor(private router: Router, private location: Location,
    private shareMessageService: ShareMessageService) {
       this.accountPreferences = JSON.parse(localStorage.getItem("account_preferences"));
       
       if(localStorage.getItem("backSignIn") == '/search_availability' && 
          localStorage.getItem('activeTabSignin') == '2' &&
          localStorage.getItem("continueButton")) {
          this.currentTitle="Book as a New Guest";
          this.activeTab = 2;
       }else{
          if(localStorage.getItem('activeTabSignin') == '2') {
               this.currentTitle="Register";
               this.activeTab = 2;
          }
       }
       this.subscribeRegister();
       this.subscribeLogin();
       this.getPreference();  
   }   
   
   subscribeRegister = function() {
      this.shareMessageService.subscribeSignOut('registerEvent', (registerEvent) => {
         if (registerEvent.path == '/signin' && localStorage.getItem('activeTabSignin') == '2') {
            this.currentTitle="Register";
            this.activeTab = 2;
         }
      });
   }

   subscribeLogin = function() {
      this.shareMessageService.subscribeSignOut('login', (loginEvent) => {
         if (loginEvent.path == '/signin' && localStorage.getItem('activeTabSignin') == '1') {
            this.currentTitle="Sign in";
            this.activeTab = 1;
         }
      });
   }

   selectTab = function(index) {
      this.activeTab = index;
      this.changeTitle(index);
      localStorage.setItem('activeTabSignin', index);

      if(index == 2 && this.showRegisterExisting){
         setTimeout(() => {
            this.shareMessageService.signOutBroadcast('existEmail', this.existEmailEvent);   
         }, 125);
      }
   }

   changeTitle = function(index) {
      switch (index) {
         case 1:
            this.currentTitle = "Sign In";
            break;
         default:
            if(localStorage.getItem("backSignIn") == '/search_availability' && 
             localStorage.getItem("continueButton"))
               this.currentTitle = "Book as a New Guest";
            else
               this.currentTitle = "Register";
            break;
      }
   }

   backToView = function() {
      if(localStorage.getItem('backSignIn')) {
         let route = localStorage.getItem('backSignIn');
         localStorage.removeItem('backSignIn');
         if(route == '')
            this.router.navigate(['']);
         else
            this.location.back(route);
      }
      else 
         this.router.navigate(['']);
   }

   openExistEmailForm = function(event){
      if(event.existEmail){
         this.showNewGuestForm = false;
         this.existEmailEvent.email = event.email;
         setTimeout(() => {
            this.shareMessageService.signOutBroadcast('existEmail', this.existEmailEvent);   
         }, 125);
      }
   }
   
   getPreference = function () {
      for (let i = 0; i < this.accountPreferences.length; i++) {
         if (this.accountPreferences[i].preferenceTypeName == 'Allow Guest to Create Profile Online')
            if (this.accountPreferences[i].preferenceValue == 'Y')
               this.displayRegister = true;
      }
   }
}