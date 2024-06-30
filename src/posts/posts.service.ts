import { Injectable } from '@nestjs/common'
import { CreatePostDto, UpdatePostDto } from './posts.dto'

@Injectable()
export class PostsService {
  create(createPostDto: CreatePostDto) {
    return createPostDto
  }

  findAll() {
    return `This action returns all posts`
  }

  findOne(id: string) {
    return `This action returns a #${id} post`
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post ${updatePostDto}`
  }

  remove(id: string) {
    return `This action removes a #${id} post`
  }
}
