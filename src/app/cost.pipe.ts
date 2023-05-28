import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cost'
})
export class CostPipe implements PipeTransform {

  transform(value: number,): string {
    if(value == 0) return "Free"
    if(value < 0.4) return "$"
    if(value < 0.7) return "$$"
    else return "$$$"
  }

}
