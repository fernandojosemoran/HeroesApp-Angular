export interface ILoginResponse {
  response: ILoginUser | string
}

export interface IRegisterResponse {
  response: IRegisterUser | string
}

interface IRegisterUser {
  id: string;
  userName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILoginUser {
  id: string;
  userName: string;
  lastName: string;
  email: string;
}
