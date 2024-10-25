import { Test, TestingModule } from '@nestjs/testing';
import { EaseUpBatchController } from './ease-up-batch.controller';
import { EaseUpBatchService } from './ease-up-batch.service';

describe('EaseUpBatchController', () => {
  let easeUpBatchController: EaseUpBatchController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [EaseUpBatchController],
      providers: [EaseUpBatchService],
    }).compile();

    easeUpBatchController = app.get<EaseUpBatchController>(EaseUpBatchController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(easeUpBatchController.getHello()).toBe('Hello World!');
    });
  });
});
