const settingSchema = require('../schema/setting')

class SettingRepository {
  constructor() {
    this.settingRepository = settingSchema
  }

  async create({ name, code, description, type, metadatas }) {
    const setting = await this.settingRepository.create({
      name,
      code,
      description,
      type,
      metadatas
    })
    return setting
  }

  async update({ id, name, code, description, type, metadatas }) {
    const setting = await this.settingRepository.updateOne(
      { _id: id },
      {
        name,
        code,
        description,
        type,
        metadatas
      }
    )
    return setting
  }

  async getSettingByCode({ code }) {
    const filter = { code: code }
    const setting = await this.settingRepository.findOne(filter)
    return setting
  }

  async getAllSettingsByFilter(filter = {}) {
    const setting = await this.settingRepository.find(filter)
    return setting
  }
}

module.exports = new SettingRepository()
