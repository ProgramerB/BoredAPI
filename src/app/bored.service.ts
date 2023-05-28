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
    return this.http.get<bored>(boredUrl).pipe(
      // tap(data=>console.log("Service",JSON.stringify(data)))
    )
  }
  getFromOptions(type:string,people:number,min_cost:number,max_cost:number,min_accessibility:number,max_accessibility:number):Observable<bored>{
    let query = "?minprice="+min_cost/10+"&maxprice/10="+max_cost+"&minaccessibility/10="+min_accessibility+"&maxaccessibility/10="+max_accessibility
    if(people!=0) query+="&participants="+people
    if(type!=="") query+="&type="+type.toLowerCase()
    return this.http.get<bored>(boredUrl+query)
  }
  
}
