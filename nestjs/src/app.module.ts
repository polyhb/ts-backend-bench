import { Module } from '@nestjs/common';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [AuthorsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
