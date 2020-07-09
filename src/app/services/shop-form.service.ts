import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  constructor() { }

  getCreditCardMonths(startMonth: number): Observable<number[]>{

    let data: number[] = [];

    //build an array for "Month" dropdown List
    //- start at current month and loop untill
    for(let theMonth = startMonth; theMonth<=12;theMonth++){
      data.push(theMonth);
    }
    return of(data);

  }

  getCreditCardYears(): Observable<number[]>{
    let data: number[] = [];

    //build an array for "Year" dropdown List
    //- start at current year and loop for 10 years

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 18;

    for(let theYear = startYear; theYear<=endYear; theYear++){
      data.push(theYear);
    }
    return of(data);


  }

}
