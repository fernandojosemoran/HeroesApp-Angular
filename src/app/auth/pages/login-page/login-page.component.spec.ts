import { TestBed } from "@angular/core/testing";
import { AuthService } from "../../services/auth.service";
import { SnackBarService } from "../../../shared/services/snackbar.service";
import { MaterialModule } from "../../../material/material.module";
import { render, RenderComponentOptions } from "@testing-library/angular";
import { LoginPageComponent } from "./login-page.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { Directive, Input } from '@angular/core';
import { of } from "rxjs";
// import { Router } from "@angular/router";


import userEvent from "@testing-library/user-event";


type HtmlElement = Element | null;
interface Login {
  userName: string;
  email: string;
  password: string;
}

// TypeError: Cannot read properties of undefined (reading 'root')
@Directive({
  selector: "[appRouterLink]"
})
export class RouterLinkDirectiveStubDirective  {
  @Input('appRouterLink') linkParams: any;
}

describe('./src/app/auth/pages/login-page.component.ts', () => {
  let authServiceMock: AuthService;
  let snackbarServiceMock: SnackBarService;
  // let routerMock: Router;

  let renderOptions: RenderComponentOptions<LoginPageComponent>;

  const errorMessage = "email is not valid";

  const login: Login = {
    userName: "test",
    email: "test@gmail.com",
    password: "test-password123"
  };

  beforeEach(() => {
    authServiceMock = {
      login: jest.fn(() => of(errorMessage))
    } as unknown as AuthService;

    snackbarServiceMock = {
      openUnsuccessSnackbar: jest.fn()
    } as unknown as SnackBarService;

    // routerMock = {
    //   navigate: jest.fn()
    // } as unknown as Router;

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        SnackBarService,
        // Router
      ]
    });

    renderOptions = {
      declarations: [
        LoginPageComponent,
        RouterLinkDirectiveStubDirective
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: SnackBarService, useValue: snackbarServiceMock },
      ],
      imports: [
        MaterialModule,
        CommonModule,
        ReactiveFormsModule,
        // TypeError: Cannot read properties of undefined (reading 'root')
        RouterTestingModule.withRoutes([])
      ]
    };
  });
  // Verifying if elements exists

  test('Should have a form in the login form', async () => {
    const { container } = await render(LoginPageComponent, renderOptions);

    const getAllFormElement: NodeListOf<HTMLFormElement> = await container.querySelectorAll('form');

    expect(getAllFormElement).toHaveLength(1);
  });

  test('Should have three inputs in the login form', async () => {
    const { container } = await render(LoginPageComponent, renderOptions);

    const getAllInputElements: NodeListOf<HTMLInputElement> = await container.querySelectorAll('input');

    expect(getAllInputElements).toHaveLength(3);
  });

  test('Should have userName, email, and password inputs in the login form', async () => {
    const { container } = await render(LoginPageComponent, renderOptions);

    const userNameInputElement: HtmlElement = await container.querySelector('input[formControlName="userName"]');
    const emailInputElement: HtmlElement = await container.querySelector('input[formControlName="email"]');
    const passwordInputElement: HtmlElement = await container.querySelector('input[formControlName="password"]');

    expect(userNameInputElement).toBeInTheDocument();
    expect(emailInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
  });

  test('Should have three labels in the login form', async () => {
    const { container } = await render(LoginPageComponent, renderOptions);

    const getAllLabelElements: NodeListOf<HTMLLabelElement> = await container.querySelectorAll('label');

    expect(getAllLabelElements).toHaveLength(3);
  });

  test('Should have userName, email, and password label in the login form', async () => {
    const screen = await render(LoginPageComponent, renderOptions);

    const userNameLabelElement: HtmlElement = await screen.findByLabelText("UserName");
    const emailLabelElement: HtmlElement = await screen.findByLabelText("Email");
    const passwordLabelElement: HtmlElement = await screen.findByLabelText("Password");

    expect(userNameLabelElement).toBeInTheDocument();
    expect(emailLabelElement).toBeInTheDocument();
    expect(passwordLabelElement).toBeInTheDocument();
  });

  test('Should have a login button in the login form', async () => {
    const screen = await render(LoginPageComponent, renderOptions);

    const loginButtonElement: HtmlElement = await screen.getByRole("button", { name: "Login" });

    expect(loginButtonElement).toBeInTheDocument();
  });

  test('Should have a register link in the login form', async () => {
    const screen = await render(LoginPageComponent, renderOptions);

    const registerLinkElement: HtmlElement = await screen.getByRole("link", { name: "Create an account?" });

    expect(registerLinkElement).toBeInTheDocument();
  });

  // USERNAME ERRORS

  test('Should display an error message if userName input is missing on unfocus', async () => {
    const screen = await render(LoginPageComponent, renderOptions);

    const userNameInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="userName"]');
    const emailInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="email"]');

    await userEvent.click(userNameInputElement!);
    await userEvent.click(emailInputElement!);

    const errorParagraphElement: HtmlElement = await screen.getByText(/This field is required./i);

    expect(errorParagraphElement).toBeInTheDocument();
  });

  test("Should display an error message if userName input has fewer than 4 characters", async () => {
    const screen = await render(LoginPageComponent, renderOptions);

    const userNameInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="userName"]');
    const emailInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="email"]');

    await userEvent.type(userNameInputElement!, "abc");
    await userEvent.click(emailInputElement!);

    const errorParagraphElement: HtmlElement = await screen.getByText(/Must have at least 4 characters./i);

    expect(errorParagraphElement).toBeInTheDocument();
  });

  test("Should display an error message if userName input exceeds 50 characters", async () => {
    const screen = await render(LoginPageComponent, renderOptions);

    const userNameInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="userName"]');
    const emailInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="email"]');

    await userEvent.type(userNameInputElement!, "what is angular?? Angular is a platform and framework for building single-page client applications using HTML and TypeScript. Angular is written in TypeScript. It implements core and optional functionality as a set of TypeScript libraries that you import into your apps.");
    await userEvent.click(emailInputElement!);

    const errorParagraphElement: HtmlElement = await screen.getByText(/Should not exceed 50 characters./i);

    expect(errorParagraphElement).toBeInTheDocument();
  });

  // EMAIL USER ERRORS

  test('Should display an error message if email input missing on unfocus', async () => {
    const screen = await render(LoginPageComponent, renderOptions);

    const emailInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="email"]');
    const userNameInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="userName"]');

    await userEvent.click(emailInputElement!);
    await userEvent.click(userNameInputElement!);

    const errorParagraphElement: HtmlElement = await screen.getByText(/This field is required./i);

    expect(errorParagraphElement).toBeInTheDocument();
  });

  test("Should display an error message if email input is invalid", async () => {
    const screen = await render(LoginPageComponent, renderOptions);

    const emailInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="email"]');
    const userNameInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="userName"]');

    await userEvent.type(emailInputElement!, "abc");
    await userEvent.click(userNameInputElement!);

    const errorParagraphElement: HtmlElement = await screen.getByText(/The email address is not valid./i);

    expect(errorParagraphElement).toBeInTheDocument();
  });

  // PASSWORD ERRORS

  test('Should display an error message if password input missing on unfocus', async () => {
    const screen = await render(LoginPageComponent, renderOptions);

    const passwordInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="password"]');
    const emailInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="email"]');

    await userEvent.click(passwordInputElement!);
    await userEvent.click(emailInputElement!);

    const errorParagraphElement: HtmlElement = await screen.getByText(/This field is required./i);

    expect(errorParagraphElement).toBeInTheDocument();
  });

  test("Should display an error message if password input have least 3 characters", async () => {
    const screen = await render(LoginPageComponent, renderOptions);

    const passwordInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="password"]');
    const emailInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="email"]');

    await userEvent.type(passwordInputElement!, "ab");
    await userEvent.click(emailInputElement!);

    const errorParagraphElement: HtmlElement = await screen.getByText(/Must have at least 3 characters./i);

    expect(errorParagraphElement).toBeInTheDocument();
  });

  test("Should display an error message if password input exceed 100 characters", async () => {
    const screen = await render(LoginPageComponent, renderOptions);

    const passwordInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="password"]');
    const emailInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="email"]');

    await userEvent.type(passwordInputElement!, "what is angular?? Angular is a platform and framework for building single-page client applications using HTML and TypeScript. Angular is written in TypeScript. It implements core and optional functionality as a set of TypeScript libraries that you import into your apps.");
    await userEvent.click(emailInputElement!);

    const errorParagraphElement: HtmlElement = await screen.getByText(/Should not exceed 100 characters./i);

    expect(errorParagraphElement).toBeInTheDocument();
  });

  // BUTTONS

  test('Should call login method when login button is clicked', async () => {
    const screen = await render(LoginPageComponent, renderOptions);

    const loginButtonElement: HtmlElement = await screen.getByRole("button", { name: "Login" });

    const userNameInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="userName"]');
    const emailInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="email"]');
    const passwordInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="password"]');

    await userEvent.type(userNameInputElement!, login.userName);
    await userEvent.type(emailInputElement!, login.email);
    await userEvent.type(passwordInputElement!, login.password);

    await userEvent.click(loginButtonElement);

    expect(authServiceMock.login).toHaveBeenCalled();
  });

  test('Should call snackbar service when login button is clicked', async () => {
    const screen = await render(LoginPageComponent, renderOptions);

    const userNameInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="userName"]');
    const emailInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="email"]');
    const passwordInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="password"]');

    await userEvent.type(userNameInputElement!, login.userName);
    await userEvent.type(emailInputElement!, login.email);
    await userEvent.type(passwordInputElement!, login.password);

    const loginButtonElement: HtmlElement = await screen.getByRole("button", { name: "Login" });

    await userEvent.click(loginButtonElement);

    expect(snackbarServiceMock.openUnsuccessSnackbar).toHaveBeenCalledWith(errorMessage);
  });

  // TODO: Create a test for verify if router.navigate in login form went called.

  // test("Should call router.navigate method with a [ '/heroes/list' ] link", async () => {
  //   const response: ILoginUser = {
  //     id: "test-id",
  //     userName:login.userName,
  //     email: login.email,
  //     lastName: "test-lastName",
  //   };

  //   jest.spyOn(authServiceMock, "login").mockReturnValueOnce(of(response));

  //   const screen = await render(LoginPageComponent, renderOptions);

  //   const userNameInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="userName"]');
  //   const emailInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="email"]');
  //   const passwordInputElement: HtmlElement = await screen.container.querySelector('input[formControlName="password"]');

  //   await userEvent.type(userNameInputElement!, login.userName);
  //   await userEvent.type(emailInputElement!, login.email);
  //   await userEvent.type(passwordInputElement!, login.password);

  //   const loginButtonElement: HtmlElement = await screen.getByRole("button", { name: "Login" });

  //   await userEvent.click(loginButtonElement);

  //   expect(routerMock.navigate).toHaveBeenCalledWith([ "/heroes/list" ]);
  // });

    test('Should have a login link in register form', async () => {
      const screen = await render(LoginPageComponent, renderOptions);

      const loginLink = await screen.findByRole("link", { name: /Create an account?/i });

      expect(loginLink).toBeInTheDocument();
      expect(loginLink).toHaveAttribute("href", "/auth/register");
    });
});
