class GetOrders {
  constructor(orderRepository, userRepository) {
    this.orderRepository = orderRepository
    this.userRepository = userRepository
  }

  async execute() {
    let orders = await this.orderRepository.getOrdersByFilter()

    const usersId = []

    orders.forEach((order) => {
      usersId.push(order.userId)
    })

    const users = await this.userRepository.getUsersByFilter({
      _id: { $in: usersId }
    })

    orders = orders.map((order) => {
      order.user = users.find((user) => user._id.toString() === order.userId)
      return order
    })

    orders = orders.filter((order) => order.user)

    return orders
  }
}

module.exports = GetOrders
