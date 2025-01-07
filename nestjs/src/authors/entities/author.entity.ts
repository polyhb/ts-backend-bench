import { ApiProperty } from '@nestjs/swagger';

export class Author {
  @ApiProperty({ example: 1, description: 'Unique identifier of the author' })
  id: number;

  @ApiProperty({ example: 'John Doe', description: 'Name of the author' })
  name: string;

  @ApiProperty({ example: 42, description: 'Age of the author' })
  age: number;
}
