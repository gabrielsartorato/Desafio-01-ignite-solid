import { User } from '../../model/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userList = this.usersRepository.list();

    const userAdminAlreadyExist = this.usersRepository.findById(user_id);

    if (!userAdminAlreadyExist) {
      throw new Error('User does not exist');
    }

    if (!userAdminAlreadyExist.admin) {
      throw new Error('User is not admin');
    }

    return userList;
  }
}

export { ListAllUsersUseCase };
