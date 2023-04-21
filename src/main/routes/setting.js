let app = require('express').Router()

const SettingController = require('../controllers/setting')

const isAuthenticadedAdmin = require('../middlewares/isAuthenticatedAdmin')

app.post('/', isAuthenticadedAdmin, (req, res) =>
  SettingController.create(req, res)
)
app.put('/:idSetting', isAuthenticadedAdmin, (req, res) =>
  SettingController.update(req, res)
)
app.get('/', isAuthenticadedAdmin, (req, res) =>
  SettingController.getAllSettings(req, res)
)
app.get('/:codeSetting', (req, res) =>
  SettingController.getSettingByCode(req, res)
)

module.exports = app
