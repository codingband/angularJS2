import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import { SiteSettingsService } from '../../../services/sitesettings.service';
import { PromotionsService } from '../../../services/promotions.service';
import { LocationsService } from '../../../services/location.service';
import { ShareMessageService } from '../../../services/share_message.service';
import { AppointmentService } from '../../../services/appointment.service';

@Component({
   selector: 'banner_home',
   templateUrl: 'banner_view.html'
})

export class BannerHome implements OnInit {
   siteCss = "";
   next_message = "View our latest promotions";
   welcome_message = "Welcome to Lusso Spa";
   home_page_text = "";
   home_page_image = "./assets/images/home/background_home.png";
   hasPromotions = false;
   hasUpcomingEvents = false;
   hasRecentBooking = false;
   clicked = true;
   hasRecomended = false;
   service_option = "service group";
   promotions = [];
   locationId = 0;
   locationCount = 0;
   errorMessage;
   username: string = '';

   constructor(
    private siteSettings: SiteSettingsService,
    private router: Router,
    private PromotionsService: PromotionsService,
    private LocationsService: LocationsService,
    private shareMessageService : ShareMessageService,
    private appointmentService: AppointmentService) { 
      if(localStorage.getItem('userToken') && 
         localStorage.getItem('customerProfile')){
         let customerProfile = JSON.parse(localStorage.getItem('customerProfile'));
         this.username = "Welcome " + customerProfile.firstname;
         this.getAppointmentsData();
         
      }
      this.subscribeSignOut();
   }

   ngOnInit() {
      if(!localStorage.getItem("accountToken")){
         this.suscribeToken();
      }else{
         this.getSiteSettings();
         this.getPromotion();
         this.getLocation();
      }
   }
   
   subscribeSignOut = function() {
      this.shareMessageService.subscribeSignOut('signout', (logoutEvent) => {
         this.hasUpcomingEvents = false;
         this.hasRecentBooking = false;
         if (!localStorage.getItem('customerProfile')) {
            this.username = "";
         }
         if (logoutEvent.path == "") {
            this.getSiteSettings();
         }
      });
   }

   suscribeToken = function(){
      this.shareMessageService.subscribeToken('token', (setTokenEvent) => {
         this.getSiteSettings();
         this.getPromotion();
         this.getLocation();
      });
   }

   getAppointmentsData = function(){
      this.appointmentService.getAppointments()
         .subscribe(
         dataAppointments => {
            localStorage.setItem('appointments', JSON.stringify(dataAppointments));
            this.hasUpcomingEvents = !this.hasUpcomingEvents;
            this.hasRecentBooking = !this.hasRecentBooking;
         },
         error => this.errorMessage = <any>error);
   }

   getLocation = function() {
      this.LocationsService.getLocations()
         .subscribe(
         locations => {
            if (locations.length > 0) {
               this.locationId = locations[0].id;
               localStorage.setItem('locationId', locations[0].id);
            }
            
            this.locationCount = locations.length;
         },
         error => this.errorMessage = <any>error);
   }

   getPromotion = function() {
      this.PromotionsService.getPromotions()
         .subscribe(
         promotions => {
            this.promotions = promotions;

            if (this.promotions.length > 0) {
               this.hasPromotions = true;
            }
         },
         error => this.errorMessage = <any>error);
   }
   getSiteSettings = function() {
      this.siteSettings.getSiteSettings()
         .subscribe(
         site_settings => {
            this.home_page_text = site_settings.homePageText;
            
            if(this.username != ''){
               let welcomeArray = site_settings.welcomeMessage.split('<h1>')[1].split('</h1>');
               this.welcome_message = "<h1>" + this.username +"</h1>" + welcomeArray[1];
            }else{
               this.welcome_message = site_settings.welcomeMessage;
            }

            this.home_page_image = site_settings.homePageImage;
            this.siteCss = site_settings.siteCss;
            
            //Method 2 inject css style at runtime
            //let rule = 'button.wm_button{ background: #ff00ff; width: 100%; border: none; color: #FFFFFF; text-align: center; box-shadow: none;}'
            //let rule  = '.content_title_cart {background-color: yellow; border: 2px solid red}.content_title_cart h1 {color: red; font-size:30px}';
            this.cssEngine(this.siteCss);
            

            /*
            //Method 1 Link change                     
            let body = document.getElementsByTagName('body')[0];
            document.getElementById('theme').setAttribute('href',
            'https://s3.amazonaws.com/B4TCustomerCss/spademoqa/common.css');
            */
         },
         error => this.errorMessage = <any>error);
   }

   goServiceLocation = function() {
      if (this.locationCount > 1) {
         this.router.navigate(['/location_search']);
      }
      else {
         this.router.navigate(['/service_group', this.locationId]);
      }
   }

 /*backWebSite = function(){
      window.location.href='https://spademoqa.book4time.eu/OnlineBookingQA';
   }*/

   scrollDown = function() {
      this.clicked = true;
      let scrollBanner = document.getElementById('contentScroll').clientHeight;
      let scrollNextDiv = document.getElementById('nextDiv').clientHeight;
      let scrollPromotions = document.getElementById('container_promotions').clientHeight;
      let body = document.getElementsByTagName('body')[0];
      let allScroll = scrollBanner + (scrollNextDiv - scrollPromotions) - body.scrollTop;

      window.scrollBy(0, allScroll);

   };

   cssEngine = function(rule) {
      let css = document.createElement('style');
      css.type = 'text/css';
      //console.log("css", css);

      css.appendChild(document.createTextNode(rule));
      document.getElementsByTagName("head")[0].appendChild(css);
   }
}
