import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from "class-validator"

@ValidatorConstraint({ async: false })
export class IsStartDateBeforeEndDateConstraint
  implements ValidatorConstraintInterface
{
  validate(startDate: any, args: ValidationArguments) {
    return startDate <= args.object[args.constraints[0]]
  }

  defaultMessage(args: ValidationArguments) {
    return "Start date must be less than or equal to end date"
  }
}
