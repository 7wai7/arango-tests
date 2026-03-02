import {
    PipeTransform,
    Injectable,
    BadRequestException,
} from "@nestjs/common";
import * as z from "zod";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: z.ZodType) { }

    transform(value: unknown) {
        try {
            // parse = validate + return typed data
            return this.schema.parse(value);
        } catch (err) {
            console.error(err)
            if (err instanceof z.ZodError) {
                throw new BadRequestException({
                    message: "Validation failed",
                    errors: err.issues.map(e => ({
                        path: e.path.join("."),
                        message: e.message,
                    })),
                });
            }

            throw err;
        }
    }
}