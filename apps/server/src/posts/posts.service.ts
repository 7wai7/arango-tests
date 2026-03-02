import { BadRequestException, Injectable } from '@nestjs/common';
import crypto from "crypto";
import { DocumentCollection } from 'arangojs/collections';
import { NarangoService } from '@ronatilabs/narango';
import { CreatePostDTO, PostDocument } from './dto/posts.dto';

@Injectable()
export class PostsService {
  private posts: DocumentCollection<PostDocument>;

  constructor(private narango: NarangoService) {
    this.posts = this.narango.db.collection<PostDocument>("posts");
  }

  async create(user: { id: string }, dto: CreatePostDTO) {
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
