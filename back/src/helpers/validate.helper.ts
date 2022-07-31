import { HttpException } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';

import { bad_request } from '../errors';

export function validateDTO(type: ClassConstructor<unknown>, value: unknown, skip_missing_properties = true) {
  const errors: ValidationError[] = validateSync(plainToClass(type, value) as object, { skipMissingProperties: skip_missing_properties });

  if (errors.length > 0) {
    throw new HttpException({
      error: 'Bad request',
      statusCode: 400,
      message: errors.map((error) => Object.values(error.constraints)),
    }, 400)
  }
}
