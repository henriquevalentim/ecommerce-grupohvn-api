const AddressRepository = require('../../infra/repository/addressRepository')
const RegisterAddress = require('../../domain/usecases/address/registerAddress')

class AddressController {
  async create(req, res) {
    try {
      const { id: userId } = req
      const {
        name,
        zipCode,
        street,
        number,
        neighborhood,
        city,
        uf,
        complement,
        isMain
      } = req.body

      const registerAddress = new RegisterAddress(AddressRepository)
      const address = await registerAddress.execute({
        name,
        zipCode,
        street,
        number,
        neighborhood,
        city,
        uf,
        complement,
        userId,
        isMain
      })
      return res.status(200).json(address)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }
}

module.exports = new AddressController()
