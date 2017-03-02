import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
   selector: 'recent_booking',
   templateUrl: 'recent_booking.html'
})
export class RecentBooking {
   user_name = "";
   recent_booking_inf = [];

   recentBookingSwipeOptions: any;

   constructor(private router: Router) {
      this.recentBookingSwipeOptions = {
         slidesPerView: 1,
         loop: false,
         spaceBetween: 5,
         pagination: '.swiper-pagination',
         paginationType: "progress"
      };
      let customerProfile = JSON.parse(localStorage.getItem('customerProfile'));
      this.user_name = customerProfile.firstname;
      this.recent_booking_inf = JSON.parse(localStorage.getItem('appointments'));
      this.ShorterByHighDate();
   }
   
   bookAgain = function(){
      this.router.navigate(['/cart']);
   }

   ShorterByHighDate = function() {
     this.recent_booking_inf.sort((a,b) => {
      if (a.date > b.date) {
         return -1;
      }
      else if(a.date < b.date) {
         return 1;
      }
      else return 0;
      });
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
}