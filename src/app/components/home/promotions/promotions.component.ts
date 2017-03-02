import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
   selector: 'promotions_home',
   templateUrl: 'promotions.html'
})
export class PromotionsHome implements OnChanges {
   @Input() promotions: any[] = [];
   typeRegister = "signin";
   addon_service = [];
   servicesInCard = [];

   constructor(private router: Router) {
      localStorage.setItem('promotions', this.promotions.length.toString());
      if (this.promotions.length > 0) {
         document.getElementById("container_padding").style.paddingBottom = "20px";
      } else {
         //document.getElementById("container_padding").style.paddingBottom = "56px";
      }
      //console.log(this.promotions);
   }
   ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
      let log: string[] = [];
      for (let propName in changes) {
         let changedProp = changes[propName];
         let from = JSON.stringify(changedProp.previousValue);
         let to = JSON.stringify(changedProp.currentValue);
         log.push(`${propName} changed from ${from} to ${to}`);

         if (propName == "promotions") {
            this.promotions = changedProp.currentValue;
         }

      }
      //console.log(log.join(', '));
   }

   bookNow = function(promotions) {
      //console.log(promotions)
      this.router.navigate(['/cart']);
   }

   goRegister = function() {
      if (this.typeRegister == "register") {
         this.router.navigate(['/register']);
      }
      else {
         localStorage.setItem("activeTab", "2");
         this.router.navigate(['/signin']);
      }
   }
}