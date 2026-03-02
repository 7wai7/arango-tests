import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostSchema } from './dto/create-post.schema';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import type { CreatePostDTO } from './dto/posts.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type { TokenUser } from 'src/auth/auth.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @UsePipes(new ZodValidationPipe(CreatePostSchema))
  create(@CurrentUser() user: TokenUser, @Body() dto: CreatePostDTO) {
    return this.postsService.create(user, dto);
  }
}
