const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_NODEMAILER,
    pass: process.env.PASS_NODEMAILER
  },
  tls: {
    rejectUnauthorized: false
  }
})

module.exports = transporter
