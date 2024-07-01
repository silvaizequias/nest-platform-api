import { HttpException, Injectable } from '@nestjs/common'
import { CreateUserDto, UpdateUserDto } from './users.dto'

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    const {} = createUserDto
    try {
      return createUserDto
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

  update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return { id, updateUserDto }
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
