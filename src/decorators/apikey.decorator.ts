import { SetMetadata } from '@nestjs/common';

export const API_KEY = 'apiKey';
export const ApiKey = () => SetMetadata(API_KEY, true);