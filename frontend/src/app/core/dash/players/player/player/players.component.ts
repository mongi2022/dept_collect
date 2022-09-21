import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../../../match/team';
import { ClientsService } from '../../../client/clients/clients.service';
import { Player } from '../../player';
import { PlayerService } from '../../player.service';


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  idTeam!:any
  id!:any
  errMsg!:any
  teams!: Team[] 
  player!:Player
  playerForm= new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    birth_date: new FormControl('', [Validators.required]),
    number: new FormControl('', [Validators.required]),
    picture: new FormControl('', [Validators.required]),
    position: new FormControl('', [Validators.required]),

  });
  url!: any;
  logos!: any;
  constructor(private playerService:PlayerService,public formBuilder: FormBuilder,private router:Router,
    private route:ActivatedRoute ,private newClientService:ClientsService,
    private _http:HttpClient) { 
    this.formBuilder.group(this.playerForm)

  }

  ngOnInit(): void {

   // this.getTeamsController()
   
  }

  selectVideo(event: any) {
    var reader = new FileReader();
    const file = event.target.files[0];
    //localStorage.removeItem('')
   var input = <HTMLInputElement>document.getElementById('upload');
     var in2 = input.value.replace('C:\\fakepath\\', 'assets/img/');
    if (event.target.files.length > 0) {
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.url = (<FileReader>event.target).result;
        this.logos = file;
        this.playerForm.value.logo = in2;  
        console.log(this.playerForm.value.logo);
         
         };
    }
  }



  AddPlayerController(){
    const formData = new FormData();
    var input = <HTMLInputElement>document.getElementById('upload');
    var in2 = input.value.replace('C:\\fakepath\\', 'assets/img/');
    this.playerForm.value.picture = in2;  
    formData.append('logo', this.logos);
    let project=localStorage.getItem('id_project')
    let team=this.idTeam
  
    
    console.log({...this.playerForm.value,project,team});

    this.playerService.AddPlayerService({...this.playerForm.value,project,team}).subscribe(data=>{
      console.log(data);
     // localStorage.setItem('userId',Object.values(data)[0].userId)
     this._http.post<any>(
      `http://localhost:3000/api/v1/upload-video/logo/${project}`,formData)
    .subscribe((data) => {
    console.log('datta====', data);
    }); 
      alert('Player Added successfully')
      },error=>{
        this.errMsg=error.error.msg
       // console.log(this.errMsg);
        
        })
      }
      getid(id:number){
        console.log(this.teams[id]._id);
        this.idTeam=this.teams[id]._id
              }

      // getTeamsController(){
      //   var project3= `${localStorage.getItem('id_project')}`
      
      //   this.newClientService.getAllFacturesClientService(project3).subscribe(data=>{
      //     console.log(data.teams.map((x:any)=>x._id));
      //     console.log(data.teams.map((x:any)=>x.name));
      //     console.log(data);
      //     this.teams = data.teams
        
          
      //    // localStorage.setItem('id_team',data)
      
      //       })
      // }
}
