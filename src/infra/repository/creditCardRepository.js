const creditCardSchema = require('../schema/creditCard')

class CreditCardRepository {
  constructor() {
    this.creditCardRepository = creditCardSchema
  }

  async create({
    shopperReference,
    recurringDetailReference,
    dueDate,
    brand,
    lastFourDigits,
    firstEightDigits,
    isMain = false
  }) {
    const creditCard = await this.creditCardRepository.create({
      shopperReference,
      recurringDetailReference,
      dueDate,
      brand,
      lastFourDigits,
      firstEightDigits,
      isMain
    })
    return creditCard
  }

  async updateMainCreditCard({ idCreditCard, status }) {
    const filter = { _id: idCreditCard }
    const creditCard = await this.creditCardRepository
      .updateOne(filter, {
        isMain: status
      })
      .lean()
    return creditCard
  }

  async findByShopperReferenceAndLastFourDigitsAndFirstEightDigits({
    shopperReference,
    lastFourDigits,
    firstEightDigits
  }) {
    const creditCards = await this.creditCardRepository.find({
      shopperReference,
      lastFourDigits,
      firstEightDigits
    })
    return creditCards
  }

  async findByShopperReference({ shopperReference }) {
    const creditCards = await this.creditCardRepository.find({
      shopperReference
    })
    return creditCards
  }
}

module.exports = new CreditCardRepository()
