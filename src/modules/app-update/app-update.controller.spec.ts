import { Test, TestingModule } from '@nestjs/testing';
import { AppUpdateController } from './app-update.controller';

describe('AppUpdateController', () => {
  let controller: AppUpdateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppUpdateController],
    }).compile();

    controller = module.get<AppUpdateController>(AppUpdateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
