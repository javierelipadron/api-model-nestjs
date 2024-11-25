import { Injectable, NotFoundException } from '@nestjs/common';
import { Item } from './entity/item.entity';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
  private items: Item[] = [];

  findAll(): Promise<Item[]> {
    return Promise.resolve(this.items);
  }

  async findOne(id: number): Promise<Item> {
    const item = this.items.find(item => item.id === Number(id));
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const newItem: Item = {
      id: this.items.length + 1,
      ...createItemDto,
    };
    this.items.push(newItem);
    return newItem;
  }

  async update(id: number, updateItemDto: UpdateItemDto): Promise<Item> {
    const itemIndex = this.items.findIndex(item => item.id  === Number(id));

    if (itemIndex === -1) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    const updatedItem = { ...this.items[itemIndex], ...updateItemDto };
    this.items[itemIndex] = updatedItem;
    return updatedItem;
  }

  async delete(id: number): Promise<void> {
    const itemIndex = this.items.findIndex(item => item.id  === Number(id));
    if (itemIndex === -1) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    this.items.splice(itemIndex, 1);
  }
}
