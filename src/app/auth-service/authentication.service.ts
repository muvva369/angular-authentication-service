import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import {credentials} from '../credentials'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  backendurl:string
  constructor(private http: HttpClient) {
    this.backendurl="http://localhost:4000/employee"
   }
  
  //login service
  login(staffId:string,password:string){
    let credentials:credentials={
      staffId:staffId,
      password:password
    }
    return this.http.post(this.backendurl+'/verify',credentials)
  }

  //sign up service
  signUp(credentials){
    return this.http.post(this.backendurl+'',credentials)
  }

}
