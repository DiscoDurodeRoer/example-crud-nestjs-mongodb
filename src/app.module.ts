import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configurationMongo } from './configuration/configuration-mongo';
import { HeroesModule } from './modules/heroes/heroes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurationMongo],
      envFilePath: `./env/${process.env.NODE_ENV}.env`,
      isGlobal: true
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get("mongo.MONGO_URI")
      }),
      inject: [ConfigService]
    }),
    HeroesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
