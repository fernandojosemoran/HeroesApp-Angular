export interface ILoginResponse {
  response: ILoginUser | string
}

export interface IRegisterResponse {
  response: IRegisterUser | string
}

interface IRegisterUser {

}

export interface ILoginUser {
  id: string;
  userName: string;
  lastName: string;
  email: string;
}
