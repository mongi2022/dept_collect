import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'cdk-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
	isOpen: boolean = false;

  	//currentUser = null;
 	fullname=localStorage.getItem('fullname')


  	@Input() currentUser!:any;
  	@HostListener('window:keydown.enter', ['$event', '$event.target'])
  	onClick(event: MouseEvent, targetElement: HTMLElement) {
    	if (!targetElement) {
			console.log('eeee');

     		return;
    	}

    	const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    	if (!clickedInside) {
      		this.isOpen = false;
    	}
  	}


  	constructor(private elementRef: ElementRef,private router:Router,private authService:AuthService) { }


  	ngOnInit() {
  	}
  logOut(){
   localStorage.removeItem('fullname')
   localStorage.removeItem('userId')
   localStorage.removeItem('id_project')
  //  this.authService.logOutService().subscribe(data=>{
	// console.log(data);

  //  })
   //this.fullname=''
   this.router.navigate(['auth/login'])
  }
}
