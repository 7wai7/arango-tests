import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostSchema } from './dto/create-post.schema';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import type { CreatePostDTO } from './dto/posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  @Post()
  @UsePipes(new ZodValidationPipe(CreatePostSchema))
  create(@Body() dto: CreatePostDTO) {
    return this.postsService.create({ id: "1b480cab-e192-4067-ac35-a87e5ba28aaf" }, dto);
  }
}
