import { Injectable } from '@nestjs/common'
import {
  CreateUserValidator,
  RemoveUserValidator,
  UpdateUserValidator,
} from './user.validator'
import { createUserRepository } from 'src/repositories/users/create-user.repository'
import {
  findManyUserRepository,
  findOneUserRepository,
} from 'src/repositories/users/find-user.repository'
import { updateUserRepository } from 'src/repositories/users/update-user.repository'
import { removeUserRepository } from 'src/repositories/users/remove-user.repository'
import { AwesomeApiAddress } from 'src/location/location.interface'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class UsersService {
  constructor(private readonly configService: ConfigService) {}

  private url = this.configService.getOrThrow('ZIPCODE_API_URL')
  private async addressByZipCode(
    zipCode: string,
  ): Promise<AwesomeApiAddress | any> {
    return await fetch(`${this.url}/${zipCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (data) => await data.json())
      .catch((error) => error)
  }

  async create(createUserValidator: CreateUserValidator) {
    const { zipCode } = createUserValidator
    if (zipCode) {
      return await this.addressByZipCode(zipCode).then(
        async (location: AwesomeApiAddress) => {
          if (!location) return await createUserRepository(createUserValidator)

          return await createUserRepository({
            ...createUserValidator,
            street: location?.address,
            district: location?.district,
            city: location?.city,
            state: location?.state,
            latitude: Number(location?.lat),
            longitude: Number(location?.lng),
          })
        },
      )
    } else {
      return await createUserRepository(createUserValidator)
    }
  }

  async findMany() {
    return await findManyUserRepository()
  }

  async findOne(id: string) {
    return await findOneUserRepository(id)
  }

  async update(id: string, updateUserValidator: UpdateUserValidator) {
    const { zipCode } = updateUserValidator
    if (zipCode) {
      return await this.addressByZipCode(zipCode).then(async (location) => {
        if (!location)
          return await updateUserRepository(id, updateUserValidator)

        return await updateUserRepository(id, {
          ...updateUserValidator,
          street: location?.address,
          district: location?.district,
          city: location?.city,
          state: location?.state,
          latitude: Number(location?.lat),
          longitude: Number(location?.lng),
        })
      })
    } else {
      return await updateUserRepository(id, updateUserValidator)
    }
  }

  async remove(id: string, removeUserValidator: RemoveUserValidator) {
    return await removeUserRepository(id, removeUserValidator)
  }
}
