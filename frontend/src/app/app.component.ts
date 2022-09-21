import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'E_commerce';
  currentItem = false;

  constructor() { }

  ngOnInit(): void {
  }
  childEvent(x:boolean){
 this.currentItem=!x;
     console.log(this.currentItem);
     
  }
 

}
