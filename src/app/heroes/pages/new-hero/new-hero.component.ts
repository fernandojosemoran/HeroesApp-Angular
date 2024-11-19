import { Component } from '@angular/core';

interface IPublisherOptions {
  id: string;
  desc: string;
}

@Component({
  selector: 'heroes-new-hero-page',
  templateUrl: './new-hero.component.html',
  styleUrl: './new-hero.component.css'
})
export class NewHeroPageComponent {
  public publishers: IPublisherOptions[] = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];
}
