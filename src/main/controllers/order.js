const ProductRepository = require('../../infra/repository/productRepository')
const AddressRepository = require('../../infra/repository/addressRepository')
const OrderRepository = require('../../infra/repository/orderRepository')
const UserRepository = require('../../infra/repository/userRepository')
const GetOrdersByUser = require('../../domain/usecases/order/getOrdersByUser')
const GetFrete = require('../../domain/usecases/frete/getFrete')
const PayCreditCard = require('../../domain/usecases/payment/payCreditCard')
const ProcessOrder = require('../../domain/usecases/order/processOrder')
const GetOrders = require('../../domain/usecases/order/getOrders')
const EditStatusOrder = require('../../domain/usecases/order/editStatusOrder')
const GenerateInvoice = require('../../domain/usecases/payment/generateInvoice')
const ProcessOrderLinkPayment = require('../../domain/usecases/order/processOrderLinkPayment')
const GeneratePaymentLink = require('../../domain/usecases/payment/generatePaymentLink')

class OrderController {
  async getOrdersByUser(req, res) {
    try {
      const { id } = req
      const getOrdersByUser = new GetOrdersByUser(
        ProductRepository,
        OrderRepository
      )

      const response = await getOrdersByUser.execute({
        userId: id
      })

      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }

  async getOrders(req, res) {
    try {
      const getOrders = new GetOrders(OrderRepository, UserRepository)

      const response = await getOrders.execute()

      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }

  async processOrder(req, res) {
    try {
      const { products, address, payment } = req.body
      const { id, email } = req
      const getFrete = new GetFrete()
      const payCreditCard = new PayCreditCard()
      const generateInvoice = new GenerateInvoice()
      const processOrder = new ProcessOrder(
        ProductRepository,
        AddressRepository,
        OrderRepository,
        getFrete,
        payCreditCard,
        generateInvoice,
        UserRepository
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

  async processOrderLinkPayment(req, res) {
    try {
      const { userId, amount } = req.body
      const generatePaymentLink = new GeneratePaymentLink(UserRepository)
      const processOrderLinkPayment = new ProcessOrderLinkPayment(
        OrderRepository,
        generatePaymentLink
      )
      const response = await processOrderLinkPayment.execute({
        userId,
        amount
      })
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }

  async editStatusOrder(req, res) {
    try {
      const { status } = req.body
      const { id } = req.params
      const editStatusOrder = new EditStatusOrder(OrderRepository)
      const response = await editStatusOrder.execute({
        orderId: id,
        status
      })
      return res.status(200).json(response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }
}

module.exports = new OrderController()
