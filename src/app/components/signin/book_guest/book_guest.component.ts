import { Component,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'book_guest',
  templateUrl: 'book_guest.html'
})
export class BookGuest  {
   activeTab = 2;
   @Output() showDetailEvent: EventEmitter<any> = new EventEmitter();

   selectTab = function(index){
      this.activeTab = index;
   }
   showDetail = function(){
      this.showDetailEvent.emit({showDetail:true });
   }

}