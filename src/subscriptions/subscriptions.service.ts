import { Injectable } from '@nestjs/common'
import { CreateSubscriptionDto } from './dto/create-subscription.dto'
import { UpdateSubscriptionDto } from './dto/update-subscription.dto'
import { SpendSubscriptionDto } from './dto/spend-subscription.dto'
import { createSubscription, spendSubscription } from './repositories/POST'
import {
  findSubscriptionById,
  findSubscriptionByOrganization,
  findSubscriptions,
} from './repositories/GET'
import { updateSubscription } from './repositories/PATCH'
import { removeSubscription } from './repositories/DELETE'
import { DeleteSubscriptionDto } from './dto/delete-subscription.dto'

@Injectable()
export class SubscriptionsService {
  create(createSubscriptionDto: CreateSubscriptionDto) {
    return createSubscription(createSubscriptionDto)
  }

  spend(spendSubscriptionDto: SpendSubscriptionDto) {
    return spendSubscription(spendSubscriptionDto)
  }

  findAll() {
    return findSubscriptions()
  }

  findOne(id: string) {
    return findSubscriptionById(id)
  }

  findByOrganization(document: string) {
    return findSubscriptionByOrganization(document)
  }

  update(id: string, updateSubscriptionDto: UpdateSubscriptionDto) {
    return updateSubscription(id, updateSubscriptionDto)
  }

  remove(id: string, deleteSubscriptionDto: DeleteSubscriptionDto) {
    return removeSubscription(id, deleteSubscriptionDto)
  }
}
