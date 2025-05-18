import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/shared';

@ValidatorConstraint({ name: 'isUserExist', async: true })
@Injectable()
export class IsUserExistConstraint implements ValidatorConstraintInterface {
  constructor(private prisma: PrismaService) {}

  async validate(userId: string) {
    if (!userId) return false;

    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      return !!user;
    } catch (error) {
      return false;
    }
  }

  defaultMessage() {
    return 'User with this ID does not exist';
  }
}

export function IsUserExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUserExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsUserExistConstraint,
    });
  };
}
