import { Reflector } from "@nestjs/core";
import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from "@nestjs/common";
import { IS_PUBLIC_KEY } from "./public.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    let request = context.switchToHttp().getRequest();
    const b64TokenData = request.cookies.tokendata

    if (!b64TokenData) {
      throw new UnauthorizedException("Missing auth");
    }

    const rawTokenData = Buffer.from(b64TokenData, "base64").toString();
    let tokenData;

    try {
      tokenData = JSON.parse(rawTokenData);
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException("Malformed auth");
    }

    request.tokenAuthData = tokenData;
    return true;
  }
}
