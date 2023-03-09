import { UserIterface } from '../../user/interface/user.interface';

export interface PayloadInterface {
  userId: UserIterface['id'];
  login: UserIterface['login'];
}
