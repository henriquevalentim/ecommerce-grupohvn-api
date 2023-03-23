class GetCreditCardsByUser {
  constructor(creditCardRepository) {
    this.creditCardRepository = creditCardRepository
  }

  async execute({ userId }) {
    const creditCards = await this.creditCardRepository.findByShopperReference({
      shopperReference: userId
    })

    return creditCards
  }
}

module.exports = GetCreditCardsByUser
