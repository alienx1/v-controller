import { Token } from './../../model/auth/token';
import { Auth } from '../../model/auth/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import jwtDecode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})



export class AuthComponent implements OnInit {
  validateForm!: FormGroup;
  jwt = localStorage.getItem('jwt');
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  submitForm(): void {
    if (this.validateForm.valid) {
      var req = this.validateForm.value;
      this.http.post<Auth>(`/api/Auth/AdminLogin`, req, this.httpOptions).subscribe(res => {
        if (res["status"] == "ok") {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          localStorage.setItem('token', res['token'])
          let token: Token = jwtDecode(res["token"])
          if (token['rank'] == '72122ce96bfec66e2396d2e25225d70a') {
            this.router.navigate(['/dashbord']);
          } else if (token['rank'] == '21232f297a57a5a743894a0e4a801fc3') {
            this.router.navigate(['/user']);
          }
        } else {

        }

      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      user_name: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    if (this.jwt) {
      this.router.navigate(['/dashbord']);
    }
  }
}
