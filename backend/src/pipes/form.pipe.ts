import { BadRequestException, Injectable, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { AdvancedConsoleLogger } from 'typeorm';

export class FormPipe extends ValidationPipe {
  
  constructor(){
    super({
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException({
          status: 422,
          message: errors.map(erro => getError(erro))
        })
      }
    })
  }
}

const getError = (error) => {
  return {
    property    : error.property,
    constraints : error.constraints,
    children    : error.children.map(e => getError(e))
  };
}
