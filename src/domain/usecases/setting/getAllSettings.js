class GetAllSettings {
  constructor(settingRepository) {
    this.settingRepository = settingRepository
  }

  async execute() {
    const settings = await this.settingRepository.getAllSettingsByFilter()
    return settings
  }
}

module.exports = GetAllSettings
