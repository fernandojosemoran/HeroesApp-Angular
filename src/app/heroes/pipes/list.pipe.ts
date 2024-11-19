import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'list'
})

export class ListPipe implements PipeTransform {
  public transform(value: string): string[] {
    return value.split(',').map((hero) => hero.trim());
  }
}
