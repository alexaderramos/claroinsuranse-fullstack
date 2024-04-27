import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-modal-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './modal-confirmation.component.html',
  styleUrl: './modal-confirmation.component.scss'
})
export class ModalConfirmationComponent {
  @Input() message: string = 'Confirm the action?';
  @Input() title: string = 'Confirmación';
  @Input() details: string = '';

  constructor(
    public activeModal: NgbActiveModal
  ) {
  }

}
