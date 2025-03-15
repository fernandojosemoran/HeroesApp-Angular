import { SearchPageComponent } from "./search-page.component";
import { HeroesService } from "../../services/heroes.service";
import { IHero, IPublisher } from "../../interfaces/hero.interface";

import { RouterTestingModule } from '@angular/router/testing';
import { render, RenderComponentOptions } from "@testing-library/angular";
import { TestBed } from "@angular/core/testing";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../../../material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { of } from "rxjs";

// import userEvent from "@testing-library/user-event";

// const tick = (ms = 0) => {
//   jest.useFakeTimers();
// 	jest.advanceTimersByTime(ms);
//   jest.useRealTimers();
// };

describe('./src/apps/heroes/pages/search-page/search-page.component.ts', () => {
  let renderOptions: RenderComponentOptions<SearchPageComponent>;
  let heroesServiceMock: HeroesService;

  const heroes: IHero[] = [
    {
      id: "dc-super-jest-id",
      superhero: "super jest",
      alter_ego: "jest library",
      first_appearance: "comic #43",
      publisher: IPublisher.DC_COMIC,
      characters: "jest, Mock, spyOn",
      alt_image: "https://jest.com"
    },
    {
      id: "dc-super-testing-library-id",
      superhero: "super testing library",
      alter_ego: "testing library",
      first_appearance: "comic #63",
      publisher: IPublisher.MARVEL_COMIC,
      characters: "ToBeInTheDocument, ToHaveAttribute",
      alt_image: "https://testing-library.com"
    },
    {
      id: "dc-super-angular-id",
      superhero: "super angular",
      alter_ego: "angular framework",
      first_appearance: "comic #77",
      publisher: IPublisher.MARVEL_COMIC,
      characters: "Component, Module, Service",
      alt_image: "https://angular.io"
    },
    {
      id: "dc-super-typescript-id",
      superhero: "super typescript",
      alter_ego: "typescript language",
      first_appearance: "comic #101",
      publisher: IPublisher.DC_COMIC,
      characters: "Interface, Type, Generics",
      alt_image: "https://www.typescriptlang.org"
    }
  ];

  beforeEach(() => {
    heroesServiceMock = {
      getHeroes: of(heroes)
    } as unknown as HeroesService;

    TestBed.configureTestingModule({
      providers: [ { provide: HeroesService, useValue: heroesServiceMock } ]
    });

    renderOptions = {
      declarations: [
        SearchPageComponent
      ],
      providers: [
        { provide: HeroesService, useValue: heroesServiceMock },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
      ],
      imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([])
      ],
    };
  });

  test('Should SearchHeroComponent display a title', async () => {
    const screen = await render(SearchPageComponent, renderOptions);

    const title: HTMLElement = await screen.getByRole("heading", { name: /Search\sHero/i });

    expect(title).toBeInTheDocument();
  });

  test("Should SearchHeroComponent display a search label", async () => {
    const screen = await render(SearchPageComponent, renderOptions);

    const searchLabelElement: HTMLElement = await screen.findByLabelText(/Search/i);
    expect(searchLabelElement).toBeInTheDocument();
  });

  test("Should SearchHeroComponent display a search input", async () => {
    const screen = await render(SearchPageComponent, renderOptions);

    const searchInputElement: HTMLElement = await screen.getByRole("combobox");
    expect(searchInputElement).toBeInTheDocument();
  });

  test("Should SearchHeroComponent display a search comboBox", async () => {
    const screen = await render(SearchPageComponent, renderOptions);

    const searchComboBoxElement = await screen.container.querySelector("mat-autocomplete");

    expect(searchComboBoxElement).toBeInTheDocument();
  });

  // TODO: create a test for verify the search de heroes

//   test("Should SearchHeroComponent display search a hero and if hero exists then it display a hero card", async () => {
//     const hero: IHero = heroes[0];

//     const screen = await render(SearchPageComponent, renderOptions);

//     const searchInputElement: HTMLElement = await screen.getByRole("combobox");
//     await userEvent.type(searchInputElement, hero.superhero);

//     tick(1100);

//     await screen.debug();

//     console.warn({ inputValue: searchInputElement.CDATA_SECTION_NODE });
//     const heroCard = await screen.findByText(hero.superhero);

//     expect(heroCard).toBeInTheDocument();
// });
});
