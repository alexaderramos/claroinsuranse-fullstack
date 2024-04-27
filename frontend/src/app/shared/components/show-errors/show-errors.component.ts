import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {mapError} from "../../mappers/errors.mapper";
import {NgForOf, NgIf} from "@angular/common";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-show-errors',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgbAlert
  ],
  templateUrl: './show-errors.component.html',
  styleUrl: './show-errors.component.scss'
})
export class ShowErrorsComponent implements OnInit, OnChanges {
  @Input() errorsHttp: HttpErrorResponse | undefined;
  errors: string[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
  ) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateErrors();
  }

  ngOnInit(): void {
    this.updateErrors();
  }

  private updateErrors(): void {
    if (this.errorsHttp) {
      this.errors = mapError(this.errorsHttp);
      this.cdr.detectChanges();
      console.log(this.errors);
    }else{
      this.errors = [];
    }
  }
}
