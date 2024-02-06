import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'numberTrans',
})
export class NumberTransPipe implements PipeTransform {
  transform(value: any): any {
    const number = Number.parseInt(value);
    if(typeof number === 'number'){
      if(number>1000){
        return (number / 1000).toFixed(1) +'k'
      }else if(number>1000000){
        return (number / 1000000).toFixed(1) + 'k'
      }else {
        return number
      }
    }else{
      throw(new Error('这不是数字！'))
    }
  }
}
