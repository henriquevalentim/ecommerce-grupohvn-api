const { Client, Config, CheckoutAPI, Recurring } = require('@adyen/api-library')

class PayCreditCard {
  constructor() {}

  async execute({
    cardNumber,
    securityCode,
    expiryMonth,
    expiryYear,
    holderName,
    amount,
    installments = 1,
    reference,
    shopperReference,
    shopperEmail
  }) {
    try {
      const config = new Config()
      config.apiKey = process.env.ADYEN_API_KEY
      config.merchantAccount = process.env.ADYEN_MERCHANT_ACCOUNT
      const client = new Client({ config })
      client.setEnvironment('TEST')

      const checkout = new CheckoutAPI(client)

      const response = await checkout.payments({
        amount: {
          currency: 'BRL',
          value: amount * 100
        },
        installments: {
          value: installments
        },
        reference: reference,
        paymentMethod: {
          type: 'scheme',
          encryptedCardNumber: `test_${cardNumber}`,
          encryptedExpiryMonth: `test_${expiryMonth}`,
          encryptedExpiryYear: `test_${expiryYear}`,
          encryptedSecurityCode: `test_${securityCode}`,
          holderName
        },
        shopperReference,
        shopperEmail,
        storePaymentMethod: true,
        shopperInteraction: 'Ecommerce',
        recurringProcessingModel: 'Subscription',
        merchantAccount: config.merchantAccount
      })

      return response
    } catch (error) {
      console.log(error)
      throw new Error(error.message)
    }
  }
}

module.exports = PayCreditCard
