const { Client, Config, CheckoutAPI } = require('@adyen/api-library')
const config = new Config()
config.apiKey = process.env.ADYEN_API_KEY
config.merchantAccount = process.env.ADYEN_MERCHANT_ACCOUNT
const client = new Client({ config })
client.setEnvironment('TEST')

class PayCreditCard {
  constructor() {}

  async execute() {
    const checkout = new CheckoutAPI(client)
    checkout
      .payments({
        amount: { currency: 'BRL', value: 1000 },
        paymentMethod: {
          type: 'scheme',
          encryptedCardNumber: 'test_5555555555554444',
          encryptedExpiryMonth: 'test_03',
          encryptedExpiryYear: 'test_2030',
          encryptedSecurityCode: 'test_737',
          holderName: 'John Smith'
        },
        reference: 'TESTE_0005',
        merchantAccount: config.merchantAccount,
        storePaymentMethod: 'true',
        shopperInteraction: 'Ecommerce',
        recurringProcessingModel: 'Subscription'
      })
      .then((res) => {
        console.log(JSON.stringify(res))
      })
      .catch((err) => err)
    return { teste: 'teste' }
  }
}

module.exports = PayCreditCard
