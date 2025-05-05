const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
      match: [/^\+?[0-9]{10,15}$/, "Please enter a valid phone number"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },
    role: {
      type: String,
      enum: ["customer", "driver", "admin"],
      default: "customer",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    // Driver specific fields
    vehicleNumber: {
      type: String,
      trim: true,
      sparse: true,
    },
    driverLicense: {
      type: String,
      sparse: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    // Common fields
    profilePicture: {
      type: String,
      default: "",
    },
    savedLocations: [
      {
        name: String,
        address: String,
        lat: Number,
        lng: Number,
        type: {
          type: String,
          enum: ["home", "work", "other"],
          default: "other",
        },
      },
    ],
    paymentMethods: [
      {
        type: {
          type: String,
          enum: ["credit", "debit", "upi", "wallet"],
          required: true,
        },
        cardNumber: String,
        cardName: String,
        expiryDate: String,
        isDefault: {
          type: Boolean,
          default: false,
        },
        upiId: String,
      },
    ],
    preferences: {
      language: {
        type: String,
        enum: ["en", "hi", "bn", "te", "ta", "mr", "gu"],
        default: "en",
      },
      theme: {
        type: String,
        enum: ["light", "dark", "system"],
        default: "system",
      },
      notifications: {
        email: {
          type: Boolean,
          default: true,
        },
        sms: {
          type: Boolean,
          default: true,
        },
        push: {
          type: Boolean,
          default: true,
        },
      },
    },
    fcmToken: String,
    lastLogin: Date,
  },
  {
    timestamps: true,
  },
)

// Pre-save hook to hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model("User", userSchema)

module.exports = User
