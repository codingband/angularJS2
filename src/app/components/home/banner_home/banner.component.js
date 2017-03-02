"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var BannerHome = (function () {
    function BannerHome() {
        this.next_message = "View our Promotions";
        this.welcome_message = "Welcome to Lusso Spa";
        this.welcome_text = "Unwind in your own tranquil oasis that will leave you feeling refreshed and revitalized.";
        this.hasPromotions = true;
        this.hasUpcomingEvents = true;
        this.clicked = true;
        this.hasRecomended = true;
        this.scrollDown = function () {
            this.clicked = true;
            /*var elem = angular.element(document.getElementById('contentScroll'));
            var contentS = document.getElementById('nextDiv');
            var scrollableContentController = elem.controller('scrollableContent');
            scrollableContentController.scrollTo(contentS);*/
        };
    }
    BannerHome = __decorate([
        core_1.Component({
            selector: 'banner_home',
            templateUrl: 'app/components/banner_home/banner_view.html'
        }), 
        __metadata('design:paramtypes', [])
    ], BannerHome);
    return BannerHome;
}());
exports.BannerHome = BannerHome;
//# sourceMappingURL=banner.component.js.map