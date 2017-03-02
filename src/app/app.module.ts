import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { CollapseModule } from 'ng2-bootstrap';
import { TimepickerModule } from 'ng2-bootstrap';
import { DatepickerModule } from 'ng2-bootstrap';
import { AccordionModule } from 'ng2-bootstrap';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { DragulaService, DragulaModule } from 'ng2-dragula/ng2-dragula';
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';

import { AppComponent } from './app.component';
import { HeaderMenu } from './components/header/header.component';
import { Menu } from './components/menu/menu.component';
import { OfflineBooking } from './components/offline_booking/offline_booking.component';
import { BannerHome } from './components/home/banner_home/banner.component';
import { PromotionsHome } from './components/home/promotions/promotions.component';
import { RecentBooking } from './components/home/recent_booking/recent_booking.component';
import { UpcomingEvents } from './components/home/upcoming/upcoming.component';
import { RecomendedServices } from './components/home/recomended_services/recomended_services.component';
import { BookGuest } from './components/signin/book_guest/book_guest.component';
import { BookGuestDetail } from './components/signin/book_guest_detail/book_guest_detail.component';
import { NoServices } from './components/browse_services/no_services/no_services.component';
import { ServiceGroup } from './components/browse_services/service_group/service_group.component';
import { TabsServiceGroup } from './components/browse_services/tabs_service_group/tabs_service_group.component';
import { ServiceList } from './components/browse_services/service_list/service_list.component';
import { AddToCartDialog } from './components/browse_services/add_to_cart/add_to_cart.component';
import { Cart } from './components/browse_services/cart/cart.component';
import { SearchAvailability } from './components/checkout/search_availability/search_availability.component';
import { RemoveDialog } from './components/dialogs/remove_dialog.component';
import { SetTime } from './components/checkout/set_time/set_time.component';
import { SetSpecificTime } from './components/checkout/specific_time/set_specific_time.component';
import { TherapistPreferenceDialog } from './components/checkout/therapist_preference/therapist_preference.component';
import { SelectTime } from './components/checkout/select_time/select_time.component';
import { NoAvailableTime } from './components/checkout/no_available_time/no_available.component';
import { CalendarDialog } from './components/checkout/calendar/calendar.component';
import { ConfirmDetails } from './components/checkout/confirm_details/confirm_details.component';
import { BookingComplete } from './components/checkout/booking_complete/booking_complete.component';
import { CongratulationMessage } from './components/congratulation_message/congratulation_msj.component';
import { GuaranteeDetail } from './components/checkout/guarantee_detail/guarantee_detail.component';
import { TabsLocation } from './components/multi_location/tabs_location/tabs_location.component';
import { LocationList } from './components/multi_location/location_list/location_list.component';
import { TabsSignIn } from './components/signin/tabs_signin/tabs_signin.component';
import { ForgotPasswordAccount } from './components/signin/forgot_pwd_account_details/forgot_password.component';
import { ForgotPasswordReset } from './components/signin/forgot_pwd_reset/forgot_password_reset.component';
import { ReturningGuest } from './components/signin/returning_guest/returning_guest.component';
import { SignUp } from './components/signin/sign_up/sign_up.component';
import { TabsRegister } from './components/signin/tabs_register/tabs_register.component';
import { RegisterExisting } from './components/signin/register_existing/register_existing.component';
import { RegisterDetails } from './components/signin/register_details/register_details.component';
import { SignInNoFacebook } from './components/signin/signin_no_facebook/no_facebook.component';
import { RegisterDisabled } from './components/signin/signin_register_disabled/register_disabled.component';
import { SpaInformation } from './components/browse_services/spa_information/spa_information.component';
import { TabsMyAccount } from './components/my_account/tabs_my_account/tabs_account.component';
import { MyProfile } from './components/my_account/my_profile/my_profile.component';
import { EditDetails } from './components/my_account/edit_details/edit_details.component';
import { EditAddress } from './components/my_account/edit_address/edit_address.component';
import { EditSignIn } from './components/my_account/edit_signin/edit_signin.component';
import { ServiceDescription } from './components/browse_services/service_description/service_description.component';
import { UpcomingAppointments } from './components/my_account/upcoming_appointments/upcoming_appointments.component';
import { LocationMap } from './components/multi_location/location_map/location_map.component';
import { LocationFilter } from './components/multi_location/location_filter/location_filter.component';
import { Settings } from './components/preferences/settings/settings.component';
import { LanguagePreferenceDialog } from './components/preferences/language_preference/language.component';
import { FAQ } from './components/settings/faq/faq.component';
import { TermsAndConditions } from './components/settings/terms/terms.component';
import { Policies } from './components/settings/policies/policies.component';
import { CartEmpty } from './components/browse_services/cart_empty/cart_empty.component';
import { CancelAppointment } from './components/my_account/cancel_appointment/cancel_appointment.component';
import { MessageCancel } from './components/my_account/message_cancel/message_cancel.component';
import { HtmlBinding } from './components/checkout/html_binding/html_binding.component';
import { BackKeyDialog } from './components/dialogs/back_key_dialog.component';
import { ErrorDialog } from './components/dialogs/error_dialog.component';

