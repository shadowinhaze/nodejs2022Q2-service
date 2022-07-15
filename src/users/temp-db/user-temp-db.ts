import { User } from '../schemas/user.dto';

const nullUser = new User('testlogin', '12345678');

export const USERS: User[] = [nullUser];
