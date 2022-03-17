export interface UserRegister {
    username: string;
    password: string;
    passwordRepeat: string;
    name?: string;
    surname?: string;
    roles: string[];
}