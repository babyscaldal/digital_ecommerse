export interface ILoginResponseData {
  user: {
    email: string;
    username: string;
    bio: string;
    image: string;
    token: string;
  };
}

export interface ILoginRequestData {
  user: {
    email: string;
    password: string;
  };
}

export interface IRegisterResponseData {
  user: {
    id: string;
    email: string;
    username: string;
    bio: string;
    image: string;
    token: string;
  };
}

export interface IRegisterRequestData {
  user: {
    email: string;
    username: string;
    password: string;
  };
}
