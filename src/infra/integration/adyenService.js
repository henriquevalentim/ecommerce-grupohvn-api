const { Client, Config, CheckoutAPI } = require('@adyen/api-library')

class AdyenService {
  constructor() {
    const config = new Config()
    config.apiKey = process.env.ADYEN_API_KEY
    config.merchantAccount = process.env.ADYEN_MERCHANT_ACCOUNT
    const client = new Client({ config })
    client.setEnvironment('TEST')
    this.checkout = new CheckoutAPI(client)
  }

  async createCreditCard({
    userId,
    email,
    cardNumber,
    cardHolderName,
    cardExpiryMonth,
    cardExpiryYear,
    cardCvv
  }) {
    try {
      const response = await this.checkout.payments({
        amount: {
          currency: 'BRL',
          value: 0
        },
        reference: `REF_${userId}_${Date.now()}`,
        shopperReference: userId,
        paymentMethod: {
          type: 'scheme',
          encryptedCardNumber: `test_${cardNumber}`,
          encryptedExpiryMonth: `test_${cardExpiryMonth}`,
          encryptedExpiryYear: `test_${cardExpiryYear}`,
          encryptedSecurityCode: `test_${cardCvv}`,
          holderName: cardHolderName
        },
        shopperEmail: email,
        storePaymentMethod: true,
        shopperInteraction: 'Ecommerce',
        recurringProcessingModel: 'Subscription',
        merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT
      })
      return response
    } catch (error) {
      const responseBody = JSON.parse(error.responseBody)
      throw new Error(responseBody.message)
    }
  }
}

module.exports = AdyenService
