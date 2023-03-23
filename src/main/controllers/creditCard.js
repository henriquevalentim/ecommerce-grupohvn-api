const AdyenService = require('../../infra/integration/adyenService')
const CreateCreditCard = require('../../domain/usecases/creditCard/createCreditCard')
const GetCreditCardsByUser = require('../../domain/usecases/creditCard/getCreditCardsByUser')
const UpdateMainCreditCard = require('../../domain/usecases/creditCard/updateMainCreditCard')
const creditCardRepository = require('../../infra/repository/creditCardRepository')

class CreditCardController {
  async create(req, res) {
    try {
      const {
        cardNumber,
        cardHolderName,
        cardExpiryMonth,
        cardExpiryYear,
        cardCvv
      } = req.body
      const { id, email } = req

      const adyenService = new AdyenService()
      const createCreditCard = new CreateCreditCard(
        adyenService,
        creditCardRepository
      )

      const response = await createCreditCard.execute({
        userId: id,
        email,
        cardNumber,
        cardHolderName,
        cardExpiryMonth,
        cardExpiryYear,
        cardCvv
      })
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }

  async setMainCreditCard(req, res) {
    try {
      const { id } = req
      const { idCreditCard } = req.params

      const updateMainCreditCard = new UpdateMainCreditCard(
        creditCardRepository
      )

      const response = await updateMainCreditCard.execute({
        userId: id,
        idCreditCard
      })
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }

  async getCreditCardsByUser(req, res) {
    try {
      const { id } = req

      const getCreditCardsByUser = new GetCreditCardsByUser(
        creditCardRepository
      )

      const response = await getCreditCardsByUser.execute({
        userId: id
      })
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }
}

module.exports = new CreditCardController()
