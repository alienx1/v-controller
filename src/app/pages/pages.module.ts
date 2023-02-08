import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgZorroAntdModule } from '../ng-zorro.module';
import { PagesRouter } from './router';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { EmptyComponent } from './empty/empty.component';

@NgModule({
  imports:[
    HttpClientModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(PagesRouter),
    ReactiveFormsModule,
    NgZorroAntdModule,

  ] ,
  declarations:[
    DashboardComponent,
    AuthComponent,
    UserComponent,
    AdminComponent,
    EmptyComponent
  ]
})
export class PagesModule{}
