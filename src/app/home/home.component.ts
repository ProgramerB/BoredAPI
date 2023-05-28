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
  people=0
  min_cost=0
  max_cost=8
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

  formatPeople(value:number): string{
    if(value==0) return "Random"
    else return value.toString()
  }
  formatCost(value: number): string {
    if(value == 0) return "Free"
    if(value < 4) return "$"
    if(value < 7) return "$$"
    else return "$$$"
  }
  formatAccessibility(value: number): string {
    if(value < 4) return "Easy"
    if(value < 7) return "Moderate"
    else return "Hard"
  }

  search(){
    this.showSpinner=true
    this.sub = this.boredService.getFromOptions(this.type,this.people,this.min_cost,this.max_cost,this.min_accessibility,this.max_accessibility)
    .subscribe({
      next : bored => {
        this.boredResult = bored;
        console.log(this.boredResult)
      },
      error : err => console.log(err),
      complete: () => this.showSpinner=false
    })
  }
  random(){
    this.showSpinner=true
    this.sub = this.boredService.getRandom().subscribe({
      next : bored => {
        this.boredResult = bored;
      },
      error : err => console.log(err),
      complete: () => this.showSpinner=false
    })
  }
  reset(){
    this.type=""
    this.people=0
    this.min_cost=0
    this.max_cost=8
    this.min_accessibility=0
    this.max_accessibility=10
  }
}
