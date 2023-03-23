class CreateCreditCard {
  constructor(adyenService, creditCardRepository) {
    this.adyenService = adyenService
    this.creditCardRepository = creditCardRepository
  }

  async execute({
    userId,
    email,
    cardNumber,
    cardHolderName,
    cardExpiryMonth,
    cardExpiryYear,
    cardCvv
  }) {
    const adyenResponse = await this.adyenService.createCreditCard({
      userId,
      email,
      cardNumber,
      cardHolderName,
      cardExpiryMonth,
      cardExpiryYear,
      cardCvv
    })

    if (adyenResponse.resultCode === 'Refused') {
      throw new Error(adyenResponse.refusalReason)
    }

    const additionalData = adyenResponse.additionalData

    const creditCardBody = {
      shopperReference: userId,
      dueDate: additionalData?.expiryDate,
      brand: additionalData?.paymentMethod || additionalData?.cardPaymentMethod,
      recurringDetailReference:
        additionalData?.['recurring.recurringDetailReference'],
      lastFourDigits: additionalData?.cardSummary,
      firstEightDigits: additionalData?.issuerBin
    }

    const creditCardsFinded =
      await this.creditCardRepository.findByShopperReferenceAndBrandAndLastFourDigitsAndFirstEightDigits(
        {
          shopperReference: creditCardBody.shopperReference,
          brand: creditCardBody.brand,
          lastFourDigits: creditCardBody.lastFourDigits,
          firstEightDigits: creditCardBody.firstEightDigits
        }
      )
    if (creditCardsFinded.length > 0) {
      throw new Error('Cartão já cadastrado')
    }

    const creditCardsUser =
      await this.creditCardRepository.findByShopperReference({
        shopperReference: creditCardBody.shopperReference
      })

    if (creditCardsUser.length === 0) {
      creditCardBody.isMain = true
    }

    const creditCard = await this.creditCardRepository.create({
      ...creditCardBody
    })

    return creditCard
  }
}

module.exports = CreateCreditCard
