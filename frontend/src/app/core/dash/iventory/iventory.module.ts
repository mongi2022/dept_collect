import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IventoryRoutingModule } from './iventory-routing.module';
import { AjoutComponent } from './ajout/ajout.component';
import { UpdateComponent } from './update/update.component';


@NgModule({
  declarations: [
    AjoutComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    IventoryRoutingModule
  ]
})
export class IventoryModule { }
