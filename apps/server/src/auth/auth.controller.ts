import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { LoginSchema, RegisterSchema } from './auth.schemas';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/register')
  @UsePipes(new ZodValidationPipe(RegisterSchema))
  register(@Body() dto: any) {
    return this.authService.register(dto);
  }

  @Post('/login')
  @UsePipes(new ZodValidationPipe(LoginSchema))
  login(@Body() dto: any) {
    return this.authService.login(dto);
  }
}
