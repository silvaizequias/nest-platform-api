import { HttpException, Injectable } from '@nestjs/common'
import {
  CreateOrganizationValidator,
  RemoveOrganizationValidator,
  UpdateOrganizationValidator,
} from './organization.validator'
import {
  createOrganizationForUserRepository,
  createOrganizationRepository,
} from 'src/repositories/organizations/create-organization.repository'
import {
  findByDocumentOrganizationRepository,
  findManyOrganizationRepository,
  findOneOrganizationRepository,
} from 'src/repositories/organizations/find-organization.repository'
import { updateOrganizationRepository } from 'src/repositories/organizations/update-organization.repository'
import { removeOrganizationRepository } from 'src/repositories/organizations/remove-organization.repository'
import { AwesomeApiAddress } from 'src/location/location.interface'
import { StripeService } from 'src/stripe/stripe.service'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class OrganizationsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly stripeService: StripeService,
  ) {}

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

  async create(createOrganizationValidator: CreateOrganizationValidator) {
    const { document, zipCode } = createOrganizationValidator
    try {
      if (zipCode) {
        return await this.addressByZipCode(zipCode).then(
          async (location: AwesomeApiAddress) => {
            if (!location)
              return await createOrganizationRepository(
                createOrganizationValidator,
              ).then(
                async () => await this.stripeService.createCustomer(document),
              )

            return await createOrganizationRepository({
              ...createOrganizationValidator,
              street: location?.address,
              district: location?.district,
              city: location?.city,
              state: location?.state,
              latitude: Number(location?.lat),
              longitude: Number(location?.lng),
            }).then(
              async () => await this.stripeService.createCustomer(document),
            )
          },
        )
      } else {
        return await createOrganizationRepository(
          createOrganizationValidator,
        ).then(async () => await this.stripeService.createCustomer(document))
      }
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }

  async createForUser(
    userId: string,
    createOrganizationValidator: CreateOrganizationValidator,
  ) {
    const { document, zipCode } = createOrganizationValidator
    try {
      if (zipCode) {
        return await this.addressByZipCode(zipCode).then(
          async (location: AwesomeApiAddress) => {
            if (!location)
              return await createOrganizationForUserRepository(
                userId,
                createOrganizationValidator,
              ).then(
                async () => await this.stripeService.createCustomer(document),
              )

            return await createOrganizationForUserRepository(userId, {
              ...createOrganizationValidator,
              street: location?.address,
              district: location?.district,
              city: location?.city,
              state: location?.state,
              latitude: Number(location?.lat),
              longitude: Number(location?.lng),
            }).then(
              async () => await this.stripeService.createCustomer(document),
            )
          },
        )
      } else {
        return await createOrganizationForUserRepository(
          userId,
          createOrganizationValidator,
        ).then(async () => await this.stripeService.createCustomer(document))
      }
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }

  async findByDocument(document: string) {
    return await findByDocumentOrganizationRepository(document)
  }

  async findMany() {
    return await findManyOrganizationRepository()
  }

  async findOne(id: string) {
    return await findOneOrganizationRepository(id)
  }

  async update(
    id: string,
    updateOrganizationValidator: UpdateOrganizationValidator,
  ) {
    const { zipCode } = updateOrganizationValidator
    try {
      if (zipCode) {
        return await this.addressByZipCode(zipCode).then(async (location) => {
          if (!location)
            return await updateOrganizationRepository(
              id,
              updateOrganizationValidator,
            )

          return await updateOrganizationRepository(id, {
            ...updateOrganizationValidator,
            street: location?.address,
            district: location?.district,
            city: location?.city,
            state: location?.state,
            latitude: Number(location?.lat),
            longitude: Number(location?.lng),
          })
        })
      } else {
        return await updateOrganizationRepository(
          id,
          updateOrganizationValidator,
        )
      }
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }

  async remove(
    id: string,
    removeOrganizationValidator: RemoveOrganizationValidator,
  ) {
    return await removeOrganizationRepository(id, removeOrganizationValidator)
  }
}
