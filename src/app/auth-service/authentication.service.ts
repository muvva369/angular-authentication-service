import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {credentials} from '../credentials'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  backendurl:string
  constructor(private http: HttpClient) {
    this.backendurl="http://localhost:7000/"
   }
  
  //login service
  login(empId:string,password:string){
    let credentials:credentials={
      employeeId:empId,
      password:password
    }
    return this.http.post(this.backendurl+'employee/verify',credentials)
  }

  //sign up service
  signUp(credentials){
    return this.http.post(this.backendurl+'signup',credentials)
  }

}
