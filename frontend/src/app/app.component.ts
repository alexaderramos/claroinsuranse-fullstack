import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {LoadingBarHttpClientModule} from "@ngx-loading-bar/http-client";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoadingBarHttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
