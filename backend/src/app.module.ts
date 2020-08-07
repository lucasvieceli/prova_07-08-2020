import { UploadModule } from './modules/upload/upload.module';
import { ProductModule } from './modules/product/product.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configs } from "./config/config";
import { AuthModule } from './modules/auth/auth.module';
import { PeopleModule } from './modules/people/people.module';
@Module({
  imports: [
    UploadModule,
    ProductModule,
    PeopleModule,
    ProductModule,
    AuthModule,
    TypeOrmModule.forRoot(configs.database),
  ],
  controllers: [
  ],
  providers: [
  ],
  exports: []
})
export class AppModule { }
