import { HttpException, Injectable } from '@nestjs/common'
import { AuthorizationDto } from './authorization.dto'

@Injectable()
export class AuthorizationService {
  constructor() {}

  async validation(authorizationKey: string, request: Request): Promise<any> {
    const { method, url, headers } = request
    const { host }: any = headers
    const authorizationDto: AuthorizationDto = {
      key: authorizationKey,
      host: host,
      method: method,
      url: url,
    }
    try {
      console.log(authorizationDto)
      return true
    } catch (error: any) {
      throw new HttpException(error, error.status)
    }
  }
}
