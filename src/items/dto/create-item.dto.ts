import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty({ description: 'The name of the item' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The description of the item' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The price of the item' })
  @IsNumber()
  price: number;
}