import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomInputComponent} from "../../shared/components/custom-input/custom-input.component";
import {LoadingBarService} from "@ngx-loading-bar/core";
import {AuthService} from "../../core/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {NgIf} from "@angular/common";



@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    CustomInputComponent,
    ReactiveFormsModule,
    NgbAlert,
    NgIf,
  ],
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  errorMessage: string = '';
  hasError: boolean = false;

  constructor(
    private loader: LoadingBarService,
    private _authService: AuthService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
  }

  sendForm() {
    if (this.loginForm.valid){
      this.loader.start();

      const credentials = {
        ...this.loginForm.getRawValue(),
      }

      this._authService.login(credentials).subscribe(
        (response)=>{
          const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/home';
          this.router.navigateByUrl(redirectURL);

        },
        (error)=>{
          if (error.error.message){
            this.hasError = true;
            this.errorMessage = error.error.message;
          }
          this.loader.complete();
        },
        ()=>{
          this.loader.complete();
        }
      );

    }
  }
}
