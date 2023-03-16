const fs = require('fs')
const path = require('path')
const Handlebars = require('handlebars')
const transporter = require('../config/sendMail')

class NodeMailer {
  async sendMail({
    from = process.env.FROM_NODEMAILER,
    to,
    subject,
    text,
    html
  }) {
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text,
      html
    })
    return info
  }

  async sendWelcomeEmail({
    from = process.env.FROM_NODEMAILER,
    to,
    subject,
    name
  }) {
    const source = fs.readFileSync(
      path.join(__dirname, '../templates/views/welcome/index.hbs'),
      'utf8'
    )
    var template = Handlebars.compile(source)
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html: template({ name })
    })
    return info
  }
}

module.exports = new NodeMailer()
