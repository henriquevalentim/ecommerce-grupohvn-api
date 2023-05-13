class ProcessOrderLinkPayment {
  constructor(orderRepository, generatePaymentLink) {
    this.orderRepository = orderRepository
    this.generatePaymentLink = generatePaymentLink
  }

  async execute({ userId, amount }) {
    if (!userId) {
      throw new Error('UserId é obrigatório')
    }

    const responsePayment = await this.generatePaymentLink.execute({
      userId,
      amount
    })

    const metadata = [{ key: 'paymentLink', value: responsePayment.url }]

    const order = await this.orderRepository.create({
      userId,
      paymentMethod: 'LINK_PAYMENT',
      status: 'Aguardando Pagamento',
      products: [],
      total: amount,
      metadata
    })

    return order
  }
}

module.exports = ProcessOrderLinkPayment
