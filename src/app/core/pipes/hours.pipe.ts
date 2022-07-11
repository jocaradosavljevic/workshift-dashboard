import { Pipe, PipeTransform } from '@angular/core';
import { MS_IN_HOUR, MS_IN_MINUTE } from '../constants/time.constants';

@Pipe({
  name: 'msToHours'
})
export class MsToHoursPipe implements PipeTransform {

  transform(value: number| null | undefined, ...args: number[]): string {
    if (value) {
      const hours = Math.floor(value / MS_IN_HOUR);
      const minutes = Math.floor((value - hours * MS_IN_HOUR) / MS_IN_MINUTE);
      return `${hours}:${minutes} h`;
    }
    return '';
  }

}
