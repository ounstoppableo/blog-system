import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'numberTrans',
})
export class NumberTransPipe implements PipeTransform {
  transform(value: any): any {
    const number = Number.parseInt(value);
    if (typeof number === 'number') {
      if (number > 1000 && number < 1000000) {
        return Number.isInteger(number / 1000)
          ? number / 1000 + 'K'
          : (number / 1000).toFixed(1) + 'K';
      } else if (number > 1000000) {
        return Number.isInteger(number / 1000000)
          ? number / 1000000 + 'M'
          : (number / 1000000).toFixed(1) + 'M';
      } else {
        return number;
      }
    } else {
      throw new Error('这不是数字！');
    }
  }
}
