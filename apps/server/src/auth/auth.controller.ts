import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { LoginSchema, RegisterSchema } from './auth.schemas';
import { encodeTokenData } from './auth.utils';
import { Public } from './decorators/public.decorator';

@Controller("auth")
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("/register")
  @UsePipes(new ZodValidationPipe(RegisterSchema))
  async register(
    @Body() dto: any,
    @Res({ passthrough: true }) res: any,
  ) {
    const user = await this.authService.register(dto);
    const token = encodeTokenData(user);

    res.cookie("tokendata", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    return user;
  }

  @Post("/login")
  @UsePipes(new ZodValidationPipe(LoginSchema))
  async login(
    @Body() dto: any,
    @Res({ passthrough: true }) res: any,
  ) {
    const user = await this.authService.login(dto);
    const token = encodeTokenData(user);

    res.cookie("tokendata", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return user;
  }
}