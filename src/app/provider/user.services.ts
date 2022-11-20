// import { environment } from './../../environments/environment.prod';
import { element } from 'protractor';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserServices {

  public baseUrl: String = "http://13.232.178.141:3000"

  // public baseUrl: String = environment.baseUrl
  public ownerId = "5e67ccb0ee6d50d0930f85e7"

  constructor(private http: HttpClient) { }


  fetchCustomersList() {
    let response;
    return this.http.get(this.baseUrl + `/api/v1/admin/getAllCustomerList/${this.ownerId}/6/0`).pipe(
      map((data) => {
        response = data
        return response.object
      })
    );
  }

  search(filter){
    let response;
    return this.http.get(this.baseUrl + `/api/v1/admin/5e67ccb0ee6d50d0930f85e7/Search?search=${filter.search}&filter=${filter.filter}`).pipe(
      map((data) => {
        response = data
        return response.object
      })
    );
  }

  getCustomerDetails(userId) {
    let response;
    return this.http.get(this.baseUrl + `/api/v1/admin/getCustomerDetails/${userId}`).pipe(
      map((data) => {
        response = data
        return response.object
      })
    );
  }

  customerAction(userId, payload) {
    let response;
    return this.http.put(this.baseUrl + `/api/v1/admin/customerAction/${userId}`, payload).pipe(
      map((data) => {
        response = data
        return response.object
      })
    );
  }

  loginAdmin(payload){
    let response;
    return this.http.post(this.baseUrl + `/api/v1/admin/loginAdmin`, payload).pipe(
      map((data) => {
        response = data
        return response.object
      })
    );
  }


  changePassword(payload){
    let response;
    return this.http.put(this.baseUrl + `/api/v1/admin/changePassword`, payload).pipe(
      map((data) => {
        response = data
        return response.object
      })
    );
  }








  //


}
