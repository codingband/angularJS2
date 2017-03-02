import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
   private username = localStorage.getItem("accountName");
   private baseUrl = "https://" + this.username +
   ".book4time.eu/book4timeapiqa/api/";  // URL to web API
   private getTokenUrl = this.baseUrl + "AccountToken/GetAccountToken";
   private options = new RequestOptions();
   private headers = new Headers({ 'Content-Type': 'application/json' });
   errorMessage;

   tokenJson;

   constructor(private http: Http) { }

   getToken() {
      this.headers.set("OnlineActivitySchedulerPreSharedKey", "822A4CE26284F9598C273EEF146C2");

      let params: URLSearchParams = new URLSearchParams();
      params.set("accountName", this.username);

      this.options.headers = this.headers;
      this.options.search = params;

      return this.http.get(this.getTokenUrl, this.options)
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
         errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
         errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
   }
}
