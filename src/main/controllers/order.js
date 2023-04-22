const ProcessOrder = require('../../domain/usecases/order/processOrder')

const ProductRepository = require('../../infra/repository/productRepository')
const AddressRepository = require('../../infra/repository/addressRepository')
const OrderRepository = require('../../infra/repository/orderRepository')
const GetFrete = require('../../domain/usecases/frete/getFrete')
const PayCreditCard = require('../../domain/usecases/payment/payCreditCard')

class OrderController {
  async processOrder(req, res) {
    try {
      const { products, address, payment } = req.body
      const { id, email } = req
      const getFrete = new GetFrete()
      const payCreditCard = new PayCreditCard()
      const processOrder = new ProcessOrder(
        ProductRepository,
        AddressRepository,
        OrderRepository,
        getFrete,
        payCreditCard
      )
      const response = await processOrder.execute({
        userId: id,
        products,
        address,
        payment,
        email
      })
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }
}

module.exports = new OrderController()
