import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, UseGuards, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostSchema } from './dto/create-post.schema';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import type { CreatePostDTO } from './dto/posts.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ZodValidationPipe(CreatePostSchema))
  create(@Req() req, @Body() dto: CreatePostDTO) {
    return this.postsService.create(req.tokenAuthData, dto);
  }
}
