import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @ApiProperty({ description: 'The name of the item', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'The description of the item', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'The price of the item', required: false })
  @IsOptional()
  @IsNumber()
  price?: number;
}