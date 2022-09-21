import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturesService } from './facture.service';
import { Facture } from './facture';
import { Client } from '../client/clients/client';
import { ClientsService } from '../client/clients/clients.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit {
  displayedColumns: string[] = [ 'numFacture','identifiant','refFacture','pointVente','DPC','montantCreance',
  'soldeCreance' ,'Actions'];

  dataSource!: MatTableDataSource<Facture>;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator ;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('editCompanyModal') editCompanyModal!: TemplateRef<any>;
  private editCompanyDialogRef!: MatDialogRef<TemplateRef<any>>;
  client!:Client;

  errMsg!:string
  facture!: Facture
  show=true
  factures!:Facture[];
  factures2!:any;
  id!:any
  factureForm= new FormGroup({
    
    numFacture: new FormControl('', [Validators.required]),
    identifiant: new FormControl('', [Validators.required]),
    codeClient: new FormControl('', [Validators.required]),
    numTelephone: new FormControl('', [Validators.required]),
    refFacture: new FormControl('', [Validators.required]),
    nomClient: new FormControl('', [Validators.required]),
    adresse: new FormControl('', [Validators.required]),
    pointVente: new FormControl('', [Validators.required]),
    DPC: new FormControl('', [Validators.required]),
    montantCreance: new FormControl('', [Validators.required]),
    soldeCreance: new FormControl('', [Validators.required]),
    });

  fileOutput: any;
  soldeCr: any;
  montCr: any;
  soldeCr2=0;
  constructor(private newFacturesService: FacturesService,private newClientsService: ClientsService
    ,private router:Router,public formBuilder: FormBuilder,
    public dialog: MatDialog
    ) {

     this.formBuilder.group(this.factureForm)

  }

  createFactureController() {

    
    const client=localStorage.getItem('client')
    console.log({...this.factureForm.value,client});
    this.newFacturesService
      .createFacturesService({...this.factureForm.value,client})
      .subscribe((data) => {
        console.log("data=",data);
       this.getAllFactureController()
         
      },error=>{
        this.errMsg=error.error.msg
        console.log(this.errMsg);
        
        }
      );
    
  }
 
  ngOnInit(): void {

 //  this.getAllFactureController()
   this.getAllFacturesClientController()
   this.getClientByIdController()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllFactureController(){
    this.newFacturesService.getAllFacturesService().subscribe((data)=>{
  //console.log("data=",Object.values(data)[0]);      


     this.factures2=Object.values(data)[0]
  
     this.dataSource = new MatTableDataSource(this.factures2);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;


      
    })
  }
  getClientByIdController(){
    const id=  `${localStorage.getItem('client')}`
 
     this.newClientsService.getClientByIdService(id).subscribe(data=>{
       
      this.client=Object.values(data)[0]
     // console.log(this.client.fullName);
     })
   }

  getAllFacturesClientController(){
    var client= `${localStorage.getItem('client')}`
   // console.log('id===',client);
  
    this.newFacturesService.getAllFacturesClientService(client).subscribe(data=>{
    //  console.log("data====",(Object.values(data)[0])[0]);
      this.factures2=Object.values(data)[0]
     // console.log(this.factures2.map((x:any)=>x.soldeCreance));
      this.soldeCr=this.factures2.map((x:any)=>x.soldeCreance)
      this.soldeCr.forEach((element:any) => {
        this.soldeCr2+=element
      });

      this.montCr=Math.round((this.soldeCr2)*1.12)

      this.dataSource = new MatTableDataSource(this.factures2);
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



startProject(path:string,id:string){

  //localStorage.setItem('path',path)
  //localStorage.setItem('id_project',id)
  //localStorage.setItem('team_id',id_team)
 // console.log( localStorage.getItem('id_project'));
  //console.log( localStorage.getItem('team_id'));
  this.getTeamsController()
  this.router.navigate(['/dash/project/upload'])
}
getTeamsController(){
 // var project3= `${localStorage.getItem('id_project')}`
 // console.log('id===',project3);

//  this.newFacturesService.getAllTeamsService(project3).subscribe(data=>{
   // console.log(data.teams.map((x:any)=>x._id));
   // localStorage.setItem('id_team',data)

   //   })
}



deleteFactureController(id2:string,i:number){

 
 
  this.newFacturesService.deleteFacturesService(id2).subscribe(data=>{
   // console.log(data);
    this.getAllFactureController()
    
  })
}


openCompanyDetailsDialog(): void {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.restoreFocus = false;
  dialogConfig.autoFocus = false;
  dialogConfig.role = 'dialog';
  this.factureForm= new FormGroup({
    numFacture: new FormControl('', [Validators.required]),
    identifiant: new FormControl('', [Validators.required]),
    codeClient: new FormControl('', [Validators.required]),
    numTelephone: new FormControl('', [Validators.required]),
    refFacture: new FormControl('', [Validators.required]),
    nomClient: new FormControl('', [Validators.required]),
    adresse: new FormControl('', [Validators.required]),
    pointVente: new FormControl('', [Validators.required]),
    DPC: new FormControl('', [Validators.required]),
    montantCreance: new FormControl('', [Validators.required]),
    soldeCreance: new FormControl('', [Validators.required]),
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