import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardGuard } from '../auth/guard.guard';
import { AnalyseComponent } from './analyse/analyse.component';
import { TeamComponent } from './match/teams/team.component';
import { PlayersComponent } from './players/player/player/players.component';
import { FactureComponent } from './facture/facture.component';

const routes: Routes = [
 
  {
    path:'analyse',component:AnalyseComponent,canActivate: [GuardGuard]
  },
  {
    path:'facture',component:FactureComponent,canActivate: [GuardGuard]
  },
  {
    path:'players',component:PlayersComponent,canActivate: [GuardGuard]
  },
  {
    path:'players/:id',component:PlayersComponent,canActivate: [GuardGuard]
  },
  
  {
    path: 'client',
    loadChildren: () => import('./client/client.module').then(m => m.UploadModule)
  },
  {
    path: 'match',
    loadChildren: () => import('./match/match.module').then(m => m.MatchModule)
  },
  {
    path: 'iventory',
    loadChildren: () => import('./iventory/iventory.module').then(m => m.IventoryModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[GuardGuard]
})
export class DashRoutingModule { }
