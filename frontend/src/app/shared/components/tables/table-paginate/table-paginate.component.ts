import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-table-paginate',
  standalone: true,
  imports: [],
  templateUrl: './table-paginate.component.html',
  styleUrl: './table-paginate.component.scss'
})
export class TablePaginateComponent {

  @Input() data: any[] = [];
  @Input() columns: any[] = [];

  @Input() title: string = '';

  @Input() getAPI: string = '';
  @Input() deleteAPI: string = '';
  @Input() createROUTE: string = '';
  @Input() updateROUTE: string = '';

  idItemToUpdate: number | undefined;

  constructor(
    private  http: HttpClient,
  ) {
  }

}
