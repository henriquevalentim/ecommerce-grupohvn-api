const UserRepository = require('../model/user')
const RegisterUser = require('../services/user/registerUser')
const AuthenticateUser = require('../services/user/authenticateUser')

class UserController {
  async create(req, res) {
    try {
      const { name, email, birthDate, cpf, password, confirmPassword } =
        req.body
      const authenticateUser = new AuthenticateUser(UserRepository)
      const registerUser = new RegisterUser(UserRepository, authenticateUser)
      const token = await registerUser.execute({
        name,
        email,
        birthDate,
        cpf,
        password,
        confirmPassword
      })
      return res.status(200).json({ token })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body
      const authenticateUser = new AuthenticateUser(UserRepository)
      const token = await authenticateUser.execute({ email, password })
      return res.status(200).json({ token })
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }
}

module.exports = new UserController()
