import { ApiKeyGuard } from './apikey.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';

describe('ApiKeyGuard', () => {
  let apiKeyGuard: ApiKeyGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    apiKeyGuard = new ApiKeyGuard(reflector);
  });

  it('should return true if API key protection is not enabled', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);

    const context = {
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    expect(apiKeyGuard.canActivate(context)).toBe(true);
  });

  it('should throw UnauthorizedException if API key is missing', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);

    const request = {
      headers: {},
    };

    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    expect(() => apiKeyGuard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if API key is invalid', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);

    const request = {
      headers: {
        'x-api-key': 'invalid-api-key',
      },
    };

    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    process.env.API_KEY = 'valid-api-key';

    expect(() => apiKeyGuard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('should return true if API key is valid', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);

    const request = {
      headers: {
        'x-api-key': 'valid-api-key',
      },
    };

    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    } as unknown as ExecutionContext;

    process.env.API_KEY = 'valid-api-key';

    expect(apiKeyGuard.canActivate(context)).toBe(true);
  });
});