import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Post()
  create(@Body() createHeroDto: CreateHeroDto) {
    return this.heroesService.create(createHeroDto);
  }

  @Get()
  findAll() {
    return this.heroesService.findAll();
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.heroesService.findOne(name);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateHeroDto: UpdateHeroDto) {
    return this.heroesService.update(name, updateHeroDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.heroesService.remove(name);
  }
}
