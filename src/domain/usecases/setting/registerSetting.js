class RegisterSetting {
  constructor(settingRepository) {
    this.settingRepository = settingRepository
  }

  async execute({ name, code, description, type, metadatas = [] }) {
    if (!name || !code || !type || !metadatas.length) {
      throw new Error('Todos os campos são obrigatórios')
    }

    const settingExists = await this.settingRepository.getSettingByCode({
      code
    })

    if (settingExists) {
      throw new Error('Configuração já cadastrado')
    }

    const setting = await this.settingRepository.create({
      name,
      code,
      description,
      type,
      metadatas
    })
    return setting
  }
}

module.exports = RegisterSetting
