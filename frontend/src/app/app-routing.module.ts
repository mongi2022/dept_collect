import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule)

  },
  {
    path: 'dash',
    loadChildren: () => import('./core/dash/dash.module').then(m => m.DashModule)
  },
  {
    path: '',
    loadChildren: () => import('./shared/template/template.module').then(m => m.TemplateModule)

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
