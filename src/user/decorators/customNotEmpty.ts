import { registerDecorator, ValidationOptions } from 'class-validator';
import { CustomClassNotEmpty } from '../models/custom-validate/isNotEmpty';

export function CustomNotEmpty(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: CustomClassNotEmpty,
    });
  };
}
