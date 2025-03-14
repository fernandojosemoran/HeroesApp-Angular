import { LayoutPageComponent } from '../layout-page/layout-page.component';
import { SearchPageComponent } from '../search-page/search-page.component';
import { NewHeroPageComponent } from '../new-hero/new-hero.component';
import { HeroPageComponent } from '../hero-page/hero-page.component';
import { ListPageComponent } from '../list-page/list-page.component';
import { HeroCardComponent } from '../../components/hero-card/hero-card.component';
import { HeroesService } from '../../services/heroes.service';
import { DialogService } from '../../../shared/services/dialog.service';
import { SnackBarService } from '../../../shared/services/snackbar.service';
import { MaterialModule } from '../../../material/material.module';
import { EditPageComponent } from './edit-page.component';
import { HeroImagePipe } from '../../pipes/hero-image.pipe';
import { ListPipe } from '../../pipes/list.pipe';

import { render, RenderComponentOptions } from '@testing-library/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';

import userEvent from '@testing-library/user-event';
import { IHero } from '@heroes/interfaces/hero.interface';

describe('./src/app/heroes/pages/edit-page/edit-page.component.spec.ts', () => {

  let heroesServiceMock: HeroesService;
  let routerMock: Router;
  let snackbarServiceMock: SnackBarService;
  let dialogServiceMock: DialogService;
  let activateRouterMock: ActivatedRoute;
  let heroesService: HeroesService;
  // let httpTesting: HttpTestingController;

  let renderOptions: RenderComponentOptions<EditPageComponent>;

  beforeEach(() => {
    heroesServiceMock = {
      getHeroById: jest.fn(),
      updateHero: jest.fn(),
      deleteHero: jest.fn(),
    } as unknown as HeroesService;

    routerMock = {
      navigate: jest.fn(),
      navigateByUrl: jest.fn(),
    } as unknown as Router;

    snackbarServiceMock = {
      openUnsuccessSnackbar: jest.fn(),
      close: jest.fn(),
    } as unknown as SnackBarService;

    dialogServiceMock = {
      open: jest.fn(),
      close: jest.fn(),
    } as unknown as DialogService;

    activateRouterMock = {
      params: of({ id: 'testId' }),
    } as unknown as ActivatedRoute;

    heroesService = heroesServiceMock;

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
      imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
      ],
      providers: [
        { provide: HeroesService, useValue: heroesServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: SnackBarService, useValue: snackbarServiceMock },
        { provide: DialogService, useValue: dialogServiceMock },
        { provide: ActivatedRoute, useValue: activateRouterMock },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    };
  });

  test('Should EditPageComponent have a title', async () => {
    const screen = await render(EditPageComponent, renderOptions);
    const titleElement: HTMLElement = await screen.getByRole('heading', { level: 1 });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe('Edit');
  });

  // superhero

  test('Should EditPageComponent have an form in edit form', async () => {
    const screen = await render(EditPageComponent, renderOptions);

    const formsElements: NodeListOf<HTMLFormElement> = await screen.container.querySelectorAll('form');

    expect(formsElements).toHaveLength(1);
  });

  test('Should superhero label have content in EditPageComponent', async () => {
    const screen = await render(EditPageComponent, renderOptions);

    const superheroLabelElement = await screen.getByLabelText("Super Hero");

    expect(superheroLabelElement).toBeInTheDocument();
  });

  test('Should EditPageComponent have a superhero input', async () => {
    const screen = await render(EditPageComponent, renderOptions);

    const superheroInputElement = await screen.getByRole('textbox', { name: /Super\sHero/i });

    expect(superheroInputElement).toBeInTheDocument();
  });

  // alter ego

  test('Should alter ego label have content in EditPageComponent', async () => {
    const screen = await render(EditPageComponent, renderOptions);

    const alterEgoLabelElement = await screen.getByLabelText("Alter Ego");

    expect(alterEgoLabelElement).toBeInTheDocument();
  });

  test('Should EditPageComponent have a alter ego input', async () => {
    const screen = await render(EditPageComponent, renderOptions);

    const alterEgoInputElement = await screen.getByRole('textbox', { name: /Alter\sEgo/i });

    expect(alterEgoInputElement).toBeInTheDocument();
  });

  // first appearance

  test('Should first appearance label have content in EditPageComponent', async () => {
    const screen = await render(EditPageComponent, renderOptions);

    const firstAppearanceLabelElement = await screen.getByLabelText("Alter Ego");

    expect(firstAppearanceLabelElement).toBeInTheDocument();
  });

  test('Should EditPageComponent have a first appearance input', async () => {
    const screen = await render(EditPageComponent, renderOptions);

    const firstAppearanceInputElement = await screen.getByRole('textbox', { name: /First\sAppearance/i });

    expect(firstAppearanceInputElement).toBeInTheDocument();
  });

    // Characters

    test('Should characters label have content in EditPageComponent', async () => {
      const screen = await render(EditPageComponent, renderOptions);

      const charactersLabelElement = await screen.getByLabelText("Characters");

      expect(charactersLabelElement).toBeInTheDocument();
    });

    test('Should EditPageComponent have a characters input', async () => {
      const screen = await render(EditPageComponent, renderOptions);

      const charactersInputElement = await screen.getByRole('textbox', { name: /Characters/i });

      expect(charactersInputElement).toBeInTheDocument();
    });

    // Publisher

    test('Should publisher label have content in EditPageComponent', async () => {
      const screen = await render(EditPageComponent, renderOptions);

      const publisherLabelElement = await screen.getByLabelText("Publisher");

      expect(publisherLabelElement).toBeInTheDocument();
    });

    test('Should EditPageComponent have a publisher input', async () => {
      const screen = await render(EditPageComponent, renderOptions);

      const publisherInputElement = await screen.getByRole('combobox', { name: /Publisher/i });

      expect(publisherInputElement).toBeInTheDocument();
    });

    // Alt image

    test('Should alt image label have content in EditPageComponent', async () => {
      const screen = await render(EditPageComponent, renderOptions);

      const altImageLabelElement = await screen.getByLabelText("Alt image");

      expect(altImageLabelElement).toBeInTheDocument();
    });

    test('Should EditPageComponent have a alt image input', async () => {
      const screen = await render(EditPageComponent, renderOptions);

      const altImageInputElement = await screen.getByRole('textbox', { name: /Alt\sImage/i });

      expect(altImageInputElement).toBeInTheDocument();
    });

    // ERRORS


    // SUPERHERO ERRORS
    test("Should display error message if superhero input is not completed", async () => {
      const screen = await render(EditPageComponent, renderOptions);

      const superheroInputElement = await screen.getByRole('textbox', { name: /Super\sHero/i });

      await userEvent.click(superheroInputElement);
      await userEvent.tab();

      const errorMessage: HTMLElement = await screen.getByText("This field is required.");

      expect(errorMessage).toBeInTheDocument();
    });

    test("Should display error message if superhero input have less of 4 characters", async () => {
      const screen = await render(EditPageComponent, renderOptions);

      const superheroInputElement = await screen.getByRole('textbox', { name: /Super\sHero/i });

      await userEvent.type(superheroInputElement, "123");
      await userEvent.tab();

      const errorMessage: HTMLElement = await screen.getByText("Must have at least 4 characters.");

      expect(errorMessage).toBeInTheDocument();
    });

    test("Should display error message if superhero input had excess up to 120 characters", async () => {
      const screen = await render(EditPageComponent, renderOptions);

      const superheroInputElement = await screen.getByRole('textbox', { name: /Super\sHero/i });

      await userEvent.type(superheroInputElement, "what is angular?? Angular is a platform and framework for building single-page client applications using HTML and TypeScript.");
      await userEvent.tab();

      const errorMessage: HTMLElement = await screen.getByText(/Should\snot\sexceed\s120\scharacters/i);

      expect(errorMessage).toBeInTheDocument();
    });

    // ALTER EGO ERRORS

    test("Should display error message if alter ego input is not completed", async () => {
      const screen = await render(EditPageComponent, renderOptions);

      const alterEgoInputElement = await screen.getByRole('textbox', { name: /Alter\sEgo/i });

      await userEvent.click(alterEgoInputElement);
      await userEvent.tab();

      const errorMessage: HTMLElement = await screen.getByText("This field is required.");

      expect(errorMessage).toBeInTheDocument();
    });

    test("Should display error message if alter ego input have less of 4 characters", async () => {
      const screen = await render(EditPageComponent, renderOptions);

      const alterEgoInputElement = await screen.getByRole('textbox', { name: /Alter\sEgo/i });

      await userEvent.type(alterEgoInputElement, "123");
      await userEvent.tab();

      const errorMessage: HTMLElement = await screen.getByText("Must have at least 4 characters.");

      expect(errorMessage).toBeInTheDocument();
    });

    test("Should display error message if alter ego input exceed up to 120 characters", async () => {
      const screen = await render(EditPageComponent, renderOptions);

      const alterEgoInputElement = await screen.getByRole('textbox', { name: /Alter\sEgo/i });

      await userEvent.type(alterEgoInputElement, "what is angular?? Angular is a platform and framework for building single-page client applications using HTML and TypeScript.");
      await userEvent.tab();

      const errorMessage: HTMLElement = await screen.getByText(/Should\snot\sexceed\s120\scharacters/i);

      expect(errorMessage).toBeInTheDocument();
    });

    // FIRST APPEARANCE

    test("Should display error message if first appearance input is not completed", async () => {
      const screen = await render(EditPageComponent, renderOptions);

      const firstAppearanceInputElement = await screen.getByRole('textbox', { name: /first\sappearance/i });

      await userEvent.click(firstAppearanceInputElement);
      await userEvent.tab();

      const errorMessage: HTMLElement = await screen.getByText("This field is required.");

      expect(errorMessage).toBeInTheDocument();
    });

    test("Should display error message if first appearance input have less of 4 characters", async () => {
      const screen = await render(EditPageComponent, renderOptions);

      const firstAppearanceInputElement = await screen.getByRole('textbox', { name: /first\sappearance/i });

      await userEvent.type(firstAppearanceInputElement, "123");
      await userEvent.tab();

      const errorMessage: HTMLElement = await screen.getByText("Must have at least 4 characters.");

      expect(errorMessage).toBeInTheDocument();
    });

    test("Should display error message if first appearance input exceed up to 80 characters", async () => {
      const screen = await render(EditPageComponent, renderOptions);

      const firstAppearanceInputElement = await screen.getByRole('textbox', { name: /first\sappearance/i });

      await userEvent.type(firstAppearanceInputElement, "what is angular?? Angular is a platform and framework for building single-page client applications using HTML and TypeScript.");
      await userEvent.tab();

      const errorMessage: HTMLElement = await screen.getByText(/Should\snot\sexceed\s80\scharacters/i);

      expect(errorMessage).toBeInTheDocument();
    });

    // CHARACTERS ERRORS

    test("Should display error message if characters input is not completed", async () => {
      const screen = await render(EditPageComponent, renderOptions);

      const charactersInputElement = await screen.getByRole('textbox', { name: /Characters/i });

      await userEvent.click(charactersInputElement);
      await userEvent.tab();

      const errorMessage: HTMLElement = await screen.getByText("This field is required.");

      expect(errorMessage).toBeInTheDocument();
    });

    test("Should display error message if characters input have less of 4 characters", async () => {
      const screen = await render(EditPageComponent, renderOptions);

      const charactersInputElement = await screen.getByRole('textbox', { name: /Characters/i });

      await userEvent.type(charactersInputElement, "123");
      await userEvent.tab();

      const errorMessage: HTMLElement = await screen.getByText("Must have at least 4 characters.");

      expect(errorMessage).toBeInTheDocument();
    });

    test("Should display error message if characters input exceed up to 200 characters", async () => {
      const screen = await render(EditPageComponent, renderOptions);

      const charactersInputElement = await screen.getByRole('textbox', { name: /characters/i });

      await userEvent.type(charactersInputElement, "React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript. React is designed to let you seamlessly combine component");
      await userEvent.tab();

      const errorMessage: HTMLElement = await screen.getByText(/Should\snot\sexceed\s200\scharacters/i);

      expect(errorMessage).toBeInTheDocument();
    });

    // PUBLISHER ERRORS
    // TODO create a test for display an error if option not went selected from select tag
    // test('Should display error message if publisher selector element not selected an option', async () => {
    //   const screen = await render(EditPageComponent, renderOptions);

    //   const publisherSelectorInputElement = await screen.container.querySelector("select");
    //   const alterEgoInputElement = await screen.getByRole('textbox', { name: /Alter\sEgo/i });

    //   await userEvent.click(publisherSelectorInputElement!);

    //   await userEvent.click(alterEgoInputElement);

    //   const errorMessage = await screen.getByText(/This\sField\sIs\sRequired./i);
    //   expect(errorMessage).toBeInTheDocument();
    // });

    // ALT IMAGE ERRORS

    test("Should display error message if alt image input is not completed", async () => {
      const screen = await render(EditPageComponent, renderOptions);

      const altImageInputElement = await screen.getByRole('textbox', { name: /Alt\sImage/i });

      await userEvent.click(altImageInputElement);
      await userEvent.tab();

      const errorMessage: HTMLElement = await screen.getByText("This field is required.");

      expect(errorMessage).toBeInTheDocument();
    });

    // BUTTONS

    test('Should cancel button to call open method from DialogService', async () => {
      const screen = await render(EditPageComponent, renderOptions);

      const editButtonElement: HTMLElement = await screen.getByRole("button", { name: /cancel/i });

      await userEvent.click(editButtonElement);

      expect(dialogServiceMock.open).toHaveBeenCalledWith("You're sure of cancel.");
    });

    test('Should save button to call openUnsuccessSnackbar method from SnackbarService', async () => {
      const screen = await render(EditPageComponent, renderOptions);

      const saveButtonElement: HTMLElement = await screen.getByRole("button", { name: /save/i });

      await userEvent.click(saveButtonElement);

      expect(snackbarServiceMock.openUnsuccessSnackbar).toHaveBeenCalledWith("There're fields within complete.");
    });

    test('Should save button to call navigate method from Router', async () => {
      const heroUpdateResponse = "super-test";

      jest.spyOn(heroesServiceMock, "updateHero").mockReturnValue(of(heroUpdateResponse));

      const screen = await render(EditPageComponent, renderOptions);

      const superheroInputElement: HTMLElement = await screen.getByRole('textbox', { name: /Super\sHero/i });
      const alterEgoInputElement: HTMLElement = await screen.getByRole('textbox', { name: /Alter\sEgo/i });
      const firstAppearanceInputElement: HTMLElement = await screen.getByRole('textbox', { name: /First\sAppearance/i });
      const charactersInputElement: HTMLElement = await screen.getByRole('textbox', { name: /characters/i });
      const altImageInputElement: HTMLElement = await screen.getByRole('textbox', { name: /Alt\sImage/i });
      const saveButtonElement: HTMLElement = await screen.getByRole('button', { name: /save/i });
      const publisherComboBox: HTMLElement = await screen.getByRole('combobox', { name: /Publisher/i });

      // TODO: change this code line and refactor using testing library
      publisherComboBox.textContent = "DC - Comics";

      await userEvent.type(superheroInputElement, 'test');
      await userEvent.type(alterEgoInputElement, 'jest');
      await userEvent.type(firstAppearanceInputElement, 'jest comic #40');
      await userEvent.type(charactersInputElement, 'jest, mock, spyOn, beforeEach, beforeAfter');


      await userEvent.type(altImageInputElement, 'https://test-jest.com/image/test-image.jpg');

      await userEvent.click(saveButtonElement);

      heroesService.updateHero({} as IHero).subscribe(response => expect(routerMock.navigate).toHaveBeenCalledWith([ `/heroes/${response}` ]));
    }, 10000);
});

