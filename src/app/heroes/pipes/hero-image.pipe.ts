import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@env/environment';
import { IHero } from '@heroes/interfaces/hero.interface';

@Pipe({
  name: 'heroImageUrl'
})

export class HeroImagePipe implements PipeTransform {
  public transform(hero: IHero): string {
    if (!hero.id && !hero.alt_image) {
      return `./images/no-image.png`;
    }

    const regex = new RegExp("^/api/media/hero/[a-zA-Z0-9-]+\\.jpg$");
    const isPathName: boolean = regex.test(hero.alt_image);

    const url: string = isPathName ? environment.backend_host + hero.alt_image : hero.alt_image;

    return url;
  }
}
