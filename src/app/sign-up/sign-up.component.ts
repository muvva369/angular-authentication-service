import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
// import { AuthService } from "../auth-service/auth.service";
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
  staffId:AbstractControl;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.firstName = new FormControl(null, Validators.required);
    this.lastName = new FormControl(null, Validators.required);
    this.staffId=new FormControl(null, Validators.required);
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
      staffId:this.staffId,
      passwordGroup: this.formGroup
    });
  }
  onSubmit() {
    if (!this.signUpForm.valid) {
      return;
    }
    this.isLoading = true;

    //populating the credentials object 
    let credentials:credentials={
      staffId:this.signUpForm.value.staffId,
      firstName:this.signUpForm.value.firstName,
      lastName:this.signUpForm.value.lastName,
      password:this.signUpForm.value.passwordGroup.password,
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