const { Client, Config, CheckoutAPI, Recurring } = require('@adyen/api-library')

class GeneratePaymentLink {
  constructor(userRepository) {
    const config = new Config()
    config.apiKey = process.env.ADYEN_API_KEY
    config.merchantAccount = process.env.ADYEN_MERCHANT_ACCOUNT
    const client = new Client({ config })
    client.setEnvironment('TEST')

    this.checkout = new CheckoutAPI(client)
    this.userRepository = userRepository
  }

  async execute({ amount, userId }) {
    try {
      if (!userId) throw new Error('Usuário não informado')
      if (!amount) throw new Error('Valor não informado')

      const user = await this.userRepository.findById(userId)
      if (!user) throw new Error('Usuário não encontrado')

      const nameSplit = user?.name.split(' ')

      const response = await this.checkout.paymentLinks({
        merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
        reference: `${userId}_${new Date().toISOString()}`,
        amount: {
          currency: 'BRL',
          value: amount * 100
        },
        description: 'Grupo HVN',
        countryCode: 'BR',
        shopperLocale: 'pt-BR',
        shopperReference: userId,
        storePaymentMethodMode: 'askForConsent',
        recurringProcessingModel: 'CardOnFile',
        shopperEmail: user?.email,
        shopperName: {
          firstName: nameSplit[0],
          lastName: nameSplit[1]
        }
      })

      return response
    } catch (error) {
      console.log(error)
      throw new Error(error.message)
    }
  }
}

module.exports = GeneratePaymentLink
