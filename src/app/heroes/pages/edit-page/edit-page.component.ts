import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IHero, IPublisher } from '@heroes/interfaces/hero.interface';
import { IPublisherOptions } from '@heroes/interfaces/publisher-options.interface';
import { DialogService } from '@shared/services/dialog.service';
import { HeroesService } from '@heroes/services/heroes.service';
import { SnackBarService } from '@shared/services/snackbar.service';
import { Subscription, switchMap, tap } from 'rxjs';
import { environment } from '@env/environment';

@Component({
  selector: 'heroes-edit-page',
  templateUrl: './edit-page.component.html'
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

      this.heroForm.setValue({
        ...hero,
        alt_image: `${environment.backend_host}${hero.alt_image}`
      });

      return;
    };

    const handlerHeroNext = (hero: IHero | undefined) => {
      if (!hero) return;

      this.loader = false;

      this.heroForm.patchValue({
        ...hero,
        alt_image: `${environment.backend_host}${hero.alt_image}`
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

    console.log(control);
    if (control?.hasError("required")) return `This field is required.`;
    if (control?.hasError("minlength")) return `Must have at least ${control.errors?.["minlength"].requiredLength} characters.`;
    if (control?.hasError("maxlength")) return `Should not exceed ${control.errors?.["maxlength"].requiredLength} characters.`;
    if (control?.hasError("pattern")) return ``;

    return "";
  }

  public updateHero(): void {
    const hero: IHero = this.heroForm.value;

    if (!this.heroForm.valid) return this._snackbarService.openUnsuccessSnackbar(`There're fields within complete.`);

    const subscriber: Subscription = this._heroesService.updateHero(hero)
      .subscribe((response)  => {
        if (!response) return this._snackbarService.openUnsuccessSnackbar("Sorry something occurred wrang.");

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
