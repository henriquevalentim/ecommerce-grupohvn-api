const SettingRepository = require('../../infra/repository/settingRepository')
const RegisterSetting = require('../../domain/usecases/setting/registerSetting')
const GetAllSettings = require('../../domain/usecases/setting/getAllSettings')
const UpdateSetting = require('../../domain/usecases/setting/updateSetting')
const GetSettingByCode = require('../../domain/usecases/setting/getSettingsByCode')

class SettingController {
  async create(req, res) {
    try {
      const { name, code, description, type, metadatas } = req.body
      const registerSetting = new RegisterSetting(SettingRepository)
      const setting = await registerSetting.execute({
        name,
        code,
        description,
        type,
        metadatas
      })

      return res.status(200).json(setting)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }

  async update(req, res) {
    try {
      const { name, code, description, type, metadatas } = req.body
      const { idSetting } = req.params
      const updateSetting = new UpdateSetting(SettingRepository)
      const setting = await updateSetting.execute({
        id: idSetting,
        name,
        code,
        description,
        type,
        metadatas
      })

      return res.status(200).json(setting)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }

  async getAllSettings(req, res) {
    try {
      const getAllSettings = new GetAllSettings(SettingRepository)
      const settings = await getAllSettings.execute()

      return res.status(200).json(settings)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }

  async getSettingByCode(req, res) {
    try {
      const { codeSetting } = req.params
      const getSettingByCode = new GetSettingByCode(SettingRepository)
      const setting = await getSettingByCode.execute({ code: codeSetting })

      return res.status(200).json(setting)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error.message })
    }
  }
}

module.exports = new SettingController()
