import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashRoutingModule } from './dash-routing.module';
import { AnalyseComponent } from './analyse/analyse.component';
import { FactureComponent } from './facture/facture.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PlayersComponent } from './players/player/player/players.component';
import { MaterialModule } from 'src/app/shared/material/material.module';


@NgModule({
  declarations: [
    AnalyseComponent,
    FactureComponent,
    PlayersComponent,
    
  ],
  imports: [
    CommonModule,
    DashRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
 
  ]

})
export class DashModule { }
