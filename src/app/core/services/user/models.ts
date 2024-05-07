import { UserTypeRoleEnum } from "@core/models/enums";

export interface UserViewModel {
    type: UserTypeRoleEnum;
    id: string;
    imageUrl?: string;
    email: string;
    firstName: string;
}
