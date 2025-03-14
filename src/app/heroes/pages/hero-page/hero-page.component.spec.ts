import { MaterialModule } from "../../../material/material.module";
import { HeroPageComponent } from "./hero-page.component";
import { HeroesService } from "../../services/heroes.service";
import { IHero, IPublisher } from "../../interfaces/hero.interface";
import { ListPageComponent } from "../list-page/list-page.component";
import { HeroCardComponent } from "../../components/hero-card/hero-card.component";
import { LayoutPageComponent } from "../layout-page/layout-page.component";
import { SearchPageComponent } from "../search-page/search-page.component";
import { NewHeroPageComponent } from "../new-hero/new-hero.component";
import { EditPageComponent } from "../edit-page/edit-page.component";
import { ListPipe } from "../../pipes/list.pipe";
import { HeroImagePipe } from "../../pipes/hero-image.pipe";

import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from "@angular/core/testing";
import { render, RenderComponentOptions } from "@testing-library/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

import userEvent from "@testing-library/user-event";


describe('./src/app/heroes/pages/hero-page/hero-page.component.ts', () => {
  let renderOptions: RenderComponentOptions<HeroPageComponent>;

  let heroesServiceMock: HeroesService;
  let activateRouterMock: ActivatedRoute;
  let routerMock: Router;

  const heroMock: IHero = {
    id: "DC-super-test",
    superhero: "super test",
    alter_ego: "jest library",
    first_appearance: "super-test #50 comic",
    characters: "spyOn, Mock, doMock, fn()",
    publisher: IPublisher.DC_COMIC,
    alt_image: "https://super-test-image/media/test.png"
  };

  beforeEach(() => {
    heroesServiceMock = {
      getHeroById: jest.fn()
    } as unknown as HeroesService;

    routerMock = {
      navigate: jest.fn(),
      navigateByUrl: jest.fn()
    } as unknown as Router;

    activateRouterMock = {
      params: of({ id: heroMock.superhero }),
      subscribe: jest.fn()
    } as unknown as ActivatedRoute;

    TestBed.configureTestingModule({
      providers: [
        { provide: HeroesService, useValue: heroesServiceMock },
        { provide: ActivatedRoute, useValue: activateRouterMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    renderOptions = {
      declarations: [
        HeroPageComponent,
        ListPageComponent,
        HeroCardComponent,
        LayoutPageComponent,
        SearchPageComponent,
        NewHeroPageComponent,
        EditPageComponent,
        ListPipe,
        HeroImagePipe,
      ],
      providers: [
        { provide: HeroesService, useValue: heroesServiceMock },
        { provide: ActivatedRoute, useValue: activateRouterMock },
        { provide: Router, useValue: routerMock },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ],
      imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
      ]
    };
  });

  test('Should HeroPageComponent display a loader spinner', async () => {

    heroesServiceMock.getHeroById = jest.fn().mockReturnValue(of());

    const screen = await render(HeroPageComponent, renderOptions);

    const spinnerElement = screen.container.querySelector("mat-spinner");

    expect(spinnerElement).toBeInTheDocument();
  });

  test('Should HeroPageComponent display a hero image', async () => {
    heroesServiceMock.getHeroById = jest.fn().mockReturnValue(of(heroMock));

    const screen = await render(HeroPageComponent, renderOptions);

    const imageElement = await screen.getByRole("img", { name: /super\stest\simage/i });

    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", heroMock.alt_image);
  });

  test('Should HeroPageComponent display superhero, alter ego, first appearance, publisher, characters list tag', async () => {
    heroesServiceMock.getHeroById = jest.fn().mockReturnValue(of(heroMock));

    const screen = await render(HeroPageComponent, renderOptions);

    const superheroListElement = await screen.getByText(heroMock.superhero);
    const alterEgoListElement = await screen.getByText(heroMock.alter_ego);
    const firstAppearanceListElement = await screen.getByText(heroMock.first_appearance);
    const publisherListElement = await screen.getByText(heroMock.publisher);
    const charactersListElement = await screen.getByText(heroMock.characters);

    expect(superheroListElement).toBeInTheDocument();
    expect(alterEgoListElement).toBeInTheDocument();
    expect(firstAppearanceListElement).toBeInTheDocument();
    expect(publisherListElement).toBeInTheDocument();
    expect(charactersListElement).toBeInTheDocument();
  });

  test('Should HeroPageComponent display go back button when hero is loaded', async () => {
    heroesServiceMock.getHeroById = jest.fn().mockReturnValue(of(heroMock));

    const screen = await render(HeroPageComponent, renderOptions);

    const goBackButton: HTMLElement = await screen.getByRole("button", { name: /Go\sBack/i });

    expect(goBackButton).toBeInTheDocument();
  });

  test('Should HeroPageComponent trigger navigation when go back button is clicked', async () => {
    heroesServiceMock.getHeroById = jest.fn().mockReturnValue(of(heroMock));

    const screen = await render(HeroPageComponent, renderOptions);

    const goBackButton: HTMLElement = await screen.getByRole("button", { name: /Go\sBack/i });

    await userEvent.click(goBackButton);

    expect(routerMock.navigate).toHaveBeenCalledWith([ "/heroes/list" ]);
  });
});
