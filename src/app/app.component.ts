import { HttpClient } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { Token } from './model/auth/token';
import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isCollapsed = false;
  constructor(private router: Router) {
    this.router.events.subscribe((e: RouterEvent) => {
      this.navigationInterceptor(e);
    })
  }
  jwt = localStorage.getItem('token');
  loader = true;

  dashbord() {
    if (this.jwt) {
      this.router.navigate(['/dashbord']);
      this.TokenCheck();

    }
  }
  user() {
    if (this.jwt) {
      this.router.navigate(['/user']);
      this.TokenCheck();

    }
  }
  admin() {
    if (this.jwt) {
      this.router.navigate(['/admin']);
      this.TokenCheck();

    }
  }
  ngOnInit(): void {
    if (!this.jwt) {
      this.router.navigate(['/auth']);
    }
    this.TokenCheck();
  }
  TokenCheck() {
    let token: any = localStorage.getItem('token');
    let tokenData: Token = jwtDecode(token)
    const currentTime = new Date().getTime() / 1000;
    if (tokenData.exp < currentTime) {
      localStorage.removeItem('token');
      this.router.navigate(['/auth']);
    }
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loader = true;
    }
    if (event instanceof NavigationEnd) {
      setTimeout(() => {
        this.loader = false;
      }, 2000);
    }
    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      setTimeout(() => {
        this.loader = true;
      }, 1000);
    }
    if (event instanceof NavigationError) {
      setTimeout(() => {
        this.loader = true;
      }, 2000);
    }

  }

}

