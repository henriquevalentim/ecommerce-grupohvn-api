const AddressRepository = require('../../infra/repository/addressRepository')
const RegisterAddress = require('../../domain/usecases/address/registerAddress')
const GetAddressUser = require('../../domain/usecases/address/getAdressUser')
const UpdateMainAddress = require('../../domain/usecases/address/updateMainAddress')
const DeleteAddress = require('../../domain/usecases/address/deleteAddress')
const UpdateAddress = require('../../domain/usecases/address/updateAddress')

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

  async updateAddress(req, res) {
    try {
      const {
        name,
        zipCode,
        street,
        number,
        neighborhood,
        city,
        uf,
        complement
      } = req.body
      const { idAddress } = req.params

      const updateAddress = new UpdateAddress(AddressRepository)
      const address = await updateAddress.execute({
        name,
        zipCode,
        street,
        number,
        neighborhood,
        city,
        uf,
        complement,
        idAddress
      })
      return res.status(200).json(address)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }

  async deleteAdressUser(req, res) {
    try {
      const { idAddress } = req.params

      const deleteAddress = new DeleteAddress(AddressRepository)
      const address = await deleteAddress.execute({ idAddress })

      return res.status(200).json(address)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }

  async getAdressUser(req, res) {
    try {
      const { id: userId } = req

      const getAddressUser = new GetAddressUser(AddressRepository)
      const address = await getAddressUser.execute({ userId })
      return res.status(200).json(address)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }

  async updateMainAddress(req, res) {
    try {
      const { id: userId } = req
      const { addressId } = req.body

      const updateMainAddress = new UpdateMainAddress(AddressRepository)
      const address = await updateMainAddress.execute({ userId, addressId })
      return res.status(200).json(address)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }
}

module.exports = new AddressController()
