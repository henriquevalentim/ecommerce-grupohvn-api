const UserRepository = require('../../infra/repository/userRepository')
const RegisterUser = require('../../domain/usecases/user/registerUser')
const AuthenticateUser = require('../../domain/usecases/user/authenticateUser')
const PayCreditCard = require('../../domain/usecases/payment/payCreditCard')

class PaymentController {
  async payCreditCard(req, res) {
    try {
      // const { name, email, birthDate, cpf, password, confirmPassword, genre } =
      //   req.body
      // const authenticateUser = new AuthenticateUser(UserRepository)
      // const registerUser = new RegisterUser(UserRepository, authenticateUser)
      // const token = await registerUser.execute({
      //   name,
      //   email,
      //   birthDate,
      //   cpf,
      //   password,
      //   confirmPassword,
      //   genre
      // })

      const payCreditCard = new PayCreditCard()
      const response = await payCreditCard.execute()
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }
}

module.exports = new PaymentController()
