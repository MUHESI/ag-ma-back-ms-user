import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbilityModule } from './casl/casl.module';

const modules = [
  UserModule,
];


@Module({
  imports: [
    ...modules,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      username: 'root',
      password: 'root12345',
      database: 'ag_marketingDb',
      synchronize: true,
      autoLoadEntities: true,
    }),
    AbilityModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
