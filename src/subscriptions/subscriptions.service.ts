import { Injectable } from '@nestjs/common'
import {
  CreateSubscriptionValidator,
  RemoveSubscriptionValidator,
  UpdateSubscriptionValidator,
} from './subscription.validator'
import { createSubscriptionRepository } from 'src/repositories/subscriptions/create-subscription.repository'
import {
  findByOrganizationSubscriptionRepository,
  findManySubscriptionRepository,
  findOneSubscriptionRepository,
} from 'src/repositories/subscriptions/find-subscription.repository'
import { updateSubscriptionRepository } from 'src/repositories/subscriptions/update-subscription.repository'
import { removeSubscriptionRepository } from 'src/repositories/subscriptions/remove-subscription.repository'

@Injectable()
export class SubscriptionsService {
  async create(createSubscriptionValidator: CreateSubscriptionValidator) {
    return await createSubscriptionRepository(createSubscriptionValidator)
  }

  async findByOrganization(organizationId: string) {
    return await findByOrganizationSubscriptionRepository(organizationId)
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
