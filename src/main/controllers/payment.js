const PayCreditCard = require('../../domain/usecases/payment/payCreditCard')
const UserRepository = require('../../infra/repository/userRepository')
const GeneratePaymentLink = require('../../domain/usecases/payment/generatePaymentLink')

class PaymentController {
  async payCreditCard(req, res) {
    try {
      const { products, address, payment } = req.body
      const { id } = req
      const payCreditCard = new PayCreditCard()
      const response = await payCreditCard.execute({
        userId: id,
        products,
        address,
        payment
      })
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }

  async receiveNotification(req, res) {
    try {
      console.log(JSON.stringify(req.body))
      return res.status(200).json('[accepted]')
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }

  async generatePaymentLink(req, res) {
    try {
      const { amount, userId } = req.body
      const generatePaymentLink = new GeneratePaymentLink(UserRepository)
      const response = await generatePaymentLink.execute({
        amount,
        userId
      })
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }
}

module.exports = new PaymentController()
