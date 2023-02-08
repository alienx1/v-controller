import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'dashbord'},
  {
    path:'',
    children:[
      {
        path:'',
        loadChildren: () => import('./pages/pages.module').then(x=>x.PagesModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }

];

@NgModule({
  imports: [
              RouterModule.forRoot(routes),
              ],
              exports: [RouterModule]
})
export class AppRoutingModule { }
