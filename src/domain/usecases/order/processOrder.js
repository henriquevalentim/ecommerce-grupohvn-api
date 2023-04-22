class ProcessOrder {
  constructor(
    productRepository,
    addressRepository,
    orderRepository,
    getFrete,
    payCreditCard
  ) {
    this.productRepository = productRepository
    this.addressRepository = addressRepository
    this.orderRepository = orderRepository
    this.getFrete = getFrete
    this.payCreditCard = payCreditCard
  }

  async execute({ userId, products = [], address, payment, email }) {
    if (!userId || !products || !address || !payment || !email) {
      throw new Error('Todos os campos são obrigatorios')
    }
    const productsResult = await this._getAllProductsByCode(products)
    const priceProducts = this._calcPriceProducts(products, productsResult)

    const addressFinded = await this.addressRepository.getAddressById({
      idAddress: address.id
    })

    const priceFrete = await this._calcPriceFrete(
      addressFinded.zipCode,
      address.sendMethod
    )

    const expiry = payment.card.expiry.split('/')

    const response = await this.payCreditCard.execute({
      cardNumber: payment.card.number,
      securityCode: payment.card.cvc,
      expiryMonth: expiry[0],
      expiryYear: expiry[1],
      holderName: payment.card.name,
      amount: priceProducts + priceFrete,
      installments: payment.installments,
      reference: `${userId}_${new Date().getTime()}`,
      shopperReference: userId,
      shopperEmail: email
    })

    const status = this._getStatus({ resultCode: response?.resultCode })

    const order = await this.orderRepository.create({
      userId,
      addressId: address.id,
      sendMethod: address.sendMethod,
      paymentMethod: payment.paymentMethod,
      installments: payment.installments,
      status,
      products,
      total: priceProducts + priceFrete
    })

    return order
  }

  _getStatus({ resultCode }) {
    let status = 'Aguardando Pagamento'
    if (resultCode === 'Authorised') {
      status = 'Pagamento Autorizado'
    } else if (response.resultCode === 'Refused') {
      status = 'Pagamento Recusado'
    } else if (response.resultCode === 'Error') {
      status = 'Erro no Pagamento'
    } else if (response.resultCode === 'Cancelled') {
      status = 'Pagamento Cancelado'
    } else if (response.resultCode === 'Received') {
      status = 'Pagamento Recebido'
    } else if (response.resultCode === 'RedirectShopper') {
      status = 'Pagamento Redirecionado'
    }
    return status
  }

  async _getAllProductsByCode(products) {
    const filter = {
      code: { $in: products.map((product) => product.code) }
    }
    const productsResult = await this.productRepository.getAllProductsByFilter(
      filter
    )
    return productsResult
  }

  _calcPriceProducts(productsUser, productsResult) {
    let total = 0
    productsUser.forEach((product) => {
      const productFinded = productsResult.find(
        (productResult) => product.code === productResult.code
      )
      total += productFinded.price * product.quantity
    })
    return total
  }

  async _calcPriceFrete(cep, sendMethod) {
    const frete = await this.getFrete.execute({ cep })
    if (sendMethod.toLowerCase() === 'sedex') {
      return Number(frete.sedex.valor.replace(',', '.'))
    }
    if (sendMethod.toLowerCase() === 'pac') {
      return Number(frete.pac.valor.replace(',', '.'))
    }
  }
}

module.exports = ProcessOrder
