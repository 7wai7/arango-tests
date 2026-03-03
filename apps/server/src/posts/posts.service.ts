import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import crypto from "crypto";
import { DocumentCollection } from 'arangojs/collections';
import { NarangoService } from '@ronatilabs/narango';
import { CreatePostDTO, PostDocument } from './dto/posts.dto';
import { TokenUser } from 'src/auth/auth.dto';

@Injectable()
export class PostsService {
  private posts: DocumentCollection<PostDocument>;

  constructor(private narango: NarangoService) {
    this.posts = this.narango.db.collection<PostDocument>("posts");
  }

  async create(user: TokenUser, dto: CreatePostDTO) {
    if (!dto.content && !dto.media) {
      throw new BadRequestException(
        "Post must contain content or media",
      );
    }

    const now = new Date().toISOString();

    const post: PostDocument = {
      _key: crypto.randomUUID(),

      userId: user.id,

      content: dto.content,
      media: dto.media,

      likesCount: 0,
      commentsCount: 0,

      createdAt: now,
      updatedAt: now,
    };

    await this.posts.save(post);

    return this.toResponse(post);
  }

  async feed(
    user: TokenUser,
    {
      limit = 20,
      offset = 0,
    }: {
      limit?: number;
      offset?: number;
    },
  ) {
    const cursor = await this.narango.db.query<PostDocument>(
      `
      FOR p IN posts
        SORT p.createdAt DESC
        LIMIT @offset, @limit

        LET user = DOCUMENT(users, p.userId)

        RETURN {
          post: p,
          user: user
        }
      `,
      { limit, offset },
    );

    const feed = await cursor.all();
    return feed;
  }

  private toResponse(post: PostDocument) {
    return {
      id: post._key,
      userId: post.userId,
      content: post.content,
      media: post.media,
      likesCount: post.likesCount,
      commentsCount: post.commentsCount,
      createdAt: post.createdAt,
    };
  }
}
