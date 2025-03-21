import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IHero, IPublisher } from '@heroes/interfaces/hero.interface';
import { DialogService } from '../../../shared/services/dialog.service';
import { HeroesService, HeroResponseType } from '../../services/heroes.service';
import { SnackBarService } from '../../../shared/services/snackbar.service';
import { Subscription } from 'rxjs';
import { environment } from '@env/environment';

interface IPublisherOptions {
  id: string;
  desc: string;
}

@Component({
  selector: 'heroes-new-hero-page',
  templateUrl: './new-hero.component.html'
})
export class NewHeroPageComponent implements OnDestroy {
  private readonly _subscribers?: Subscription[];

  public constructor(
    private readonly _heroesService: HeroesService,
    private readonly _router: Router,
    private readonly _snackbarService: SnackBarService,
    private readonly _dialogService: DialogService
  ) {}

  public heroForm: FormGroup = new FormGroup({
    id: new FormControl<string>(""),
    alt_image: new FormControl<string>("", { validators: [ environment.debug ? Validators.pattern(/^(http?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/): Validators.pattern(/^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/) ] }),
    alter_ego: new FormControl<string>("", { nonNullable: true, validators: [ Validators.required, Validators.minLength(4), Validators.maxLength(120) ] }),
    characters: new FormControl<string>("", { nonNullable: true, validators: [ Validators.required, Validators.minLength(4), Validators.maxLength(255) ] }),
    first_appearance: new FormControl<string>("", { nonNullable: true, validators: [ Validators.required, Validators.minLength(4), Validators.maxLength(80) ] }),
    publisher: new FormControl<IPublisher>("" as IPublisher , { nonNullable: true, validators: [ Validators.required ] }),
    superhero: new FormControl<string>("", { nonNullable: true, validators: [ Validators.required, Validators.minLength(4), Validators.maxLength(120) ] })
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

  public getErrorMessage(field: string): string {
    const control = this.heroForm.get(field);

    // console.log(control);
    if (control?.hasError("required")) return `This field is required.`;
    if (control?.hasError("minlength")) return `Must have at least ${control.errors?.["minlength"].requiredLength} characters.`;
    if (control?.hasError("maxlength")) return `Should not exceed ${control.errors?.["maxlength"].requiredLength} characters.`;
    if (control?.hasError("pattern")) return ``;

    return "";
  }

  public addNewHero(): void {
    const hero: IHero = this.heroForm.value;

    if (!this.heroForm.valid) return this._snackbarService.openUnsuccessSnackbar(`There're fields within complete.`);

    const heroResponse = (response: HeroResponseType) => {
      if (!response) return this._snackbarService.openUnsuccessSnackbar("Sorry something occurred wrang.");
      if (typeof response === "string") return this._snackbarService.openUnsuccessSnackbar(response);

      response = response as IHero;

      this._router.navigate([ `/heroes/${response.id}` ]);
    };

    const subscriber: Subscription = this._heroesService.addHero(hero).subscribe(heroResponse);

    this._subscribers?.push(subscriber);
  }

  public cancelHero(): void {
    this._dialogService.open("You're sure of cancel.");
  }

  public ngOnDestroy(): void {
    this._subscribers?.forEach((subscription => subscription.unsubscribe()));
    this._dialogService.close();
    this._snackbarService.close();
  }
}
