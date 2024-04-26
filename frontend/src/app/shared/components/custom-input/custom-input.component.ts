import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ionEyeOutline, ionEyeOffOutline, ionHelpCircleOutline} from "@ng-icons/ionicons";
import {NgIcon, provideIcons} from "@ng-icons/core";
import {NgClass} from "@angular/common";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-custom-input',
  standalone: true,
  providers: [provideIcons({ ionEyeOffOutline, ionEyeOutline,ionHelpCircleOutline})],
  imports: [
    ReactiveFormsModule,
    NgIcon,
    NgClass,
    NgbTooltip,
  ],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss'
})
export class CustomInputComponent implements OnInit{

  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() maxLength: string = '';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() parentForm: FormGroup = new FormGroup({});
  control: FormControl = new FormControl();
  @Input() controlName: string = '';
  @Input() customValidatorName: string = '';
  @Input() customValidatorMessage: string = '';
  @Input() upperCase: boolean = false;
  @Input() toolTip: string = '';

  @Output() eventOnChange = new EventEmitter<string | null>();
  @Output() eventOnInput = new EventEmitter<string | null>();
  @Output() eventOnKeyUpEnter = new EventEmitter<string | null>();
  @Output() eventOnKeyUp = new EventEmitter<string | null>();
  @Input() labelText: string = '';

  showPassword = false;
  typeInput: string = '';


  constructor() {


  }

  getControl() {
    return this.control;
  }

  ngOnInit(): void {
    this.typeInput = `${this.type}`;
    // console.log(this.parentForm.controls)
    if (this.parentForm.controls[this.controlName]) {
      this.control = this.parentForm.controls[this.controlName] as FormControl;

      if(this.disabled){
        this.control.disable();
      }

    }
  }

  writeValue(value: any): void {
    this.control.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.control.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.control.statusChanges.subscribe(fn);
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  eventChange(event: Event) {
    this.eventOnChange.emit(this.parentForm.controls[this.controlName].value);
  }

  eventInput($event: Event) {

    if (this.upperCase){
      this.parentForm.controls[this.controlName].setValue(this.parentForm.controls[this.controlName].value.toUpperCase());
    }

    this.eventOnInput.emit(this.parentForm.controls[this.controlName].value);
  }

  eventKeyUp($event: KeyboardEvent) {
    this.eventOnInput.emit(this.parentForm.controls[this.controlName].value);
  }

  eventKeyEnter(event: any) {
    if (event.key === 'Enter') {
      this.eventOnKeyUpEnter.emit(this.parentForm.controls[this.controlName].value);
    }
  }

  toggleShowPassword(){
    this.showPassword = !this.showPassword;
    this.typeInput = this.showPassword ? 'text' : 'password';
  }

  protected readonly ionEyeOffOutline = ionEyeOffOutline;
}
