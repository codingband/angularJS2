import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import {Subscription} from 'rxjs/Subscription'

import { LocationsService } from '../../services/location.service';
import { AuthService } from '../../services/auth.service';

import { ShareMessageService } from '../../services/share_message.service';
import { AppointmentService } from '../../services/appointment.service';

import { LocationCommon } from '../../common/locations.common';

@Component({
   selector: 'menu',
   templateUrl: 'menu.html'
})
export class Menu implements OnInit {
   isopen = false;
   typeRegister = "signin";
   active = false;
   logOutStatus = false;
   logInStatus = false;
   registerStatus = false;
   locationId = 0;
   locationCount = 0;
   errorMessage;
   accountPreferences = [];
   displayRegister = false;
   locationCommon: LocationCommon;
   currentLocation;
   
   //status option menu
   signed_out = true;
   signed_in = false;
   only_login = false;
   isSignIn = false;
   userToken = '';
   locations = [];

   oldSelectedMenu = -1;

   menu_data = [
      {
         imgInactive: "assets/images/menu/default/icon_home.png",
         imgActive: "assets/images/menu/active/icon_home_active.png",
         name: "home",
         code: "home",
         display: true
      },
      {
         imgInactive: "assets/images/menu/default/icon_myaccount.png",
         imgActive: "assets/images/menu/active/icon_myaccount_active.png",
         name: "My Account",
         code: "account",
         display: true
      },
      {
         imgInactive: "assets/images/menu/default/icon_services.png",
         imgActive: "assets/images/menu/active/icon_services_active.png",
         name: "Services",
         code: "services",
         display: true
      },
      {
         imgInactive: "assets/images/menu/default/icon_about.png",
         imgActive: "assets/images/menu/active/icon_about_active.png",
         name: "About",
         code: "about",
         display: true
      },
      {
         imgInactive: "assets/images/menu/default/icon_preferences.png",
         imgActive: "assets/images/menu/active/icon_preference_active.png",
         name: "Preferences",
         code: "preferences",
         display: true
      }
   ];
   logout_data = {
      imgInactive: "assets/images/menu/default/icon_logout.png",
      imgActive: "assets/images/menu/active/icon_logout_active.png",
      name: "Sign Out",
      code: "signout"
   };
   login_data = {
      imgInactive: "assets/images/menu/default/icon_login.png",
      imgActive: "assets/images/menu/active/icon_login_active.png",
      name: "Login",
      code: "login"
   };
   register_data = {
      imgInactive: "assets/images/menu/default/icon_register.png",
      imgActive: "assets/images/menu/active/icon_register_active.png",
      name: "Register",
      code: "register"
   }

   constructor(private router: Router, 
    private location: Location, 
    private LocationsService: LocationsService,
    private authService: AuthService,
    private shareMessageService: ShareMessageService,
    private appointmentService: AppointmentService) {

      this.locationCommon = new LocationCommon();
      let actualPath = this.location.path();
      
      for(let i = 0; i < this.menu_data.length; i++){
         if(this.menu_data[i].code == "home" && actualPath == "")
            this.menu_data[i]['active'] = true;
         else if(this.menu_data[i].code == "account" && actualPath == "/my_account")
            this.menu_data[i]['active'] = true;
         else if((this.menu_data[i].code == "services" && actualPath == "/location_search"))
            this.menu_data[i]['active'] = true;
         else if((this.menu_data[i].code == "preferences" && actualPath == "/settings"))
            this.menu_data[i]['active'] = true;
         else
            this.menu_data[i]['active'] = false;
      }
   }

   ngOnInit() {
      if(!localStorage.getItem("account_preferences")) {
         this.shareMessageService.subscribeToken('accountPreference', (setPreferenceEvent) => {
            this.compareAccountPreference();
         });
      }
      else
         this.compareAccountPreference();
   }

   compareAccountPreference = function() {
      this.accountPreferences = JSON.parse(localStorage.getItem("account_preferences"));

      for (let i = 0; i < this.accountPreferences.length; i++) {
         if(this.accountPreferences[i].preferenceTypeName == "Allow Guest to Create Profile Online")
            if(this.accountPreferences[i].preferenceValue == 'Y')
               this.displayRegister = true;
      }
   }
   
