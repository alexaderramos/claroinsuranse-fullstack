import {Component} from '@angular/core';
import {CustomInputComponent} from "../../shared/components/custom-input/custom-input.component";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {confirmPasswordValidator} from "../../shared/validators/password.validator";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CustomInputComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    last_name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    password_confirmation: new FormControl('', [
      Validators.required, Validators.minLength(8),
      Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*()_+={}\[\]:;<>,.?\\/]).+$/i)]),
  }, {validators: confirmPasswordValidator});
}
