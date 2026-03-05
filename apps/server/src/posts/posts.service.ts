import { BadRequestException, Injectable } from '@nestjs/common';
import { NarangoService } from '@ronatilabs/narango';
import { DocumentCollection } from 'arangojs/collections';
import crypto from "crypto";
import { TokenUser } from 'src/auth/auth.dto';
import { CreatePostDTO, PostDocument } from './dto/posts.dto';

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

    const trx = await this.narango.db.beginTransaction({
      read: ["users"],
      write: ["posts", "post_authors"],
    });

    try {
      const now = new Date().toISOString();

      const post: PostDocument = {
        _key: crypto.randomUUID(),
        content: dto.content,
        media: dto.media,
        likesCount: 0,
        commentsCount: 0,
        createdAt: now,
        updatedAt: now,
      };

      const userExists = await trx.step(() =>
        this.narango.db
          .collection("users")
          .documentExists(user.id)
      );

      if (!userExists) {
        throw new BadRequestException("User not found");
      }

      await trx.step(() =>
        this.posts.save(post)
      );

      await trx.step(() =>
        this.narango.db.collection("post_authors").save({
          _from: `users/${user.id}`,
          _to: `posts/${post._key}`,
        })
      );

      await trx.commit();

      return this.toResponse(post);
    } catch (e) {
      await trx.abort();
      throw e;
    }
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
      content: post.content,
      media: post.media,
      likesCount: post.likesCount,
      commentsCount: post.commentsCount,
      createdAt: post.createdAt,
    };
  }
}
