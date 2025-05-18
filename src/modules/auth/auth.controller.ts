import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '@/interfaces/auth/dto/login.dto';
import { AppResponse } from '@/core';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Public } from '@/core/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiOkResponse({ description: 'Logged in successfully' })
  async login(@Body() dto: LoginDto) {
    const data = await this.authService.login(dto);
    return AppResponse.success('Logged in successfully.', data);
  }
}
