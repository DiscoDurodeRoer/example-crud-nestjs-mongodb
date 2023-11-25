import { Test, TestingModule } from '@nestjs/testing';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';

describe('HeroesController', () => {
  let controller: HeroesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroesController],
      providers: [HeroesService],
    }).compile();

    controller = module.get<HeroesController>(HeroesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
