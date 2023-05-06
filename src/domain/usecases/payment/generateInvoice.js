const { Client, Config, CheckoutAPI, Recurring } = require('@adyen/api-library')
const { addDaysInDate } = require('../../../utils/helpers/date')

class GenerateInvoice {
  constructor() {
    const config = new Config()
    config.apiKey = process.env.ADYEN_API_KEY
    config.merchantAccount = process.env.ADYEN_MERCHANT_ACCOUNT
    const client = new Client({ config })
    client.setEnvironment('TEST')

    this.checkout = new CheckoutAPI(client)
  }

  async execute({ name, email, cpf, amount, address, reference }) {
    try {
      const nameSplit = name.split(' ')

      const dataVencimento = addDaysInDate(new Date(), 5)
      const response = await this.checkout.payments({
        merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
        reference: reference,
        amount: {
          currency: 'BRL',
          value: amount * 100
        },
        paymentMethod: {
          type: 'boletobancario'
        },
        shopperName: {
          firstName: nameSplit[0],
          lastName: nameSplit[1]
        },
        billingAddress: {
          city: address.city,
          country: 'BR',
          houseNumberOrName: address.number,
          postalCode: address.zipCode,
          stateOrProvince: address.uf,
          street: address.street
        },
        socialSecurityNumber: cpf,
        deliveryDate: dataVencimento,
        shopperEmail: email,
        shopperStatement:
          'Aceitar o pagamento até 15 dias após o vencimento.\nNão cobrar juros. Não aceitar o pagamento com cheque'
      })

      return response
    } catch (error) {
      console.log(error)
      throw new Error(error.message)
    }
  }
}

module.exports = GenerateInvoice
