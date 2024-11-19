import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'customNotEmpty', async: false })
export class CustomClassNotEmpty implements ValidatorConstraintInterface {
  validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    return value.length > 0;
  }
}
