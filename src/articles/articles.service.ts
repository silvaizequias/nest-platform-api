import { HttpException, Injectable } from '@nestjs/common'
import { CreateArticleDto, UpdateArticleDto } from './articles.dto'
import { ArticleEntity } from './article.entity'

@Injectable()
export class ArticlesService {
  async create(createArticleDto: CreateArticleDto) {
    try {
      return createArticleDto
    } catch (error) {
      throw new HttpException(error, error.status)
    } finally {
    }
  }

  async findAll(): Promise<ArticleEntity[] | any> {
    try {
      return []
    } catch (error) {
      throw new HttpException(error, error.status)
    } finally {
    }
  }

  async findOne(id: string): Promise<ArticleEntity | any> {
    try {
      return `This action returns a #${id} article`
    } catch (error) {
      throw new HttpException(error, error.status)
    } finally {
    }
  }

  async findBySlug(slug: string): Promise<ArticleEntity | any> {
    try {
      return `This action returns a #${slug} article`
    } catch (error) {
      throw new HttpException(error, error.status)
    } finally {
    }
  }

  async update(id: string, updateArticleDto: UpdateArticleDto) {
    try {
      return `This action updates a #${id} article ${updateArticleDto}`
    } catch (error) {
      throw new HttpException(error, error.status)
    } finally {
    }
  }

  async remove(id: string) {
    try {
      return `This action removes a #${id} article`
    } catch (error) {
      throw new HttpException(error, error.status)
    } finally {
    }
  }
}
