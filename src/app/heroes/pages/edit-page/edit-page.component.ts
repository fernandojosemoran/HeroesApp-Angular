import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHero, IPublisher } from '@heroes/interfaces/hero.interface';
import { IPublisherOptions } from '@heroes/interfaces/publisher-options.interface';
import { DialogService } from '@heroes/services/dialog.service';
import { HeroesService } from '@heroes/services/heroes.service';
import { SnackBarService } from '@heroes/services/snackbar.service';
import { Subscription, switchMap, tap } from 'rxjs';

@Component({
  selector: 'heroes-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrl: './edit-page.component.css'
})
export class EditPageComponent implements OnDestroy, OnInit {
  private readonly _subscribers?: Subscription[];

  public constructor(
    private readonly _heroesService: HeroesService,
    private readonly _router: Router,
    private readonly _snackbarService: SnackBarService,
    private readonly _dialogService: DialogService,
    private readonly _activateRouter: ActivatedRoute
  ) {}

  public loader = false;

  public ngOnInit(): void {

    const handlerHeroPipe = (hero: IHero | undefined) => {
      if (!hero) return this._router.navigate([ "/heroes/list" ]);

      this.loader = true;

      this.heroForm.setValue(hero);

      return;
    };

    const handlerHeroNext = (hero: IHero | undefined) => {
      if (!hero) return;

      this.loader = false;

      this.heroForm.patchValue(hero);
    };

    this._activateRouter.params.pipe(
      switchMap(({ id }) => this._heroesService.getHeroById(id)),
      tap(handlerHeroPipe)
    ).subscribe({
      next: handlerHeroNext,
      error: () => this._router.navigateByUrl("/heroes/list")
    });
  }

  public heroForm: FormGroup = new FormGroup({
    id: new FormControl<string>(""),
    alt_image: new FormControl<string>(""),
    alter_ego: new FormControl<string>("", { nonNullable: true }),
    characters: new FormControl<string>("", { nonNullable: true }),
    first_appearance: new FormControl<string>("", { nonNullable: true }),
    publisher: new FormControl<IPublisher>("" as IPublisher , { nonNullable: true }),
    superhero: new FormControl<string>("", { nonNullable: true })
  });

  public formControlFieldName: IHero = {
    id: "id",
    alt_image: "alt_image",
    alter_ego: "alter_ego",
    characters: "characters",
    first_appearance: "first_appearance",
    publisher: "publisher" as IPublisher,
    superhero: "superhero"
  };

  public publishers: IPublisherOptions[] = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  public updateHero(): void {
    const hero: IHero = this.heroForm.value;

    if (!this.heroForm.valid) return this._snackbarService.open(`There're fields within complete.`);

    const subscriber: Subscription = this._heroesService.updateHero(hero)
      .subscribe((response)  => {
        if (!response) return this._snackbarService.open("Sorry something occurred wrang.");

        this._router.navigate([ `/heroes/${response}` ]);
      });

    this._subscribers?.push(subscriber);
  }

  public cancelHero(): void {
    this._dialogService.open("You are sure of cancel.");
  }

  public ngOnDestroy(): void {
    this._subscribers?.forEach((subscription => subscription.unsubscribe()));
    this._dialogService.close();
    this._snackbarService.close();
  }
}
