import {User} from '../user/User';

export interface LoginResponse{
  accessToken: string;
  user: User;
  role: string;
}
