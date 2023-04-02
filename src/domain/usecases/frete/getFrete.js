const { calcularPrecoPrazo } = require('correios-brasil')

class GetFrete {
  constructor() {}

  async execute({ cep }) {
    let args = {
      sCepOrigem: '20031900',
      sCepDestino: cep,
      nVlPeso: '1',
      nCdFormato: '1',
      nVlComprimento: '20',
      nVlAltura: '20',
      nVlLargura: '20',
      nCdServico: ['04014', '04510'], //Array com os códigos de serviço
      nVlDiametro: '0'
    }
    const response = await calcularPrecoPrazo(args)
    const sedex = response.find((item) => item.Codigo === '04014')
    const pac = response.find((item) => item.Codigo === '04510')
    return {
      sedex: { valor: sedex.Valor, prazo: sedex.PrazoEntrega },
      pac: { valor: pac.Valor, prazo: pac.PrazoEntrega }
    }
  }
}

module.exports = GetFrete
