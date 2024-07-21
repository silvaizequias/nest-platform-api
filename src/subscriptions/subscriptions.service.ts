import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common'
import {
  CreateSubscriptionValidator,
  RemoveSubscriptionValidator,
  UpdateSubscriptionValidator,
} from './subscription.validator'
import { createSubscriptionRepository } from 'src/repositories/subscriptions/create-subscription.repository'
import {
  findByCodeSubscriptionRepository,
  findByOrganizationSubscriptionRepository,
  findManySubscriptionRepository,
  findOneSubscriptionRepository,
} from 'src/repositories/subscriptions/find-subscription.repository'
import { updateSubscriptionRepository } from 'src/repositories/subscriptions/update-subscription.repository'
import { removeSubscriptionRepository } from 'src/repositories/subscriptions/remove-subscription.repository'
import { OrganizationsService } from 'src/organizations/organizations.service'
import { StripeService } from 'src/stripe/stripe.service'

@Injectable()
export class SubscriptionsService {
  constructor(
    @Inject(forwardRef(() => OrganizationsService))
    private readonly organizationsService: OrganizationsService,
    @Inject(forwardRef(() => StripeService))
    private readonly stripeService: StripeService,
  ) {}

  async create(createSubscriptionValidator: CreateSubscriptionValidator) {
    const { organizationId } = createSubscriptionValidator
    try {
      return await this.organizationsService
        .findOne(organizationId)
        .then(async () => {
          return await this.stripeService
            .createCustomer(organizationId)
            .then(async (data: any) => {
              return await createSubscriptionRepository({
                ...createSubscriptionValidator,
                paymentCustomerId: data?.id,
              })
            })
        })
    } catch (error) {
      throw new HttpException(error, error.status)
    }
  }

  async findByCode(code: string) {
    return await findByCodeSubscriptionRepository(code)
  }

  async findByOrganization(document: string) {
    return await findByOrganizationSubscriptionRepository(document)
  }

  async findMany() {
    return await findManySubscriptionRepository()
  }

  async findOne(id: string) {
    return await findOneSubscriptionRepository(id)
  }

  async update(
    id: string,
    updateSubscriptionValidator: UpdateSubscriptionValidator,
  ) {
    return await updateSubscriptionRepository(id, updateSubscriptionValidator)
  }

  async remove(
    id: string,
    removeSubscriptionValidator: RemoveSubscriptionValidator,
  ) {
    return await removeSubscriptionRepository(id, removeSubscriptionValidator)
  }
}
