import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IHero, IPublisher } from '@heroes/interfaces/hero.interface';
import { DialogService } from '@heroes/services/dialog.service';
import { HeroesService } from '@heroes/services/heroes.service';
import { SnackBarService } from '@heroes/services/snackbar.service';
import { Subscription } from 'rxjs';

interface IPublisherOptions {
  id: string;
  desc: string;
}

@Component({
  selector: 'heroes-new-hero-page',
  templateUrl: './new-hero.component.html',
  styleUrl: './new-hero.component.css'
})
export class NewHeroPageComponent implements OnDestroy, OnInit {
  private readonly _subscribers?: Subscription[];

  public constructor(
    private readonly _heroesService: HeroesService,
    private readonly _router: Router,
    private readonly _snackbarService: SnackBarService,
    private readonly _dialogService: DialogService
  ) {}

  public ngOnInit(): void {}

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
  }

  public publishers: IPublisherOptions[] = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  public addNewHero(): void {
    const hero: IHero = this.heroForm.value;

    if (!this.heroForm.valid) return this._snackbarService.open(`There're fields within complete.`);

    let subscriber: Subscription = this._heroesService.addHero(hero)
      .subscribe((response)  => {
        if (!response) return this._snackbarService.open("Sorry something occurred wrang.");
        if (typeof response === "string") return this._snackbarService.open(response);

        response = response as IHero;

        this._router.navigate([`/heroes/${response.id}`]);
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
