import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CustomInputComponent} from "../../shared/components/custom-input/custom-input.component";
import {LoadingBarService} from "@ngx-loading-bar/core";
import {AuthService} from "../../core/auth/auth.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    CustomInputComponent,
    ReactiveFormsModule
  ],
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

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
          console.log(error);
          this.loader.complete();
        },
        ()=>{
          this.loader.complete();
        }
      );

    }
  }
}
