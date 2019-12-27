import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncatePublicKey' })
export class TruncatePublicKey implements PipeTransform {
  transform(value: string): string {
    const output = `${value.slice(0, 4)}...${value.slice(-4)}`;
    return output;
  }
}