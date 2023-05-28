import { Component } from '@angular/core';
import { Subscription, max } from 'rxjs';
import { BoredService } from '../bored.service';
import { bored, boreds } from '../bored';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private boredService:BoredService){}

  types = ["Education", 
          "Recreational", 
          "Social", 
          "DIY", 
          "Charity", 
          "Cooking", 
          "Relaxation", 
          "Music", 
          "Busywork"]

  //inputs
  type:string=""
  people=1
  min_cost=0
  max_cost=10
  min_accessibility=0
  max_accessibility=10

  sub!:Subscription

  boredResult:bored={
    activity: "",
    accessibility: 0,
    type: "",
    participants: 0,
    price: 0,
    link: "",
    key: 0
  }

  showSpinner=false;

  search(){
    console.log("Type "+this.type)
    console.log("peope "+this.people)
    console.log("money "+this.min_cost+" "+this.max_cost)
    this.sub = this.boredService.getFromOptions(this.type,this.people,this.min_cost,this.max_cost,this.min_accessibility,this.max_accessibility)
    .subscribe({
      next : bored => {
        this.showSpinner=true
        this.boredResult = bored;
        console.log(bored)
      },
      error : err => console.log(err),
      complete: () => this.showSpinner=false
    })
  }
  random(){
    this.sub = this.boredService.getRandom().subscribe({
      next : bored => {
        this.showSpinner=true
        this.boredResult = bored;
      },
      error : err => console.log(err),
      complete: () => this.showSpinner=false
    })
  }
}
