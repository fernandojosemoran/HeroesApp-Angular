import { Component, OnInit } from '@angular/core';
import { IHero } from '@heroes/interfaces/hero.interface';
import { HeroesService } from '@heroes/services/heroes.service';

@Component({
  selector: 'heroes-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css'
})
export class ListPageComponent implements OnInit {
  public constructor(
    private readonly heroesService: HeroesService
  ) { }

  public heroes: IHero[] = [];

  public ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe((heroes) => {
        if (!heroes) return;

        this.heroes = heroes
      });
  }
}
