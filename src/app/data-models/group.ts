import { AppMessage } from "./app-message";
import { User } from "./user";

export interface Group{
    id: string;
    name: string;
    users: User[];
    messages: AppMessage[];
}