import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchRoutingModule } from './match-routing.module';
import { TeamComponent } from './teams/team.component';
import { MatchDetailsComponent } from './match-details/matchDetails.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/shared/material/material.module';
import { ActionCategoryComponent } from './action-category/action-category.component';
import { SubActionCategoryComponent } from './sub-action-category/sub-action-category.component';

@NgModule({
  declarations: [
    TeamComponent,
    MatchDetailsComponent,
    ActionCategoryComponent,
    SubActionCategoryComponent
  ],
  imports: [
    CommonModule,
    MatchRoutingModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),

  ]
})
export class MatchModule { }
