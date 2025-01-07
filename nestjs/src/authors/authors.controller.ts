import { Controller, Body, Param, Put } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Author } from './entities/author.entity';
import { CurrentUser, User } from 'src/user/user.decorator';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Put(':id')
  @ApiOperation({
    summary: 'Update author',
    description: 'Update author by id',
  })
  @ApiResponse({
    status: 200,
    description: 'The author has been successfully updated.',
    type: Author,
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the author to update',
    example: 12,
  })
  update(
    @CurrentUser() user: User,
    @Param('id')
    id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ) {
    return {
      id: id,
      age: updateAuthorDto.age,
      name: user.name,
    };
  }
}
