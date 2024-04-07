import { AddressByZipCodeType } from './types'

export const getAddressByZipCode = async (
  zipCode: string,
): Promise<AddressByZipCodeType | any> => {
  try {
    const address = await fetch(`${process.env.ZIPCODE_API_URL}/${zipCode}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return await address.json()
  } catch (error: any) {
    return error?.message || 'ocorreu um erro inesperado'
  }
}
