import { ConflictException, Injectable } from '@nestjs/common';
import { CreateHeroDto } from './dto/create-hero.dto';
import { UpdateHeroDto } from './dto/update-hero.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Hero } from './schemas/hero.schema';
import { Model } from 'mongoose';

@Injectable()
export class HeroesService {

  constructor(@InjectModel(Hero.name) private heroModel: Model<Hero>) { }

  async create(createHeroDto: CreateHeroDto) {

    // Busco si existe
    const existsHero = await this.heroModel.findOne({ name: createHeroDto.name });

    // Si existe, lanzo una excepción
    if (existsHero) {
      throw new ConflictException(`Heroe ${createHeroDto.name} existe`)
    }

    // Creo el heroe
    const createdHero = new this.heroModel(createHeroDto);

    // Guardo el heroe en la base de datos
    return createdHero.save();

  }

  findAll() {
    // Devuelve todos los heroes
    return this.heroModel.find();
  }

  async findOne(name: string) {

    // Busco si existe el heroe
    const existsHero = await this.heroModel.findOne({ name });

    // Sino existe, lanzo una excepcion
    if (!existsHero) {
      throw new ConflictException(`Heroe ${name} no existe`)
    }

    // Devuelvo el heroe
    return this.heroModel.findOne({ name });

  }

  async update(name: string, updateHeroDto: UpdateHeroDto) {

    // Busco si existe el heroe
    const existsHeroOri = await this.heroModel.findOne({ name });

    // Sino existe, lanzo una excepcion
    if (!existsHeroOri) {
      throw new ConflictException(`Heroe ${name} no existe`)
    }

    // Si me añaden el nombre, lo busco
    if (updateHeroDto.name) {

      // Busco si existe el heroe
      const existsHeroNew = await this.heroModel.findOne({ name: updateHeroDto.name });

      // Si existe, lanzo una excepcion
      if (existsHeroNew) {
        throw new ConflictException(`Heroe ${name} existe y no se puede remplazar`)
      }

    }

    // Actualizo el documento
    await this.heroModel.updateOne({ name }, updateHeroDto);

    // Devuelvo el objeto actualizado
    return this.heroModel.findOne({ name: updateHeroDto.name || name });

  }

  async remove(name: string) {

    // Busco si existe el heroe
    const existsHero = await this.heroModel.findOne({ name });

    // Sino existe, lanzo una excepcion
    if (!existsHero) {
      throw new ConflictException(`Heroe ${name} no existe`)
    }

    // Borro el documento
    await this.heroModel.deleteOne({ name });

    // Devuelvo el elemento borrado
    return existsHero;

  }
}
