import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entity/item.entity';
import { ApiTags, ApiSecurity, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ApiKey } from './../decorators/apikey.decorator';


@ApiSecurity('api-key')
@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @ApiKey()
  @Get()
  @ApiOperation({ summary: 'Get all items' })
  @ApiResponse({ status: 200, description: 'Return all items.' })
  findAll(): Promise<Item[]> {
    return this.itemsService.findAll();
  }
  @ApiKey()
  @Get(':id')
  @ApiOperation({ summary: 'Get item by id' })
  @ApiParam({ name: 'id', description: 'The ID of the item' })
  @ApiResponse({ status: 200, description: 'Return the item.' })
  @ApiResponse({ status: 404, description: 'Item not found.' })
  findOne(@Param('id') id: number): Promise<Item> {
    return this.itemsService.findOne(id);
  }
  @ApiKey()
  @Post()
  @ApiOperation({ summary: 'Create a new item' })
  @ApiBody({ type: CreateItemDto })
  @ApiResponse({ status: 201, description: 'The item has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  create(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.create(createItemDto);
  }
  @ApiKey()
  @Put(':id')
  @ApiOperation({ summary: 'Update an existing item' })
  @ApiParam({ name: 'id', description: 'The ID of the item' })
  @ApiBody({ type: UpdateItemDto })
  @ApiResponse({ status: 200, description: 'The item has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Item not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  update(@Param('id') id: number, @Body() updateItemDto: UpdateItemDto): Promise<Item> {
    return this.itemsService.update(id, updateItemDto);
  }
  @ApiKey()
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an item' })
  @ApiParam({ name: 'id', description: 'The ID of the item' })
  @ApiResponse({ status: 200, description: 'The item has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Item not found.' })
  delete(@Param('id') id: number): Promise<void> {
    return this.itemsService.delete(id);
  }
}
