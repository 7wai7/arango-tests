import {
    Injectable,
    ConflictException,
    UnauthorizedException,
} from "@nestjs/common";
import { NarangoService } from "@ronatilabs/narango";
import * as bcrypt from "bcrypt";
import { DocumentCollection } from "arangojs/collections";
import crypto from "crypto";

import { LoginDTO, RegisterDTO } from "./auth.schemas";
import { UserDocument, UserProfile } from "../types";

@Injectable()
export class AuthService {
    private users: DocumentCollection<UserDocument>;

    constructor(private narango: NarangoService) {
        this.users = this.narango.db.collection<UserDocument>("users");
    }

    // ---------- REGISTER ----------
    async register(dto: RegisterDTO): Promise<UserProfile> {
        // check existing user
        const cursor = await this.narango.db.query<UserDocument>(
            `
            FOR u IN users
                FILTER u.username == @username || u.email == @email
                LIMIT 1
                RETURN u
            `,
            { username: dto.username, email: dto.email },
        );

        const existing = await cursor.next();

        if (existing) {
            throw new ConflictException("User already registered");
        }

        const passwordHash = await bcrypt.hash(dto.password, 10);
        const now = new Date().toISOString();

        const user: UserDocument = {
            _key: crypto.randomUUID(),
            username: dto.username,
            email: dto.email,
            passwordHash,
            about: "",
            lastOnlineDate: now,
            avatarUrl: dto.avatarUrl ?? "",
            createdAt: now,
        };

        await this.users.save(user);

        return this.toUserProfile(user);
    }

    // ---------- LOGIN ----------
    async login(dto: LoginDTO): Promise<UserProfile> {
        const cursor = await this.narango.db.query<UserDocument>(
            `
            FOR u IN users
                FILTER u.username == @username
                LIMIT 1
                RETURN u
            `,
            { username: dto.username },
        );

        const user = await cursor.next();

        if (!user) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const valid = await bcrypt.compare(dto.password, user.passwordHash);

        if (!valid) {
            throw new UnauthorizedException("Invalid credentials");
        }

        const now = new Date().toISOString();

        // update online status
        await this.users.update(user._key, {
            lastOnlineDate: now,
        });

        return this.toUserProfile({
            ...user,
            lastOnlineDate: now,
        });
    }

    // ---------- MAPPER ----------
    private toUserProfile(user: UserDocument): UserProfile {
        return {
            id: user._key,
            username: user.username,
            email: user.email,
            about: user.about,
            lastOnlineDate: user.lastOnlineDate,
            avatarUrl: user.avatarUrl,
        };
    }
}