class GetAllSettings {
  constructor(settingRepository) {
    this.settingRepository = settingRepository
  }

  async execute({ code }) {
    const settings = await this.settingRepository.getSettingByCode({ code })
    return settings
  }
}

module.exports = GetAllSettings
