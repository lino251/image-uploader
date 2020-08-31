import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from 'src/app/admin/admin.component'
import {AppComponent} from 'src/app/app.component'
import {UploaderComponent} from 'src/app/uploader/uploader.component'

const routes: Routes = [
  { path: '', component: UploaderComponent} ,
  { path: 'admin', component: AdminComponent} ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }