type User = {
  username: string;
  password: string;
};

export interface UserRegister extends User {
  email: string;
}

export interface UserLogin extends User {}
