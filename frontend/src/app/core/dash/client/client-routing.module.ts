import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsComponent } from './clients/clients.component';
import { AnalyseComponent } from '../analyse/analyse.component';
import { GuardGuard } from '../../auth/guard.guard';

const routes: Routes = [
 
  {
    path:'list',component:ClientsComponent,canActivate: [GuardGuard]
  },
  {
    path:'analyse',component:AnalyseComponent,canActivate: [GuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[GuardGuard]
})
export class UploadRoutingModule { }
