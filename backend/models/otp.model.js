const mongoose = require("mongoose")

const otpSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      sparse: true,
    },
    email: {
      type: String,
      sparse: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      sparse: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      enum: ["signup", "login", "reset_password", "verify_email", "verify_phone"],
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => {
        return new Date(Date.now() + 10 * 60 * 1000) // 10 minutes from now
      },
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

// Index to automatically delete expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

const OTP = mongoose.model("OTP", otpSchema)

module.exports = OTP
