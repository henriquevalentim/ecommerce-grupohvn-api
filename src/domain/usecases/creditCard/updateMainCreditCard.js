class UpdateMainCreditCard {
  constructor(creditCardRepository) {
    this.creditCardRepository = creditCardRepository
  }

  async execute({ userId, idCreditCard }) {
    const creditCardsFinded =
      await this.creditCardRepository.findByShopperReference({
        shopperReference: userId
      })

    if (creditCardsFinded.length) {
      const creditCardOld = creditCardsFinded.find((item) => item.isMain)
      await this.creditCardRepository.updateMainCreditCard({
        idCreditCard: creditCardOld._id,
        status: false
      })
      await this.creditCardRepository.updateMainCreditCard({
        idCreditCard: idCreditCard,
        status: true
      })
    }

    return { message: 'Cartão principal atualizado com sucesso' }
  }
}

module.exports = UpdateMainCreditCard
