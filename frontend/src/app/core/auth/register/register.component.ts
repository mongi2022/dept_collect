import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { User } from '../login/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user!:User
  registerForm= new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    tel: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  errMsg: any;
   constructor(private authService:AuthService,public formBuilder: FormBuilder,private router:Router,private elementRef: ElementRef) {
     this.registerForm= this.formBuilder.group(new User('','','',''))

   }
  ngOnInit(): void {
  }
  registerController(){

    this.authService.registerService(this.registerForm.value).subscribe(data=>{

     // console.log(Object.values(data)[0]);
      console.log(data);

    // this.authService.loginService(this.loginForm.value).subscribe(data=>{
    //   console.log(data);

   //localStorage.setItem('token',Object.values(data)[0])
 //   localStorage.setItem('userId',Object.values(data)[0].userId)

   this.router.navigate(['auth/login'])
    },error=>{
      this.errMsg=error.error.msg
      console.log(this.errMsg);

      })
}}
