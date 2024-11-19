import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IHero } from '@heroes/interfaces/hero.interface';
import { HeroesService } from '@heroes/services/heroes.service';
import { pipe, Subscription, switchMap, tap } from 'rxjs';

@Component({
  selector: 'heroes-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css'
})
export class HeroPageComponent implements OnInit, OnDestroy {
  private _subscribe?: Subscription;
  private _id?: string;

  public constructor(
    private readonly _heroService: HeroesService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router
  ) { }

  public hero: IHero | undefined;

  public ngOnInit(): void {
    this._activatedRoute.params
      .pipe(
        switchMap(({ id }) => {
          if (!id) return this._router.navigateByUrl("/heroes/list");

          this._id = id;
          return Promise.resolve(true);
        }))
      .subscribe();

    this._subscribe = this._heroService.getHeroById(this._id!)
      .subscribe(
        (hero) => {
          if (!hero) return this._router.navigate(["/heroes/list"]);

          this.hero = hero;
          return;
        }
      );
  }

  public goBack(): void {
    this._router.navigate(["/heroes/list"]);
  }

  public ngOnDestroy(): void {
    this._subscribe?.unsubscribe();
  }
}
