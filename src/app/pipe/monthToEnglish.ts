import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'monthToEnglish',
})
export class monthToEnglishPipe implements PipeTransform {
  transform(value: any): any {
    const number = Number(value);
    if (number >= 0 && number <= 11) {
      const englishMonths = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      return englishMonths[number];
    } else {
      throw new Error('请传入正确的月份（数字形式）');
    }
  }
}
