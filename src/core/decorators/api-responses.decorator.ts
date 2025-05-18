import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const ApiAuthResponses = () =>
  applyDecorators(
    ApiResponse({
      status: 401,
      description: 'Unauthorized - Invalid or missing token',
    }),
    ApiResponse({
      status: 403,
      description: 'Forbidden - Requires admin role',
    }),
  );

export const ApiCommonResponses = (successStatus = 200, description: string) =>
  applyDecorators(
    ApiResponse({
      status: successStatus,
      description,
    }),
    ApiResponse({
      status: 404,
      description: 'Resource not found',
    }),
  );

export const ApiAdminResponses = (successStatus = 200, description: string) =>
  applyDecorators(
    ApiResponse({
      status: successStatus,
      description,
    }),
    ApiAuthResponses(),
    ApiResponse({
      status: 404,
      description: 'Resource not found',
    }),
  );
