import { Pipe, PipeTransform } from '@angular/core';
import remarkHtml from 'remark-html';
import remarkParse from 'remark-parse';
import { unified } from 'unified';

@Pipe({
  name: 'marked',
})
export class MarkedPipe implements PipeTransform {
  transform(value: any): any {
    if (value && value.length > 0) {
      const processor = unified().use(remarkParse).use(remarkHtml);
      return String(processor.processSync(value));
    }
    return value;
  }
}
