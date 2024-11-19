import { Pipe, PipeTransform } from '@angular/core';
import { IHero } from '@heroes/interfaces/hero.interface';

@Pipe({
  name: 'heroImageUrl'
})

export class HeroImagePipe implements PipeTransform {
  public transform(hero: IHero): string {
    if (!hero.id && !hero.alt_image) {
      return `./images/no-image.png.png`;
    }

    return `./images/heroes/${hero.id}.jpg`;
  }
}