import { KSSwiperModule } from 'angular2-swiper';
//import { LocalStorageService, LOCAL_STORAGE_SERVICE_CONFIG } from 'angular-2-local-storage';
import { LocalStorageModule, ILocalStorageServiceConfig } from 'angular-2-local-storage';

import { AuthService } from './services/auth.service';
import { BrowseServicesService } from './services/services.service';
import { SiteSettingsService } from './services/sitesettings.service';
import { PromotionsService } from './services/promotions.service';
import { LocationsService } from './services/location.service';
import { CheckoutService } from './services/checkout.service';
import { Account } from './services/account.service';
import { LoginRegisterService } from './services/login_register.service';
import { ShareMessageService } from './services/share_message.service';
import { AppointmentService } from './services/appointment.service';

import { EqualValidator } from './directives/equal-validator.directive';
import { LimitToDirective } from './directives/limit-to.directive';

const appRoutes: Routes = [
   { path: '', component: BannerHome },
   { path: 'service_group/:id', component: TabsServiceGroup },
   { path: 'service_list', component: ServiceList },
   { path: 'no_services', component: NoServices },
   { path: 'offline', component: OfflineBooking },
   { path: 'cart', component: Cart },
   { path: 'search_availability', component: SearchAvailability },
   { path: 'booking_complete', component: BookingComplete },
   { path: 'location_search', component: TabsLocation },
   { path: 'signin', component: TabsSignIn },
   { path: 'forgot_password', component: ForgotPasswordAccount },
   { path: 'forgot_password_reset', component: ForgotPasswordReset },
   { path: 'signin_nofb', component: TabsSignIn },
   { path: 'register_disabled', component: RegisterDisabled },
   { path: 'register', component: TabsRegister },
   { path: 'my_account', component: TabsMyAccount},
   { path: 'service_description', component: ServiceDescription },
   { path: 'settings', component: Settings },
   { path: 'faq', component: FAQ },
   { path: 'terms', component: TermsAndConditions },
   { path: 'policies', component: Policies },
   { path: '**',redirectTo:'offline' }
];
/*let localStorageServiceConfig = {
   prefix: 'webMobile',
   storageType: 'localStorage'
};*/

@NgModule({
   declarations: [
      AppComponent,
      HeaderMenu,
      Menu,
      OfflineBooking,
      BannerHome,
      PromotionsHome,
      RecentBooking,
      UpcomingEvents,
      RecomendedServices,
      BookGuest,
      BookGuestDetail,
      NoServices,
      ServiceGroup,
      TabsServiceGroup,
      ServiceList,
      Cart,
      AddToCartDialog,
      SearchAvailability,
      RemoveDialog,
      SetTime,
      SetSpecificTime,
      TherapistPreferenceDialog,
      SelectTime,
      NoAvailableTime,
      CalendarDialog,
      ConfirmDetails,
      BookingComplete,
      CongratulationMessage,
      GuaranteeDetail,
      TabsLocation,
      LocationList,
      TabsSignIn,
      ForgotPasswordAccount,
      ReturningGuest,
      ForgotPasswordReset,
      SignUp,
      TabsRegister,
      RegisterExisting,
      RegisterDetails,
      SignInNoFacebook,
      RegisterDisabled,
      SpaInformation,
      TabsMyAccount,
      MyProfile,
      EditDetails,
      EditAddress,
      EditSignIn,
      ServiceDescription,
      UpcomingAppointments,
      LocationMap,
      LocationFilter,
      Settings,
      LanguagePreferenceDialog,
      FAQ,
      TermsAndConditions,
      Policies,
      CartEmpty,
      CancelAppointment,
      MessageCancel,
      HtmlBinding,
      BackKeyDialog,
      ErrorDialog,
      EqualValidator,
      LimitToDirective
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      MaterialModule.forRoot(),
      RouterModule.forRoot(appRoutes, { useHash: true }),
      KSSwiperModule,
      JsonpModule,
      CollapseModule,
      TimepickerModule,
      DatepickerModule,
      AccordionModule,
      AgmCoreModule.forRoot(),
      DragulaModule,
      DropdownModule,
      LocalStorageModule.withConfig({
            prefix: 'webMobile',
            storageType: 'localStorage'
        })
   ],
   providers: [
      AuthService,
      BrowseServicesService,
      DragulaService,
      SiteSettingsService,
      PromotionsService,
      LocationsService,
      CheckoutService,
      Account,
      LoginRegisterService,
      ShareMessageService,
      AppointmentService
   ],
   bootstrap: [AppComponent],
   entryComponents: [
      AddToCartDialog,
      RemoveDialog,
      SetTime,
      SetSpecificTime,
      TherapistPreferenceDialog,
      CalendarDialog,
      EditDetails,
      EditAddress,
      EditSignIn,
      LanguagePreferenceDialog,
      CancelAppointment,
      MessageCancel,
      BackKeyDialog,
      ErrorDialog
   ]
})
export class AppModule { 
   
   accountName = '';
   
   constructor(){
      console.log(window.location.href);
      var url = window.location.href.split('/');
      this.accountName = url[2].split('.')[0];
      
      localStorage.setItem("accountName", "spademoqa");
   }
}
