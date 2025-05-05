const nodemailer = require("nodemailer")
const twilio = require("twilio")

// Configure email transporter
const emailTransporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// Configure Twilio client
const twilioClient =
  process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN
    ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
    : null

// Generate a 6-digit OTP
exports.generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Send OTP via email
exports.sendOTPByEmail = async (email, otp) => {
  try {
    // In development mode, just log the OTP
    if (process.env.NODE_ENV === "development") {
      console.log(`[DEV MODE] OTP for ${email}: ${otp}`)
      return true
    }

    // Send actual email in production
    const mailOptions = {
      from: process.env.EMAIL_FROM || "noreply@idharudhar.com",
      to: email,
      subject: "Your IdharUdhar Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #4CAF50;">IdharUdhar</h2>
          </div>
          <div style="margin-bottom: 30px;">
            <p>Hello,</p>
            <p>Your verification code for IdharUdhar is:</p>
            <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
              ${otp}
            </div>
            <p>This code will expire in 10 minutes.</p>
            <p>If you didn't request this code, please ignore this email.</p>
          </div>
          <div style="text-align: center; font-size: 12px; color: #888; margin-top: 30px;">
            <p>© ${new Date().getFullYear()} IdharUdhar. All rights reserved.</p>
          </div>
        </div>
      `,
    }

    await emailTransporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}

// Send OTP via SMS
exports.sendOTPBySMS = async (phone, otp) => {
  try {
    // In development mode, just log the OTP
    if (process.env.NODE_ENV === "development" || !twilioClient) {
      console.log(`[DEV MODE] OTP for ${phone}: ${otp}`)
      return true
    }

    // Send actual SMS in production
    await twilioClient.messages.create({
      body: `Your IdharUdhar verification code is: ${otp}. This code will expire in 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    })

    return true
  } catch (error) {
    console.error("Error sending SMS:", error)
    return false
  }
}
