import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutComponent } from './ajout/ajout.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: 'ajout',
    component: AjoutComponent,
  },
  {
    path: 'update',
    component: UpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IventoryRoutingModule {}
