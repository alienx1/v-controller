import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Token } from 'src/app/model/auth/token';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    let token: any = localStorage.getItem('token');
    let tokenData: Token = jwtDecode(token);
    if (!token) {
      this.router.navigate(['/auth']);
    }
    if (tokenData.rank != '72122ce96bfec66e2396d2e25225d70a') {
      this.router.navigate(['/empty']);
    }
  }
}
