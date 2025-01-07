import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorDto } from './create-author.dto';
import { IsInt, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
  @Min(0)
  @Max(100)
  @IsInt()
  @ApiProperty({ example: 42, description: 'The new age of the author' })
  age: number;
}
