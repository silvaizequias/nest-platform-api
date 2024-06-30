import { Injectable } from '@nestjs/common'
import { CreateArticleDto, UpdateArticleDto } from './articles.dto'

@Injectable()
export class ArticlesService {
  create(createArticleDto: CreateArticleDto) {
    return createArticleDto
  }

  findAll() {
    return `This action returns all articles`
  }

  findOne(id: string) {
    return `This action returns a #${id} article`
  }

  findBySlug(slug: string) {
    return `This action returns a #${slug} article`
  }

  update(id: string, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article ${updateArticleDto}`
  }

  remove(id: string) {
    return `This action removes a #${id} article`
  }
}
