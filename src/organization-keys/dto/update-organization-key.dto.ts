import { PartialType } from '@nestjs/swagger'
import { CreateOrganizationKeyDto } from './create-organization-key.dto'

export class UpdateOrganizationKeyDto extends PartialType(
  CreateOrganizationKeyDto,
) {}
