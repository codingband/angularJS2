import { Component} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
   selector: 'header_menu',
   templateUrl: 'header.html'
})
export class HeaderMenu {
   cart='';
   constructor(private router: Router, private location: Location) {
      this.cart=JSON.parse(localStorage.getItem('cart'));
   }
   
   goCart = function(){
      if(this.location.path() != "/cart"){
         this.router.navigate(['/cart']);
      }
   }
   
   goHome = function(){
      if(this.location.path() != ""){
         this.router.navigate(['']);
      }
   }
   getCart = function(){
     var res='';
     this.cart=JSON.parse(localStorage.getItem('cart'));
           switch(this.cart.length){
                case 0:
                    res='assets/images/cart/cart.png'
                    break;
                case 1:
                    res='assets/images/cart/cart1.png'
                    break;
                case 2:
                    res='assets/images/cart/cart2.png'
                    break;
                case 3:
                    res='assets/images/cart/cart3.png'
                    break;
                case 4:
                    res='assets/images/cart/cart4.png'
                    break;
                case 5:
                    res='assets/images/cart/cart5.png'
                    break;                                                                      
                default:
                    res='assets/images/cart/cart.png'        
            }
     return res;
   }
}