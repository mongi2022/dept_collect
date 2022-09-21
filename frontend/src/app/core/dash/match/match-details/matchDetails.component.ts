import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Player } from '../../players/player';
import { PlayerService } from '../../players/player.service';
import { Team } from '../team';
import { TeamService } from '../team.service';


@Component({
  selector: 'app-matchDetails',
  templateUrl: './matchDetails.component.html',
  styleUrls: ['./matchDetails.component.css'],
})
export class MatchDetailsComponent implements OnInit {
  displayedColumns: string[] = ['TeamName', 'Logo'];
  displayedColumns2: string[] = ['PlayerName', 'Number','Picture'];
  dataSource!: MatTableDataSource<Team>;
  dataSource2!: MatTableDataSource<Player>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  teams!: Team[];
  players!:Player[]
  players2!:any
  fileOutput: any;
  idTeam: any
  constructor(private teamService: TeamService,private playerService:PlayerService) {}

  ngOnInit(): void {
    this.getTeamsController();
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
  getTeamsController() {
    var project3 = `${localStorage.getItem('id_project')}`;
    console.log('id===', project3);
    this.teamService.getAllTeamsService(project3).subscribe((data) => {
      console.log(data.teams);
      this.teams = data.teams;
      this.dataSource = new MatTableDataSource(this.teams);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  getid(id:number){
    console.log(this.teams[id]._id);
    this.idTeam=this.teams[id]._id
   this.getPlayersByTeamController(this.idTeam)
          }
  getPlayersByTeamController(id:string){
   
    //getPlayerByTeamService
    this.playerService.getPlayerByTeamService(id).subscribe(data=>{
      console.log(Object.values(data)[0].players);
      this.players2=Object.values(data)[0].players
      this.dataSource2 = new MatTableDataSource(this.players2);
      this.dataSource2.paginator = this.paginator;
      this.dataSource2.sort = this.sort;
    })
  }
}
