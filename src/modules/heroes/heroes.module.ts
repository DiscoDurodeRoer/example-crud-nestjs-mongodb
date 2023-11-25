import { Module } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { HeroesController } from './heroes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hero, heroSchema } from './schemas/hero.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Hero.name, schema: heroSchema }
  ])],
  controllers: [HeroesController],
  providers: [HeroesService],
})
export class HeroesModule {}
