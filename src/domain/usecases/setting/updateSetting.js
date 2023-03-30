class UpdateSetting {
  constructor(settingRepository) {
    this.settingRepository = settingRepository
  }

  async execute({ id, name, code, description, type, metadatas = [] }) {
    if (!id || !name || !code || !type || !metadatas.length) {
      throw new Error('Todos os campos são obrigatórios')
    }

    const setting = await this.settingRepository.update({
      id,
      name,
      code,
      description,
      type,
      metadatas
    })
    return setting
  }
}

module.exports = UpdateSetting
