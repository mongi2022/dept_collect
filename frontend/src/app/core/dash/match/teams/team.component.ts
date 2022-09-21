import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../team';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
})
export class TeamComponent implements OnInit {
  team!: Team;
  errMsg!: any;
  selectedFile!: File;

  teamForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    creation_date: new FormControl(new Date(), [Validators.required]),
    logo: new FormControl('', [Validators.required]),
  });
  url!: any;
  logos: any;

  constructor(
    private teamService: TeamService,
    public formBuilder: FormBuilder,
    private router: Router,
    private _http: HttpClient,
    public route: ActivatedRoute
  ) {
    this.formBuilder.group(this.teamForm);
    const id = route.snapshot.params['id'];
    console.log(id);
  }

  ngOnInit(): void {}

  // selectVideo(event: any) {
  //   this.selectedFile = <File> event.target.files[0];

  //   var reader = new FileReader();
  //   const file = event.target.files[0];
  //           console.log(file.originalname);

  //   var input = <HTMLInputElement>document.getElementById('upload');
  //   var in2 = input.value.replace('C:\\fakepath\\', 'assets/img/');
  //   if (event.target.files.length > 0) {
  //     reader.readAsDataURL(file);
  //     reader.onload = (event) => {
  //       this.url = (<FileReader>event.target).result;
  //       this.videos = file;
  //       this.teamForm.value.logo = in2;

  //      // const fd = new FormData();
  //     //  fd.append('file', this.selectedFile, this.selectedFile.name);
  //      // console.log(this.selectedFile.webkitRelativePath);
  //       this.teamService.uploadFile(file.originalname).subscribe((res) => {
  //           console.log(res);
  //         });

  //     };
  //   }
  // }
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
        this.teamForm.value.logo = in2;   
         };
    }
  }
  // onSubmit() {
  //   const formData = new FormData();

  //   formData.append('logo', this.logos);
  //   // fsExtra.copyFileSync(pathOrigin, `${pathDest}`);
  //   let project = localStorage.getItem('id_project');

  //   this._http
  //     .post<any>(
  //       `http://localhost:3000/api/v1/upload-video/logo/${project}`,
  //       formData
  //     )
  //     .subscribe((data) => {
  //       console.log('datta====', data);
  //     });
  // }

  AddteamController() {
    let user = localStorage.getItem('userId');
    let project = localStorage.getItem('id_project');
    const formData = new FormData();

    formData.append('logo', this.logos);

    console.log(project);

  
    console.log({ ...this.teamForm.value, project });
    
    this.teamService
      .AddteamService({ ...this.teamForm.value, project })
      .subscribe(
        (data) => {
          this._http.post<any>(
            `http://localhost:3000/api/v1/upload-video/logo/${project}`,formData)
          .subscribe((data) => {
            console.log('datta====', data);
          });       
             alert('Team Added Successfully');
        },
        (error) => {
          this.errMsg = error.error.msg;
        //  console.log(this.errMsg);
        }
      );
  }
}
