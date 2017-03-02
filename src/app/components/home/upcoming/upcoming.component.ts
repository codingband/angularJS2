import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {KSSwiperContainer, KSSwiperSlide} from 'angular2-swiper';

@Component({
  selector: 'upcoming_events',
  templateUrl: 'upcoming_events.html'
})
export class UpcomingEvents{
   user_name = "";
   upcoming_inf = [];

  eventsSwipeOptions: any;

   constructor(private router: Router) {
      this.eventsSwipeOptions = {
         slidesPerView: 1,
         loop: false,
         spaceBetween: 5,
         pagination: '.swiper-pagination',
         paginationType: "progress"
      };
      let customerProfile = JSON.parse(localStorage.getItem('customerProfile'));
      this.user_name = customerProfile.firstname;
      this.upcoming_inf = JSON.parse(localStorage.getItem('appointments'));
   }

   getTime = function(startTime) {
      let result = ""
      if (startTime > 0) {
         let start_time = startTime / 60;
         let start_min = "00";

         if (start_time - Math.floor(start_time) != 0) {
            start_time = Math.floor(start_time);
            let start_minutes = startTime - (start_time * 60);

            if (start_minutes < 10) start_min = "0" + start_minutes;
            else start_min = start_minutes.toString();
         }
         let start_ampm = start_time >= 12 ? 'pm' : 'AM';

         start_time = start_time % 12;
         start_time = start_time ? start_time : 12;

         result = start_time + ":" + start_min + ' ' + start_ampm;
      }
      return result;
   }


   goMyAccount = function(){
      localStorage.setItem("activeTab","2");
      this.router.navigate(['/my_account']);
   }
   
}