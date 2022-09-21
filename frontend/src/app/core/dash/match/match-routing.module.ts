import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from '../../auth/guard.guard';
import { ActionCategoryComponent } from './action-category/action-category.component';
import { MatchDetailsComponent } from './match-details/matchDetails.component';
import { SubActionCategoryComponent } from './sub-action-category/sub-action-category.component';
import { TeamComponent } from './teams/team.component';

const routes: Routes = [
  {
    path: 'matchdetails',
    component: MatchDetailsComponent,canActivate: [GuardGuard]
  },
  {
    path: 'team',
    component: TeamComponent,canActivate: [GuardGuard]
  },
  {
    path:'actioncat',component: ActionCategoryComponent
  },
  {
    path:'subactioncat',component:SubActionCategoryComponent
  },

  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[GuardGuard]
})
export class MatchRoutingModule {}
