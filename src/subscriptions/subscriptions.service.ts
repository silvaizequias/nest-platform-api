import { Injectable } from '@nestjs/common'
import { CreateSubscriptionDto } from './dto/create-subscription.dto'
import { UpdateSubscriptionDto } from './dto/update-subscription.dto'
import { updateSubscriptionRepository } from './repositories/update-subscription.repository'
import { deleteSubscriptionRepository } from './repositories/delete-subscription.repository'
import { readSubscriptionRepository } from './repositories/read-subscription.repository'
import { createSubscriptionRepository } from './repositories/create-subscription.repository'
import { readSubscriptionByCodeRepository } from './repositories/read-subscription-by-code.repository'

@Injectable()
export class SubscriptionsService {
  create(createSubscriptionDto: CreateSubscriptionDto) {
    return createSubscriptionRepository(createSubscriptionDto)
  }

  findAll() {
    return readSubscriptionRepository()
  }

  findByCode(code: string) {
    return readSubscriptionByCodeRepository(code)
  }

  findOne(id: string) {
    return readSubscriptionRepository(id)
  }

  update(id: string, updateSubscriptionDto: UpdateSubscriptionDto) {
    return updateSubscriptionRepository(id, updateSubscriptionDto)
  }

  remove(id: string) {
    return deleteSubscriptionRepository(id)
  }
}
