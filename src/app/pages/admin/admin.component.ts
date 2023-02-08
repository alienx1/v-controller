import { Status } from './../../model/status';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { Component, OnInit } from '@angular/core';
import { Token } from 'src/app/model/auth/token';
import { AdminUser } from 'src/app/model/admin_user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  Search: any = "";
  Data: AdminUser[] = [];
  token: any = localStorage.getItem('token')
  isVisible = false;
  isOkLoading = false;
  CreateAdmin!: FormGroup;

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) { }
  ngOnInit(): void {
    let tokenData: Token = jwtDecode(this.token);
    if (tokenData.rank != '72122ce96bfec66e2396d2e25225d70a') {
      this.router.navigate(['/empty']);
    }
    this.search()
    this.CreateForm()
  }
  search() {
    if (this.Search == "") {
      this.http.get<AdminUser[]>('api/SearchAdmin/Admin/FULL_TABLE', this.httpOptions).subscribe(res => {
        this.Data = res;
        let i = this.Data.length
        for (let j = 0; j < i; j++) {
          if (this.Data[j].rank == '72122ce96bfec66e2396d2e25225d70a') {
            this.Data[j].rank = 'owner'
          } else if (this.Data[j].rank == '21232f297a57a5a743894a0e4a801fc3') {
            this.Data[j].rank = 'admin'
          }
        }
      })
    }
    else if (this.Search != "") {
      this.http.get<AdminUser[]>(`api/SearchAdmin/Admin/${this.Search}`, this.httpOptions).subscribe(res => {
        this.Data = res;
        let i = this.Data.length
        for (let j = 0; j < i; j++) {
          if (this.Data[j].rank == '72122ce96bfec66e2396d2e25225d70a') {
            this.Data[j].rank = 'owner'
          } else if (this.Data[j].rank == '21232f297a57a5a743894a0e4a801fc3') {
            this.Data[j].rank = 'admin'
          }
        }
      })
    }
  }

  AddAdminUser() {
    var req = this.CreateAdmin.value
    this.http.post<Status>(`api/CreateAdmin/Create`, req, this.httpOptions).subscribe(res => {
      if (res.status == "ok") {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'บันทึกเรียบร้อย',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }

    )
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isOkLoading = true;
    this.AddAdminUser()
    setTimeout(() => {
      this.isVisible = false;
      this.isOkLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  CreateForm() {
    this.CreateAdmin = this.fb.group({
      user_admin: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rank: [null, [Validators.required]]
    });
  }
  DeleteAdmin(user: string) {
    Swal.fire({
      title: 'ต้องการลบ ' + user + ' ใช้ไม',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      this.http.delete<Status>(`/api/DeleteAdmin/Delete/${user}`, this.httpOptions).subscribe(res => {
        if (res.status == "ok") {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'ลบเรียบร้อย',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    })

  }
}
