const UserRepository = require('../../infra/repository/userRepository')
const RegisterUser = require('../../domain/usecases/user/registerUser')
const AuthenticateUser = require('../../domain/usecases/user/authenticateUser')
const GetUserData = require('../../domain/usecases/user/getUserData')
const UpdateUserData = require('../../domain/usecases/user/updateUserData')

class UserController {
  async create(req, res) {
    try {
      const { name, email, birthDate, cpf, password, confirmPassword, genre } =
        req.body
      const authenticateUser = new AuthenticateUser(UserRepository)
      const registerUser = new RegisterUser(UserRepository, authenticateUser)
      const token = await registerUser.execute({
        name,
        email,
        birthDate,
        cpf,
        password,
        confirmPassword,
        genre
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

  async userData(req, res) {
    try {
      const getUserData = new GetUserData(UserRepository)
      const userData = await getUserData.execute({ id: req.id })
      return res.status(200).json(userData)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }

  async editUserData(req, res) {
    try {
      const updateUserData = new UpdateUserData(UserRepository)
      const userData = await updateUserData.execute({ id: req.id, ...req.body })
      return res.status(200).json(userData)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }
}

module.exports = new UserController()
