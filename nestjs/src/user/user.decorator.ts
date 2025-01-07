import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  age: number;
};

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    // Request not typed here
    const request = context.switchToHttp().getRequest();

    return {
      id: 12,
      name: 'john doe',
      age: 42,
    };
  },
);
