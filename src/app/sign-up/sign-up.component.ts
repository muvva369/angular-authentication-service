import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { AuthService } from "../auth-service/auth.service";
import {AuthenticationService} from "../auth-service/authentication.service";
import {credentials} from "../credentials";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.css"],
})
export class SignUpComponent implements OnInit {
  genders = ["Male", "Female"];

  isLoading: Boolean = false;
  error: string = null;
  successMessage: string =null;

  signUpForm: FormGroup;
  formGroup: FormGroup;
  password: AbstractControl;
  confirmPassword: AbstractControl;
  firstName: AbstractControl;
  lastName: AbstractControl;
  empId:AbstractControl;
  email: AbstractControl;
  dateOfBirth: AbstractControl;
  gender: AbstractControl;

  constructor(private authService: AuthService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.firstName = new FormControl(null, Validators.required);
    this.lastName = new FormControl(null, Validators.required);
    this.empId=new FormControl(null, Validators.required);
    this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.dateOfBirth = new FormControl(null, Validators.required);
    this.gender = new FormControl("Male");
    this.password = new FormControl(null, [ Validators.required, Validators.minLength(8),]);
    this.confirmPassword = new FormControl(null, Validators.required);
    this.formGroup = new FormGroup(
      {
        password: this.password,
        confirmPassword: this.confirmPassword,
      },
      {
        validators: this.matchPassword,
      }
    );
    this.signUpForm = new FormGroup({
      firstName: this.firstName,
      lastName:this.lastName,
      empId:this.empId,
      email: this.email,
      dateOfBirth: this.dateOfBirth,
      gender: this.gender,
      passwordGroup: this.formGroup
    });
  }
  onSubmit() {
    if (!this.signUpForm.valid) {
      return;
    }
    const emailid = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;
    this.isLoading = true;
    // this.authService.signup(emailid, password).subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.isLoading = false;
    //   },
    //   (errorMessage: any) => {
    //     console.log(errorMessage);
    //     this.error = errorMessage;
    //     this.isLoading = false;
    //   }
    // );


    //populating the credentials object 
    let credentials:credentials={
      employeeId:this.signUpForm.value.empId,
      firstName:this.signUpForm.value.firstName,
      lastName:this.signUpForm.value.lastName,
      email : this.signUpForm.value.email,
      password:this.signUpForm.value.passwordGroup.password,
      dateOfBirth: this.signUpForm.value.dateOfBirth,
      gender:this.signUpForm.value.gender
    }
    console.log(credentials)

    //calling the service 
    this.authenticationService.signUp(credentials).subscribe(
      (data) => {
        console.log(data);
        this.successMessage="successfully registered..Please Login"
        this.isLoading = false;
      },
      (errorMessage: any) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    )
    this.signUpForm.reset();
  }


  matchPassword = (group: FormGroup): { [s: string]: boolean } => {
    return group.value.password === group.value.confirmPassword
      ? null
      : { unmatched: true };
  };
}