import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class LoginRegisterService {
   private username = localStorage.getItem("accountName");
   private baseUrl = "https://" + this.username +
   ".book4time.eu/book4timeapiqa/api/";  // URL to web API
   private getUserTokenUrl = this.baseUrl + "Account/Login";
   private getCustomerProfileUrl = this.baseUrl + "Customer/GetCustomerProfile";
   private sendForgotPasswordUrl = this.baseUrl + "Account/SendForgotPassword";   
   private registerUrl = this.baseUrl + "Account/Register";
   private checkUserUrl = this.baseUrl + "Account/CheckUser";
   private selectOrCreateCustomerUrl = this.baseUrl + "Customer/SelectOrCreateCustomer";
   private getCustomerMatchesUrl = this.baseUrl + "Customer/GetCustomerMatches";

   private options;
   private headers = new Headers({ 'Content-Type': 'application/json' })

   constructor(private http: Http) { }

   getUserToken = function(parameters) {
      this.options = new RequestOptions();
      this.headers.set("accountToken", localStorage.getItem("accountToken"));
      this.options.headers = this.headers;

      return this.http.post(this.getUserTokenUrl, parameters, this.options)
         .map(this.extractData)
         .catch(this.handleError);
   }

   getCustomerProfile = function(){
      this.options = new RequestOptions();
      this.headers.set("accountToken", localStorage.getItem("accountToken"));
      this.headers.set("userToken", localStorage.getItem("userToken"));
      this.options.headers = this.headers;

      return this.http.get(this.getCustomerProfileUrl, this.options)
         .map(this.extractData)
         .catch(this.handleError);
   }
   
   sendForgotPassword = function(email){
      this.options = new RequestOptions();
      this.headers.set("accountToken", localStorage.getItem("accountToken"));
      let params: URLSearchParams = new URLSearchParams();
      params.set("email", email);
      
      this.options.headers= this.headers;
      this.options.search = params

      return this.http.get(this.sendForgotPasswordUrl, this.options)
         .map(this.extractData)
         .catch(this.handleError);
   }   

   register = function(password, dataUser){
      this.options = new RequestOptions();
      this.headers.set("accountToken", localStorage.getItem("accountToken"));
      let params: URLSearchParams = new URLSearchParams();
      params.set("password", password);
      
      this.options.headers= this.headers;
      this.options.search = params;

      return this.http.post(this.registerUrl, dataUser, this.options)
         .map(this.extractData)
         .catch(this.handleError);
   }

   checkUser = function(dataLoginUser){
      this.options = new RequestOptions();
      this.headers.set("accountToken", localStorage.getItem("accountToken"));
      this.options.headers = this.headers;

      return this.http.post(this.checkUserUrl, dataLoginUser, this.options)
         .map(this.extractData)
         .catch(this.handleError);
   }

   selectOrCreateCustomer = function(parameters){
      this.options = new RequestOptions();
      let params: URLSearchParams = new URLSearchParams();
      this.headers.set("accountToken", localStorage.getItem("accountToken"));
      
      params.set("email", parameters.email);
      params.set("firstName", parameters.firstname);
      params.set("lastName", parameters.lastname);
      params.set("mobileNumber", parameters.phone);

      this.options.headers = this.headers;
      this.options.search = params;

      return this.http.get(this.selectOrCreateCustomerUrl, this.options)
         .map(this.extractData)
         .catch(this.handleError);
   }

   getCustomerMatches = function(email){
      this.options = new RequestOptions();
      let params: URLSearchParams = new URLSearchParams();
      this.headers.set("accountToken", localStorage.getItem("accountToken"));
      
      params.set("email", email);

      this.options.headers = this.headers;
      this.options.search = params;

      return this.http.get(this.getCustomerMatchesUrl, this.options)
         .map(this.extractData)
         .catch(this.handleError);
   }



   private extractData(res: Response) {
      let body = res.json();

      if (body == null) {
         return [];
      } else {
         if (body.data == null)
            return body;
         else
            return body.data;
      }
   }

   private handleError(error: Response | any) {
      let errMsg: string;
      if (error instanceof Response) {
         const body = error.json() || '';
         const err = body.error || JSON.stringify(body);
         errMsg = err;
      } else {
         errMsg = error.message ? error.message : error.toString();
      }

      return Observable.throw(errMsg);
   }
}
