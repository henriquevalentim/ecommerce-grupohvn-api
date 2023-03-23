const { Client, Config, CheckoutAPI, Recurring } = require('@adyen/api-library')

class PayCreditCard {
  constructor() {}

  async execute() {
    const config = new Config()
    config.apiKey = process.env.ADYEN_API_KEY
    config.merchantAccount = process.env.ADYEN_MERCHANT_ACCOUNT
    const client = new Client({ config })
    client.setEnvironment('TEST')

    const checkout = new CheckoutAPI(client)

    const response = await checkout.payments({
      amount: {
        currency: 'USD',
        value: 1000
      },
      reference: 'ALOU_58595',
      paymentMethod: {
        type: 'scheme',
        encryptedCardNumber: 'test_5555555555554444',
        encryptedExpiryMonth: 'test_03',
        encryptedExpiryYear: 'test_2030',
        encryptedSecurityCode: 'test_737',
        holderName: 'John Smith'
      },
      shopperReference: 'ALOUUUUUU_321',
      storePaymentMethod: true,
      shopperInteraction: 'Ecommerce',
      recurringProcessingModel: 'Subscription',
      merchantAccount: config.merchantAccount
    })

    // const recurring = new Recurring(client)
    // const response = await recurring.listRecurringDetails({
    //   merchantAccount: config.merchantAccount,
    //   shopperReference: 'ALOUUUUUU_321'
    // })

    // console.log('000000', response)

    return { teste: 'teste' }
  }
}

module.exports = PayCreditCard
