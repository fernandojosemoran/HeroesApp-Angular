import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHero, IPublisher } from '@heroes/interfaces/hero.interface';
import { IPublisherOptions } from '@heroes/interfaces/publisher-options.interface';
import { DialogService } from '../../../shared/services/dialog.service';
import { HeroesService } from '../../services/heroes.service';
import { SnackBarService } from '../../../shared/services/snackbar.service';
import { Subscription, switchMap, tap } from 'rxjs';
import { environment } from '@env/environment';

@Component({
  selector: 'heroes-edit-page',
  templateUrl: './edit-page.component.html'
})
export class EditPageComponent implements OnDestroy, OnInit {
  private readonly _subscribers?: Subscription[];

  private readonly _alt_image_validators: ValidatorFn[] = [
    environment.debug ?
    Validators.pattern(/^(http?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/):
    Validators.pattern(/^(https?:\/\/)([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/)
  ];

  private readonly _alter_ego_validators: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(120)
  ];

  private readonly _charactersValidators: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(200)
  ];

  private readonly first_appearance: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(80)
  ];

  private readonly _superheroValidators: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(120)
  ];

  public constructor(
    private readonly _heroesService: HeroesService,
    private readonly _router: Router,
    private readonly _snackbarService: SnackBarService,
    private readonly _dialogService: DialogService,
    private readonly _activateRouter: ActivatedRoute
  ) {}

  public loader = false;

  public ngOnInit(): void {
    const urlSerializer = (alt_image: string): string => {

      const regex = new RegExp("^/api/media/hero/[a-zA-Z0-9-]+\\.jpg$");
      const isPathName: boolean = regex.test(alt_image);

      return isPathName ? environment.backend_host + alt_image : alt_image;
    };

    const handlerHeroPipe = (hero: IHero | undefined) => {
      if (!hero) return this._router.navigate([ "/heroes/list" ]);

      this.loader = true;

      this.heroForm.setValue({
        ...hero,
        alt_image: urlSerializer(hero.alt_image)
      });

      return;
    };

    const handlerHeroNext = (hero: IHero | undefined) => {
      if (!hero) return;

      this.loader = false;

      this.heroForm.patchValue({
        ...hero,
        alt_image: urlSerializer(hero.alt_image)
      });
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
    alt_image: new FormControl<string>("", { validators: this._alt_image_validators }),
    alter_ego: new FormControl<string>("", { nonNullable: true, validators: this._alter_ego_validators }),
    characters: new FormControl<string>("", { nonNullable: true, validators: this._charactersValidators }),
    first_appearance: new FormControl<string>("", { nonNullable: true, validators: this.first_appearance }),
    publisher: new FormControl<IPublisher>("" as IPublisher , { nonNullable: true, validators: [ Validators.required ] }),
    superhero: new FormControl<string>("", { nonNullable: true, validators: this._superheroValidators })
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

    if (control?.hasError("required")) return `This field is required.`;
    if (control?.hasError("minlength")) return `Must have at least ${control.errors?.["minlength"].requiredLength} characters.`;
    if (control?.hasError("maxlength")) return `Should not exceed ${control.errors?.["maxlength"].requiredLength} characters.`;
    if (control?.hasError("pattern")) return ``;

    return "";
  }

  public updateHero(): void {
    const hero: IHero = this.heroForm.value;

    if (!this.heroForm.valid) return this._snackbarService.openUnsuccessSnackbar(`There're fields within complete.`);

    const heroResponse = (response: string | undefined) => {
      if (!response) return this._snackbarService.openUnsuccessSnackbar("Sorry something occurred wrang.");

      this._router.navigate([ `/heroes/${response}` ]);
    };

    const subscriber: Subscription = this._heroesService.updateHero(hero).subscribe(heroResponse);

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
