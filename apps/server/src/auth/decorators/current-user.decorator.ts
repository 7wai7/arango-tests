import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { TokenUser } from "../auth.dto";

export const CurrentUser = createParamDecorator(
    (_: unknown, ctx: ExecutionContext): TokenUser => {
        const request = ctx.switchToHttp().getRequest();

        return request.tokenAuthData;
    },
);