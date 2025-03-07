import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { IHero } from '@heroes/interfaces/hero.interface';
import { HeroesService } from '@heroes/services/heroes.service';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'heroes-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements OnInit, OnDestroy {
  private _subscriber?: Subscription;
  private _debounce: Subject<string> = new Subject<string>();
  private _debounceSubscription?: Subscription;

  public constructor(
    private readonly heroesService: HeroesService
  ) { }

  public heroes: IHero[] = [];
  public heroesText = [ "spider man", "hulk" ];
  public fmControlSearchInput: FormControl = new FormControl('');

  public loader = false;

  public ngOnInit(): void {
    this._debounceSubscription = this._debounce
      .pipe(debounceTime(1000))
      .subscribe(query => this.searchHero(query));
  }

  public onKeyPress(): void {
    const query: string = this.fmControlSearchInput.value.trim();
    this.heroes = [];

    if (!query) return;

    this.loader = true;
    this._debounce.next(query);
  }

  private searchHero(query: string): void {
    this._subscriber = this.heroesService.searchHero(query)
      .subscribe(heroes => {
        if (!heroes) return;

        this.heroes = heroes;
        this.loader = false;
      });
  }

  public ngOnDestroy(): void {
    this._subscriber!.unsubscribe();
    this._debounceSubscription!.unsubscribe();
  }

  public onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    const heroSelected: IHero = event.option.value;

    if (!heroSelected.id) return;

    this.fmControlSearchInput.setValue(heroSelected.superhero);

    this.heroesService.getHeroById(heroSelected.id)
      .subscribe((hero) => {
        if (!hero) return;

        this.heroes = [ hero ];
      });
  }
}
