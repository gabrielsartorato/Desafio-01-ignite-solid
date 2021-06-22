import { User } from '../../model/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest) {
    const userAlreadyExist = this.usersRepository.findByEmail(email);

    if (userAlreadyExist) {
      throw new Error('User already exists!');
    }

    const user = this.usersRepository.create({ name, email });

    Object.assign(user, {
      created_at: new Date(),
      updated_at: new Date(),
    });

    return user;
  }
}

export { CreateUserUseCase };
