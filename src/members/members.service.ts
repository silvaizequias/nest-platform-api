import { HttpException, Injectable } from '@nestjs/common'
import { CreateMemberDto, UpdateMemberDto } from './members.dto'

@Injectable()
export class MembersService {
  create(createMemberDto: CreateMemberDto) {
    try {
      return createMemberDto
    } catch (error) {
      throw new HttpException(error, error.status)
    } finally {
    }
  }

  findAll() {
    try {
      return []
    } catch (error) {
      throw new HttpException(error, error.status)
    } finally {
    }
  }

  findOne(id: string) {
    try {
      return id
    } catch (error) {
      throw new HttpException(error, error.status)
    } finally {
    }
  }

  update(id: string, updateMemberDto: UpdateMemberDto) {
    try {
      return { id, updateMemberDto }
    } catch (error) {
      throw new HttpException(error, error.status)
    } finally {
    }
  }

  remove(id: string) {
    try {
      return id
    } catch (error) {
      throw new HttpException(error, error.status)
    } finally {
    }
  }
}
