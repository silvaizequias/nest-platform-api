import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AwesomeApiAddress } from './location.interface'

@Injectable()
export class LocationService {
  constructor(private readonly configService: ConfigService) {}

  private url = this.configService.getOrThrow('ZIPCODE_API_URL')

  async addressByZipCode(zipCode: string): Promise<AwesomeApiAddress | any> {
    return await fetch(`${this.url}/${zipCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (data) => await data.json())
      .catch((error) => error)
  }
}
