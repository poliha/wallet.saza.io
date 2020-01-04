import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'splitOpName' })
export class SplitOpName implements PipeTransform {
  transform(value: string): string {
    const regex = /([a-z])([A-Z])/g;
    return value.replace(regex, '$1 $2').replace('_', ' ');
  }
}
