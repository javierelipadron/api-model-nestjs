import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entity/item.entity';
import { itemsMocks } from './../shared/mocks/items';

describe('ItemsController', () => {
  let controller: ItemsController;
  let service: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        {
          provide: ItemsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(itemsMocks),
            findOne: jest.fn().mockResolvedValue(itemsMocks[0]),
            create: jest.fn().mockResolvedValue(itemsMocks[0]),
            update: jest.fn().mockResolvedValue(itemsMocks[0]),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
    service = module.get<ItemsService>(ItemsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of items', async () => {
      expect(await controller.findAll()).toBe(itemsMocks);
    });
  });

  describe('findOne', () => {
    it('should return a single item', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(itemsMocks[0]);
      expect(await controller.findOne(itemsMocks[0].id)).toBe(itemsMocks[0]);
    });
  });

  describe('create', () => {
    it('should create a new item', async () => {
      const createItemDto: CreateItemDto = {
        name: 'Test Item',
        description: 'Test Description',
        price: 100,
      };
      const result: Item = { ...createItemDto, id: 1 };
      jest.spyOn(service, 'create').mockResolvedValue(result);
      expect(await controller.create(createItemDto)).toBe(result);
    });
  });

  describe('update', () => {
    it('should update an existing item', async () => {

      const updateItemDto: UpdateItemDto = {
        name: 'Updated Item',
        description: 'Updated Description',
        price: 200,
      };

      const result: Item = {
        id: 1,
        name: updateItemDto.name,
        description: updateItemDto.description,
        price: updateItemDto.price,
      };
      
      jest.spyOn(service, 'update').mockResolvedValue(result);
      expect(await controller.update(1, updateItemDto)).toBe(result);
    });
  });

  describe('delete', () => {
    it('should delete an item', async () => {
      jest.spyOn(service, 'delete').mockResolvedValue(undefined);
      expect(await controller.delete(1)).toBeUndefined();
    });
  });
});
