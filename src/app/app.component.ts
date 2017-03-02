import { Component, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { AuthService } from './services/auth.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { LocationsService } from './services/location.service';
import { Account } from './services/account.service';
import { CheckoutService } from './services/checkout.service';
import { ShareMessageService } from './services/share_message.service';

import { BannerHome } from './components/home/banner_home/banner.component';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})

export class AppComponent {
   title = "app works!";
   isopenMenu = false;
   menu_data = '';
   logout_data = '';
   login_data = '';
   register_data = '';
   errorMessage;
   cart = [];
   addons = [];
   position = [];
   locationId = 0;
   displayHome = true;
   websiteSpa = '';
   accountPreferences = [];
   locationCount = '';
   year = new Date().getFullYear();

   constructor(private authService: AuthService,
    private localStorageService: LocalStorageService,
    private location: Location,
    private router: Router,
    private locationsService: LocationsService,
    private account: Account,
    private checkoutService: CheckoutService,
    private shareMessageService: ShareMessageService) {
      var currentPosition = {
         latitude: 0,
         longitude: 0
      };

      localStorage.removeItem('location_filter');
      if (localStorage.getItem("current_user_position") == null) {
         localStorage.setItem("current_user_position", JSON.stringify(currentPosition));
      }
      
      if (localStorage.getItem("cart") == null) {
         localStorage.setItem("cart", JSON.stringify(this.cart));
      }
      if (localStorage.getItem("addons") == null) {
         localStorage.setItem("addons", JSON.stringify(this.addons));
      }
      if(localStorage.getItem("locationId") == null){
         localStorage.setItem("locationId", '0');
      }
   }

   ngOnInit() {
      /*console.log(window.location.href);
      var url = window.location.href.split('/');
      this.accountName = url[2].split('.')[0];
      */
      //localStorage.setItem("accountName", this.accountName);
      this.getToken();
      //this.getPosApi();      
      this.getCurrentLocation();
   }

   getToken() {
      this.authService.getToken()
         .subscribe(
         data => {
            // localStorage.setItem("accountName", data.accountName);
            localStorage.setItem("accountToken", data.accountToken);
            let setTokenEvent = {
               token: localStorage.getItem("accountToken")
            };
            this.shareMessageService.getTokenBroadcast("token", setTokenEvent);

            this.getAccountPreferences();
            this.getRequest();
            this.getLocation();
         },
         error => this.errorMessage = <any>error);
   }
   
   getRequest = function() {
      this.checkoutService.getRequestTypes()
         .subscribe(
         request_types => {
            for (let i = 0; i < request_types.length; i++) {
               if(request_types[i].id == 601)
                  request_types[i]["checked"] = true;
               else if(request_types[i].id == 603) 
                  request_types[i]["code"] = "female";
               else if(request_types[i].id == 604)
                  request_types[i]["code"] = "male";
               else if(request_types[i].id == 602)
                  request_types[i]["code"] = "request";
            }
            if(request_types.length > 0)
               localStorage.setItem('requestTypes', JSON.stringify(request_types));
            else
               localStorage.setItem('requestTypes', '[]');
         },
         error => this.errorMessage = <any>error);
   }

   isHidden = function() {
      let list = ["/offline"], route = this.location.path();
      return (list.indexOf(route) > -1);
   }
   
   getPosApi = function() {
      this.locationsService.getPosition()
         .subscribe(
         position => {
            let currentUserPosition = {
               latitude: position.location.lat,
               longitude: position.location.lng
            };
            localStorage.setItem("current_user_position", JSON.stringify(currentUserPosition));
         },
         error => this.errorMessage = <any> error);
   }
   
   getAccountPreferences = function() {
      this.account.getAccountPreferences()
         .subscribe(
         data => {
            localStorage.setItem("account_preferences", JSON.stringify(data));
            let setPreferenceEvent = {
               preferences: true
            }
            this.getUrlOfflineBooking();
         },
         error => this.errorMessage = <any>error);
   }  

   getCurrentLocation = function() {
      let currentPosition = {
         latitude: 0,
         longitude: 0
      };

      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
            function (position) {
               currentPosition.latitude = position.coords.latitude;
               currentPosition.longitude = position.coords.longitude;

               localStorage.setItem("current_user_position", JSON.stringify(currentPosition));
            },
            function (error) {
               localStorage.setItem("current_user_position", JSON.stringify(currentPosition));
            }, {
               enableHighAccuracy: true
               , timeout: 5000
            }
         );
      }
   }  

   getLocation = function() {
      this.locationsService.getLocations()
         .subscribe(
         locations => {
            if(locations.length > 0){
               this.displayHome = true;
               localStorage.setItem("locations", JSON.stringify(locations));
            }
            else{
               localStorage.setItem("locations", "[]");
               this.displayHome = false;
            }
      },
      error => this.errorMessage = <any>error);
   }

   getUrlOfflineBooking = function() {
      
      this.accountPreferences = JSON.parse(localStorage.getItem("account_preferences"));

      for (let i = 0; i < this.accountPreferences.length; i++) {
         if(this.accountPreferences[i].preferenceTypeName == "FAQ URL")
            this.websiteSpa = this.accountPreferences[i].preferenceValue;
      }
   }
}
