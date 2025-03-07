import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { RegisterPageComponent } from './register-page.component';
import { AuthService } from "../../services/auth.service";
import { SnackBarService } from "../../../shared/services/snackbar.service";
import { render, RenderComponentOptions } from "@testing-library/angular";
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import userEvent from '@testing-library/user-event';
import { of } from 'rxjs';

type HtmlElement = Element | null;
interface Register {
  userName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

describe('./src/app/auth/pages/register-page/register-page.component.ts', () => {
  let authServiceMock: AuthService;
  let snackbarServiceMock: SnackBarService;
  let renderConfig: RenderComponentOptions<RegisterPageComponent>;

  const register: Register = {
    userName: "test",
    lastName: "jest",
    email: "test@gmail.com",
    password: "test-password123",
    confirmPassword: "test-password123"
  };

  const errorMessage = "error-message";

  beforeEach(() => {
    authServiceMock = {
      register: jest.fn(() => of(errorMessage))
    } as unknown as AuthService;

    snackbarServiceMock = {
      openUnsuccessSnackbar: jest.fn()
    } as unknown as SnackBarService;

    TestBed.configureTestingModule({
      declarations: [
        RegisterPageComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: SnackBarService, useValue: snackbarServiceMock }
      ]
    });

    renderConfig = {
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: SnackBarService, useValue: snackbarServiceMock }
      ],
      imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([])
      ]
    };
  });

  test('Should have a form element in register form', async () => {
    const screen = await render(RegisterPageComponent, renderConfig);

    const formElement: NodeListOf<HTMLFormElement> = await screen.container.querySelectorAll("form");

    expect(formElement).toHaveLength(1);
  });

  test('Should have a userName label element in register form', async () => {
    const screen = await render(RegisterPageComponent, renderConfig);

    const userNameLabelElement: HTMLElement = await screen.getByText("User Name");

    expect(userNameLabelElement).toBeInTheDocument();
  });

  test('Should have a userName input element in register form', async () => {
    const screen = await render(RegisterPageComponent, renderConfig);

    const userNameInputElement = await screen.container.querySelector("input[name='userName']");

    expect(userNameInputElement).toBeInTheDocument();
  });

  test('Should have a lastName label element in register form', async () => {
    const screen = await render(RegisterPageComponent, renderConfig);

    const userNameLabelElement: HTMLElement = await screen.getByText("Last Name");

    expect(userNameLabelElement).toBeInTheDocument();
  });

  test('Should have a lastName input element in register form', async () => {
    const screen = await render(RegisterPageComponent, renderConfig);

    const userNameInputElement = await screen.container.querySelector("input[name='lastName']");

    expect(userNameInputElement).toBeInTheDocument();
  });

  test('Should have a email label element in register form', async () => {
    const screen = await render(RegisterPageComponent, renderConfig);

    const lastNameLabelElement: HTMLElement = await screen.getByText("Last Name");

    expect(lastNameLabelElement).toBeInTheDocument();
  });

  test('Should have a email input element in register form', async () => {
    const screen = await render(RegisterPageComponent, renderConfig);

    const lastNameInputElement = await screen.container.querySelector("input[name='email']");

    expect(lastNameInputElement).toBeInTheDocument();
  });

  test('Should have a password label element in register form', async () => {
    const screen = await render(RegisterPageComponent, renderConfig);

    const passwordLabelElement: HTMLElement = await screen.getByText("Password");

    expect(passwordLabelElement).toBeInTheDocument();
  });

  test('Should have a password input element in register form', async () => {
    const screen = await render(RegisterPageComponent, renderConfig);

    const passwordInputElement = await screen.container.querySelector("input[name='password']");

    expect(passwordInputElement).toBeInTheDocument();
  });

  test('Should have a confirmPassword label element in register form', async () => {
    const screen = await render(RegisterPageComponent, renderConfig);

    const confirmPasswordLabelElement: HTMLElement = await screen.getByText("Password");

    expect(confirmPasswordLabelElement).toBeInTheDocument();
  });

  test('Should have a confirmPassword input element in register form', async () => {
    const screen = await render(RegisterPageComponent, renderConfig);

    const confirmPasswordInputElement = await screen.container.querySelector("input[name='confirmPassword']");

    expect(confirmPasswordInputElement).toBeInTheDocument();
  });

  test('Should have a register button element in register form', async () => {
    const screen = await render(RegisterPageComponent, renderConfig);

    const registerInputElement = await screen.getByRole("button", {  name: /Register/i });

    expect(registerInputElement).toBeInTheDocument();
  });

  test('Should have a login link element in register form', async () => {
    const screen = await render(RegisterPageComponent, renderConfig);

    const loginLinkElement = await screen.getByRole("link", { name: /You already have an account?/i });

    expect(loginLinkElement).toBeInTheDocument();
    expect(loginLinkElement).toHaveAttribute("href", "/auth/login");
  });

  // USERNAME ERRORS

  test('Should display an error message if userName input is missing on unfocus', async () => {
    const screen = await render(RegisterPageComponent, renderConfig);

    const userNameInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="userName"]');
    const emailInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="email"]');

    await userEvent.click(userNameInputElement!);
    await userEvent.click(emailInputElement!);

    const errorParagraphElement: HtmlElement = await screen.getByText(/This field is required./i);

    expect(errorParagraphElement).toBeInTheDocument();
  });

  test("Should display an error message if userName input has fewer than 4 characters", async () => {
    const screen = await render(RegisterPageComponent, renderConfig);

    const userNameInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="userName"]');
    const emailInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="email"]');

    await userEvent.type(userNameInputElement!, "abc");
    await userEvent.click(emailInputElement!);

    const errorParagraphElement: HtmlElement = await screen.getByText(/Must have at least 4 characters./i);

    expect(errorParagraphElement).toBeInTheDocument();
  });

  test("Should display an error message if userName input exceeds 50 characters", async () => {
    const screen = await render(RegisterPageComponent, renderConfig);

    const userNameInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="userName"]');
    const emailInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="email"]');

    await userEvent.type(userNameInputElement!, "what is angular?? Angular is a platform and framework for building single-page client applications using HTML and TypeScript. Angular is written in TypeScript. It implements core and optional functionality as a set of TypeScript libraries that you import into your apps.");
    await userEvent.click(emailInputElement!);

    const errorParagraphElement: HtmlElement = await screen.getByText(/Should not exceed 50 characters./i);

    expect(errorParagraphElement).toBeInTheDocument();
  });

  // LAST NAME ERRORS

  test('Should display an error message if lastName input is missing on unfocus', async () => {
    const screen = await render(RegisterPageComponent, renderConfig);

    const lastNameInputElement: HtmlElement = await screen.container.querySelector('input[name="lastName"]');
    const emailInputElement: HtmlElement = await screen.container.querySelector('input[name="email"]');

    await userEvent.click(lastNameInputElement!);
    await userEvent.click(emailInputElement!);

    const errorParagraphElement: HtmlElement = await screen.getByText(/This field is required./i);

    expect(errorParagraphElement).toBeInTheDocument();
  });

  test("Should display an error message if lastName input has fewer than 4 characters", async () => {
    const screen = await render(RegisterPageComponent, renderConfig);

    const lastNameInputElement: HtmlElement = await screen.container.querySelector('input[name="lastName"]');
    const emailInputElement: HtmlElement = await screen.container.querySelector('input[name="email"]');

    await userEvent.type(lastNameInputElement!, "abc");
    await userEvent.click(emailInputElement!);

    const errorParagraphElement: HtmlElement = await screen.getByText(/Must have at least 4 characters./i);

    expect(errorParagraphElement).toBeInTheDocument();
  });

  test("Should display an error message if lastName input exceeds 50 characters", async () => {
    const screen = await render(RegisterPageComponent, renderConfig);

    const lastNameInputElement: HtmlElement = await screen.container.querySelector('input[name="lastName"]');
    const emailInputElement: HtmlElement = await screen.container.querySelector('input[name="email"]');

    await userEvent.type(lastNameInputElement!, "what is angular?? Angular is a platform and framework for building single-page client applications using HTML and TypeScript. Angular is written in TypeScript. It implements core and optional functionality as a set of TypeScript libraries that you import into your apps.");
    await userEvent.click(emailInputElement!);

    const errorParagraphElement: HtmlElement = await screen.getByText(/Should not exceed 50 characters./i);

    expect(errorParagraphElement).toBeInTheDocument();
  });


    // EMAIL USER ERRORS

    test('Should display an error message if email input missing on unfocus', async () => {
      const screen = await render(RegisterPageComponent, renderConfig);

      const emailInputElement: HtmlElement = await screen.container.querySelector('input[name="email"]');
      const userNameInputElement: HtmlElement = await screen.container.querySelector('input[name="lastName"]');

      await userEvent.click(emailInputElement!);
      await userEvent.click(userNameInputElement!);

      const errorParagraphElement: HtmlElement = await screen.getByText(/This field is required./i);

      expect(errorParagraphElement).toBeInTheDocument();
    });

    test("Should display an error message if email input is invalid", async () => {
      const screen = await render(RegisterPageComponent, renderConfig);

      const emailInputElement: HtmlElement = await screen.container.querySelector('input[name="email"]');
      const userNameInputElement: HtmlElement = await screen.container.querySelector('input[name="lastName"]');

      await userEvent.type(emailInputElement!, "abc");
      await userEvent.click(userNameInputElement!);

      const errorParagraphElement: HtmlElement = await screen.getByText(/The email address is not valid./i);

      expect(errorParagraphElement).toBeInTheDocument();
    });

    // PASSWORD ERRORS

    test('Should display an error message if password input missing on unfocus', async () => {
      const screen = await render(RegisterPageComponent, renderConfig);

      const passwordInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="password"]');
      const emailInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="email"]');

      await userEvent.click(passwordInputElement!);
      await userEvent.click(emailInputElement!);

      const errorParagraphElement: HtmlElement = await screen.getByText(/This field is required./i);

      expect(errorParagraphElement).toBeInTheDocument();
    });

    test("Should display an error message if password input have least 3 characters", async () => {
      const screen = await render(RegisterPageComponent, renderConfig);

      const passwordInputElement: HtmlElement = await screen.container.querySelector('input[name="password"]');
      const emailInputElement: HtmlElement = await screen.container.querySelector('input[name="email"]');

      await userEvent.type(passwordInputElement!, "ab");
      await userEvent.click(emailInputElement!);

      const errorParagraphElement: HtmlElement = await screen.getByText(/Must have at least 3 characters./i);

      expect(errorParagraphElement).toBeInTheDocument();
    });

    test("Should display an error message if password input exceed 100 characters", async () => {
      const screen = await render(RegisterPageComponent, renderConfig);

      const passwordInputElement: HtmlElement = await screen.container.querySelector('input[name="password"]');
      const emailInputElement: HtmlElement = await screen.container.querySelector('input[name="email"]');

      await userEvent.type(passwordInputElement!, "what is angular?? Angular is a platform and framework for building single-page client applications using HTML and TypeScript. Angular is written in TypeScript. It implements core and optional functionality as a set of TypeScript libraries that you import into your apps.");
      await userEvent.click(emailInputElement!);

      const errorParagraphElement: HtmlElement = await screen.getByText(/Should not exceed 100 characters./i);

      expect(errorParagraphElement).toBeInTheDocument();
    });

    // CONFIRM PASSWORD ERRORS

    test('Should display an error message if confirm password input missing on unfocus', async () => {
      const screen = await render(RegisterPageComponent, renderConfig);

      const passwordInputElement: HtmlElement = await screen.container.querySelector('input[name="confirmPassword"]');
      const emailInputElement: HtmlElement = await screen.container.querySelector('input[name="email"]');

      await userEvent.click(passwordInputElement!);
      await userEvent.click(emailInputElement!);

      const errorParagraphElement: HtmlElement = await screen.getByText(/This field is required./i);

      expect(errorParagraphElement).toBeInTheDocument();
    });

    test("Should display an error message if confirm password input have least 3 characters", async () => {
      const screen = await render(RegisterPageComponent, renderConfig);

      const passwordInputElement: HtmlElement = await screen.container.querySelector('input[name="confirmPassword"]');
      const emailInputElement: HtmlElement = await screen.container.querySelector('input[name="email"]');

      await userEvent.type(passwordInputElement!, "ab");
      await userEvent.click(emailInputElement!);

      const errorParagraphElement: HtmlElement = await screen.getByText(/Must have at least 3 characters./i);

      expect(errorParagraphElement).toBeInTheDocument();
    });

    test("Should display an error message if confirm password input exceed 100 characters", async () => {
      const screen = await render(RegisterPageComponent, renderConfig);

      const passwordInputElement: HtmlElement = await screen.container.querySelector('input[name="confirmPassword"]');
      const emailInputElement: HtmlElement = await screen.container.querySelector('input[name="email"]');

      await userEvent.type(passwordInputElement!, "what is angular?? Angular is a platform and framework for building single-page client applications using HTML and TypeScript. Angular is written in TypeScript. It implements core and optional functionality as a set of TypeScript libraries that you import into your apps.");
      await userEvent.click(emailInputElement!);

      const errorParagraphElement: HtmlElement = await screen.getByText(/Should not exceed 100 characters./i);

      expect(errorParagraphElement).toBeInTheDocument();
    });

    // BUTTONS

    test('Should call login method when register button is clicked', async () => {
      const screen = await render(RegisterPageComponent, renderConfig);

      const registerButtonElement: HtmlElement = await screen.getByRole("button", { name: "Register" });

      const userNameInputElement: HtmlElement = await screen.container.querySelector('input[name="userName"]');
      const lastNameInputElement: HtmlElement = await screen.container.querySelector('input[name="lastName"]');
      const confirmPasswordInputElement: HtmlElement = await screen.container.querySelector('input[name="confirmPassword"]');
      const emailInputElement: HtmlElement = await screen.container.querySelector('input[name="email"]');
      const passwordInputElement: HtmlElement = await screen.container.querySelector('input[name="password"]');

      await userEvent.type(userNameInputElement!, register.userName);
      await userEvent.type(lastNameInputElement!, register.lastName);
      await userEvent.type(emailInputElement!, register.email);
      await userEvent.type(confirmPasswordInputElement!, register.confirmPassword);
      await userEvent.type(passwordInputElement!, register.password);

      await userEvent.click(registerButtonElement);

      expect(authServiceMock.register).toHaveBeenCalled();
    });

    test('Should call snackbar service when register button is clicked', async () => {
      const screen = await render(RegisterPageComponent, renderConfig);

      const userNameInputElement: HtmlElement = await screen.container.querySelector('input[name="userName"]');
      const lastNameInputElement: HtmlElement = await screen.container.querySelector('input[name="lastName"]');
      const confirmPasswordInputElement: HtmlElement = await screen.container.querySelector('input[name="confirmPassword"]');
      const emailInputElement: HtmlElement = await screen.container.querySelector('input[name="email"]');
      const passwordInputElement: HtmlElement = await screen.container.querySelector('input[name="password"]');

      await userEvent.type(userNameInputElement!, register.userName);
      await userEvent.type(lastNameInputElement!, register.lastName);
      await userEvent.type(emailInputElement!, register.email);
      await userEvent.type(confirmPasswordInputElement!, register.confirmPassword);
      await userEvent.type(passwordInputElement!, register.password);

      const registerButtonElement: HtmlElement = await screen.getByRole("button", { name: "Register" });

      await userEvent.click(registerButtonElement);

      expect(snackbarServiceMock.openUnsuccessSnackbar).toHaveBeenCalledWith(errorMessage);
    });

    test('Should have a login link in register form', async () => {
      const screen = await render(RegisterPageComponent, renderConfig);

      const loginLink = await screen.findByRole("link", { name: /You already have an account?/i });

      expect(loginLink).toBeInTheDocument();
      expect(loginLink).toHaveAttribute("href", "/auth/login");
    });
});