   openMenu = function(event) {
      this.isopen = !this.isopen;
      this.userToken = localStorage.getItem("userToken");
      this.locations = JSON.parse(localStorage.getItem("locations"));
      this.currentLocation = JSON.parse(localStorage.getItem('current_user_position'));
      this.nearestLocation = this.locationCommon.getLocationsOrderBynearest(this.locations, this.currentLocation);

      if(this.userToken != '' && this.userToken)
         this.isSignIn = true;
      else
         this.isSignIn = false;

      if (this.isopen) {
         document.body.classList.add("block_body_scroll");
         switch (this.isSignIn) {
            case true:
               this.signed_out = true;
               this.only_login = false;
               this.signed_in = false;
               this.menu_data[1].display = true;
               break;
            default:
               this.signed_out = false;
               if(!this.displayRegister) {
                  this.signed_in = false;
                  this.only_login = true;
               }
               else {
                  this.signed_in = true;
                  this.only_login = false;
               }
               if(this.menu_data[1].code == "account")
                  this.menu_data[1].display = false; 
               break;
         }
      } 
      else {
         document.body.classList.remove("block_body_scroll");
      }
   }

   selectedOption = function(index, code) {
      this.isopen = !this.isopen;
      document.body.classList.remove("block_body_scroll");

      for(let i = 0; i < this.menu_data.length; i++){
         if(i == index && this.menu_data[i].code == code)
            this.menu_data[i].active = true;
         else
            this.menu_data[i].active = false;
      }

      switch (code) {
         case "home":
            this.router.navigate(['']);
            break;
         case "account":
            this.router.navigate(['/my_account']);
            break;
         case "services":
            if(this.locations.length> 1)
               this.router.navigate(['/location_search']);
            else{
               localStorage.setItem("activeTabServices", "1");
               this.router.navigate(['/service_group', this.locations[0].id]);
            }
            break;
         case "about":
            let location;
            localStorage.setItem("activeTabServices", "2");
            this.checkLocation();
            break;
         case "preferences":
            this.router.navigate(['/settings']);
            break;
      }
   }
   
   logOut = function() {
      this.logOutStatus = !this.logOutStatus;
      this.isopen = !this.isopen;
      document.body.classList.remove("block_body_scroll");
      localStorage.removeItem('userToken');
      localStorage.removeItem('customerProfile');
      localStorage.removeItem('appointments');
      this.router.navigate(['']);
      
      let logoutEvent = {
         path: this.location.path()
      }
      this.shareMessageService.signOutBroadcast('signout', logoutEvent);
   }
   
   logIn = function() {
      this.logInStatus = !this.logInStatus;
      this.isopen = !this.isopen;
      document.body.classList.remove("block_body_scroll");
      localStorage.setItem('backSignIn', this.location.path());
      localStorage.setItem('activeTabSignin', '1');
      this.router.navigate(['/signin']);
      
      let loginEvent = {
         path: this.location.path()
      }
      if(localStorage.getItem('continueButton'))
         localStorage.removeItem('continueButton');

      this.shareMessageService.signOutBroadcast('login', loginEvent);
   }
   
   registerFunction = function() {
      this.registerStatus = !this.registerStatus;
      this.isopen = !this.isopen;
      document.body.classList.remove("block_body_scroll");
      localStorage.setItem("backSignIn", this.location.path());
      localStorage.setItem("activeTabSignin", '2');
      this.router.navigate(['/signin']);

      
      if(localStorage.getItem('continueButton'))
         localStorage.removeItem('continueButton');

      if(this.location.path() == '/signin'){
         let registerEvent = {
            path: this.location.path()
         }
         this.shareMessageService.signOutBroadcast('registerEvent', registerEvent);
      }
      
   }

   checkLocation = function(){
      if(this.locations.length > 1) {
         if(localStorage.getItem("userToken")){
            this.appointmentService.getAppointments()
               .subscribe(
               dataAppointments => {
                  if(dataAppointments.length > 0){
                     let recentLocation = 0;
                     for(let i = dataAppointments.length - 1; i >= 0; i--){
                        for(let j = 0; j < this.nearestLocation.length; j++){
                           if(dataAppointments[i].locationId == this.nearestLocation[j].id && recentLocation == 0){
                              recentLocation = dataAppointments[i].locationId;
                           }
                        }
                     }
                     if(recentLocation > 0)
                        this.router.navigate(['/service_group', recentLocation]);
                     else
                        this.router.navigate(['/service_group', this.nearestLocation[0].id]);
                  }
                  else
                     this.router.navigate(['/service_group', this.nearestLocation[0].id]);
               },
               error => {
                  this.router.navigate(['/service_group', this.nearestLocation[0].id]);
                  this.errorMessage = <any>error
               });
         }
         else
            this.router.navigate(['/service_group', this.nearestLocation[0].id]);
      }
      else
         this.router.navigate(['/service_group', this.locations[0].id]);
   }
}