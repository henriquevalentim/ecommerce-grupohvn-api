const GetFrete = require('../../domain/usecases/frete/getFrete')
class FreteController {
  async getFrete(req, res) {
    try {
      const { cep } = req.params
      const getFrete = new GetFrete()
      const frete = await getFrete.execute({ cep })
      return res.status(200).json(frete)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }
}

module.exports = new FreteController()
