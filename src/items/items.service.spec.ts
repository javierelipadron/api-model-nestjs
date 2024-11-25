import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

describe('ItemsService', () => {
  let service: ItemsService;

  describe('ItemsService', () => {
    let service: ItemsService;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [ItemsService],
      }).compile();

      service = module.get<ItemsService>(ItemsService);
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });

    it('should create an item', async () => {
      const createItemDto: CreateItemDto = { name: 'Test Item', description: 'Test Description', price: 1.99 };
      const item = await service.create(createItemDto);
      expect(item).toEqual({ id: 1, ...createItemDto });
    });

    it('should find all items', async () => {
      const createItemDto: CreateItemDto = { name: 'Test Item', description: 'Test Description', price: 1.99 };
      await service.create(createItemDto);
      const items = await service.findAll();
      expect(items).toEqual([{ id: 1, ...createItemDto }]);
    });

    it('should find one item by id', async () => {
      const createItemDto: CreateItemDto = { name: 'Test Item', description: 'Test Description', price: 1.99 };
      await service.create(createItemDto);
      const item = await service.findOne(1);
      expect(item).toEqual({ id: 1, ...createItemDto });
    });

    it('should throw NotFoundException if item not found', async () => {
      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });

    it('should update an item', async () => {
      const createItemDto: CreateItemDto = { name: 'Test Item', description: 'Test Description', price: 1.99 };
      await service.create(createItemDto);
      const updateItemDto: UpdateItemDto = { name: 'Updated Item', description: 'Updated Description',price: 3.99  };
      const updatedItem = await service.update(1, updateItemDto);
      expect(updatedItem).toEqual({ id: 1, ...updateItemDto });
    });

    it('should throw NotFoundException if updating non-existing item', async () => {
      const updateItemDto: UpdateItemDto = { name: 'Updated Item', description: 'Updated Description' };
      await expect(service.update(999, updateItemDto)).rejects.toThrow(NotFoundException);
    });

    it('should delete an item', async () => {
      const createItemDto: CreateItemDto = { name: 'Test Item', description: 'Test Description', price: 1.99 };
      await service.create(createItemDto);
      await service.delete(1);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if deleting non-existing item', async () => {
      await expect(service.delete(999)).rejects.toThrow(NotFoundException);
    });
  });
});
