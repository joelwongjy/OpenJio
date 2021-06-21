import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { getRepository } from "typeorm";
import { User } from "../entities/User";

@ValidatorConstraint()
class IsUniqueUsername implements ValidatorConstraintInterface {
  async validate(_name: string, args: ValidationArguments): Promise<boolean> {
    const user = args.object as User;

    const { username } = user;
    const queryBuilder = getRepository(User)
      .createQueryBuilder("user")
      .where("user.username = :username", { username });

    let count: number;
    if (user.id) {
      // edit an existing user
      count = await queryBuilder
        .andWhere("user.id != :id", { id: user.id })
        .getCount();
    } else {
      count = await queryBuilder.getCount();
    }

    return count === 0;
  }

  defaultMessage(_args: ValidationArguments): string {
    return "Duplicate username";
  }
}

export default IsUniqueUsername;
