import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../../match/team.service';
import { ClientsService } from './clients.service';
import { Client } from './client';




@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})
export class ClientsComponent implements OnInit {
  displayedColumns: string[] = [ 'CodeClient','Name','Age','Adresse1','Adresse2','CIN','Email','Mat Fiscal','Profile',
  'Tel1','Tel2' ,'Actions'];
  dataSource!: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('editCompanyModal') editCompanyModal!: TemplateRef<any>;
  private editCompanyDialogRef!: MatDialogRef<TemplateRef<any>>;
  client!:Client;
  errMsg!:string
  show=true
  path2!:string
  clients!:Client[];
  clients2!:any;
  id!:any
  clientForm= new FormGroup({
    codeClient: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    adresse1: new FormControl('', [Validators.required]),
    adresse2: new FormControl('', [Validators.required]),
    tel1: new FormControl('', [Validators.required]),
    tel2: new FormControl('', [Validators.required]),
    cin: new FormControl('', [Validators.required]),
    profile: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    matFiscal: new FormControl('', [Validators.required]),
    });

  fileOutput: any;
  constructor(private newClientsService: ClientsService
    ,private router:Router,public formBuilder: FormBuilder,
    public dialog: MatDialog
    ) {

     this.formBuilder.group(this.clientForm)

  }

  createClientController() {
   //const user=localStorage.getItem('userId')
   // console.log({...this.clientForm.value,user});
    
    this.newClientsService
      .createClientsService({...this.clientForm.value})
      .subscribe((data) => {
        console.log("data=",data);
       this.getAllClientController()

      },error=>{
        this.errMsg=error.error.msg
        console.log(this.errMsg);

        }
      );

  }

  ngOnInit(): void {

   this.getAllClientController()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllClientController(){
    this.newClientsService.getAllClientsService().subscribe((data)=>{
     // console.log("data=",data);




     this.clients2=data
   // console.log(this.clients2.map((x:any)=>x.id)[0]);

     this.dataSource = new MatTableDataSource(this.clients2);
     this.dataSource.paginator = this.paginator;

    this.dataSource.sort = this.sort;



    })
  }


  onChange(event:any) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = (e: any) => {
      // The file's text will be printed here
      this.fileOutput = e.target.result;
      for (var i = 0; i < file.length; ++i) {
        if(!(file[i].webkitRelativePath.split('/').length > 2)){
            console.log(file);

        }
    };
    console.log(file);

}
}

// startProject(path:string,id:string){

//   localStorage.setItem('path',path)
//   localStorage.setItem('id_project',id)
//   //localStorage.setItem('team_id',id_team)
//   console.log( localStorage.getItem('id_project'));
//   //console.log( localStorage.getItem('team_id'));
//   this.getTeamsController()
//   this.router.navigate(['/dash/project/upload'])
// }

getFactureClient(client:string,id:number){
  client=`${this.clients2.map((x:any)=>x.id)[id]}`
  localStorage.setItem('client',client)
 // const fullName=`${this.clients2.map((x:any)=>x.fullName)[id]}`
  //localStorage.setItem('fullName',fullName)

 // console.log(fullName);

  //localStorage.setItem('id_project',id)
  //localStorage.setItem('team_id',id_team)
 // console.log( localStorage.getItem('id_project'));
  //console.log( localStorage.getItem('team_id'));
 // this.getAllFacturesClientController()
 // console.log(localStorage.getItem('client'));

  this.router.navigate(['/dash/facture'])
}




deleteProjectController(id:string){
  this.newClientsService.deleteClientsService(id).subscribe(data=>{
    console.log(data);
    this.getAllClientController()

  })
}


openCompanyDetailsDialog(): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.restoreFocus = false;
  dialogConfig.autoFocus = false;
  dialogConfig.role = 'dialog';
  this.clientForm= new FormGroup({
    codeClient: new FormControl('', [Validators.required]),
    fullName: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    adresse1: new FormControl('', [Validators.required]),
    adresse2: new FormControl('', [Validators.required]),
    tel1: new FormControl('', [Validators.required]),
    tel2: new FormControl('', [Validators.required]),
    cin: new FormControl('', [Validators.required]),
    profile: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    matFiscal: new FormControl('', [Validators.required]),
  });
  this.editCompanyDialogRef = this.dialog.open(this.editCompanyModal, dialogConfig);
  this.editCompanyDialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed...');

  });
}

closeCompanyDetailsDialog() {
  this.editCompanyDialogRef.close();

}
}
