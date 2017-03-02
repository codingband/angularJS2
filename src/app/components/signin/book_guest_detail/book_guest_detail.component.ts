import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'book_guest_detail',
  templateUrl: 'book_guest_detail.html'
})
export class BookGuestDetail  {
   activeTab = 2;
   showPassword = false;
   input_password = "password";
   icon_password = "assets/images/icon_eye.png";
   showConfirm = false;
   input_confirm = "password";
   icon_confirm = "assets/images/icon_eye.png";
   
   constructor(private router: Router) { }
   
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
   back = function () {
      console.log("click");
      //$location.url('/book_guest');
   };
   selectTab = function(index){
      this.activeTab = index;
   }
   
   continueDetails = function(){
      localStorage.setItem("activeTab","2");
      this.router.navigate(['/search_availability']);
   }
}