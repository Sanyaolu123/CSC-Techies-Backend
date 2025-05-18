import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { isValid, parse } from 'date-fns';

@ValidatorConstraint({ async: false })
export class IsDateFormatConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [format] = args.constraints; // Get the format passed to the decorator

    if (typeof value !== 'string') {
      // Optionally add @IsString() alongside this decorator
      // or handle non-string types here if needed.
      return false;
    }

    // Attempt to parse the string using the specified format
    const date = parse(value, format, new Date()); // new Date() provides a base date for partial formats
    return isValid(date);
  }

  defaultMessage(args: ValidationArguments) {
    const [format] = args.constraints;
    return `Date string "${args.value}" must be in the format "${format}"`;
  }
}

/**
 * Custom decorator to validate if a string is a valid date in a specific format.
 * Requires date-fns.
 *
 * @param format - The expected date format string (e.g., 'yyyy/MM/dd', 'dd-MM-yyyy'). Uses date-fns formats.
 * @param validationOptions - Standard class-validator validation options.
 */
export function IsDateFormat(
  format: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isDateFormat',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [format], // Pass the format as a constraint
      options: validationOptions,
      validator: IsDateFormatConstraint,
    });
  };
}
