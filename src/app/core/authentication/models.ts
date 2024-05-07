import { UserViewModel } from "@core/services/user";

export interface Credentials {
    username: string;
    password: string;
}

export interface AuthenticationResponse {
    token: string;
    user: UserViewModel;
}