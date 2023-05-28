import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accessibility'
})
export class AccessibilityPipe implements PipeTransform {

  transform(value: number): string {
    if(value < 4) return "Easy"
    if(value < 7) return "Moderate"
    else return "Hard"
  }

}
