import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth-service/auth.service";
import { Router } from "@angular/router";
import {AuthenticationService} from '../auth-service/authentication.service';

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.css"],
})
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  isLoading: Boolean = false;
  error: string = null;
  constructor(private authService: AuthService, private router: Router, private authenticationService:AuthenticationService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      empId: new FormControl(null, [Validators.required]),
      password: new FormControl(null),
    });
  }
  onSubmit() {
    if (!this.loginForm.valid) {
      return;
    }
    const empId = this.loginForm.value.empId;
    const password = this.loginForm.value.password;
    //console.log(this.loginForm.value.userName);
    this.isLoading = true;


    // this.authService.login(empId, password).subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.isLoading = false;
    //     this.router.navigate(["/welcome"]);
    //   },
    //   (errorMessage: any) => {
    //     console.log(errorMessage);
    //     this.error = errorMessage;
    //     this.isLoading = false;
    //   }
    // );

    this.authenticationService.login(empId,password).subscribe(
      (data)=>{
        console.log(data);
        this.isLoading = false;
        this.router.navigate(["/welcome"]);
      },
      (errorMessage: any) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.loginForm.reset();
  }
}
