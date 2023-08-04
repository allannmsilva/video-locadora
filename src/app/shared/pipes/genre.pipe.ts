import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genre'
})
export class GenrePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'Terror': return 'thunderstorm';
      case 'Ação': return 'sports_martial_arts';
    }
    return 'width-full';
  }

}
