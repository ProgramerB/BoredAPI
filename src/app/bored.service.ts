import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from "rxjs";
import { bored } from './bored';

const boredUrl= "http://www.boredapi.com/api/activity/"

@Injectable({
  providedIn: 'root'
})
export class BoredService {

  constructor(private http:HttpClient) { }

  getRandom(): Observable<bored>{
    return this.http.get<bored>(boredUrl)
  }
  getFromOptions(type:string,people:number,min_cost:number,max_cost:number,min_accessibility:number,max_accessibility:number):Observable<bored>{
    let query = "?"

    if(min_cost==max_cost) query+="&price="+min_cost/10
    else query+="&minprice="+min_cost/10+"&maxprice="+max_cost/10

    if(min_accessibility==max_accessibility) query+="&accessibility="+min_accessibility/10
    else query+="&minaccessibility="+min_accessibility/10+"&maxaccessibility="+max_accessibility/10

    if(people!=0) query+="&participants="+people

    if(type!=="") query+="&type="+type.toLowerCase()
    return this.http.get<bored>(boredUrl+query)
  }
  
}
