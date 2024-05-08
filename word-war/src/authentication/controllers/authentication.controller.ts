import { Controller, Post, Body, Get, HttpCode } from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) { }

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: { username: string, password: string }) {
    return this.authService.loginService(body.username, body.password);
  }
  @Post('register')
  @HttpCode(200)
  async register(@Body() body: { username: string, password: string }) {
    return this.authService.registerService(body.username, body.password);
  }
}