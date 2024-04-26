import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {AuthService} from "../../core/auth/auth.service";


interface MenuItem {
  title:string,
  url:string
  children?:MenuItem[]
}
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {


  menus:MenuItem[] = [
    {
      title: 'Dashboard',
      url: '/home'
    },
    {
      title: 'Courses',
      url: '/courses'
    }
  ]
  constructor(
    private authService: AuthService,
    private activeRoute: ActivatedRoute
  ) {
    console.log(this.activeRoute.snapshot)
  }

  ngOnInit() {

  }

  logout() {
    this.authService.logout().subscribe()
  }
}
