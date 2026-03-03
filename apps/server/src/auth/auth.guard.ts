import { Reflector } from "@nestjs/core";
import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from "@nestjs/common";
import { IS_PUBLIC_KEY } from "./decorators/public.decorator";
import { TokenUser } from "./auth.dto";

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
    const cookie = request.cookies?.tokendata;

    if (!cookie) {
      throw new UnauthorizedException("Missing auth cookie");
    }

    try {
      const raw = Buffer.from(cookie, "base64").toString();
      const user: TokenUser = JSON.parse(raw);
      request.user = user;
      return true;
    } catch {
      throw new UnauthorizedException("Invalid auth token");
    }
  }
}
