const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
const OTP = require("../models/otp.model")
const { generateOTP, sendOTPByEmail, sendOTPBySMS } = require("../utils/otp.utils")

// Register a new user (customer or driver)
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, role, vehicleNumber } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email or phone already exists",
      })
    }

    // Create new user
    const userData = {
      name,
      email,
      phone,
      password,
      role: role || "customer",
    }

    // Add driver-specific fields if role is driver
    if (role === "driver" && vehicleNumber) {
      userData.vehicleNumber = vehicleNumber

      // Handle driver license file if uploaded
      if (req.file) {
        userData.driverLicense = req.file.path
      }
    }

    const user = new User(userData)
    await user.save()

    // Generate OTP for verification
    const otp = generateOTP()

    // Save OTP to database
    const otpRecord = new OTP({
      userId: user._id,
      email: user.email,
      phone: user.phone,
      otp,
      purpose: "signup",
    })
    await otpRecord.save()

    // Send OTP via email and SMS
    await sendOTPByEmail(user.email, otp)
    await sendOTPBySMS(user.phone, otp)

    res.status(201).json({
      success: true,
      message: "User registered successfully. Please verify with OTP.",
      userId: user._id,
    })
  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    })
  }
}

// Login with password
exports.loginWithPassword = async (req, res) => {
  try {
    const { identifier, password } = req.body

    // Find user by email or phone
    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      })
    }

    // Check if user is verified
    if (!user.isVerified) {
      // Generate new OTP for unverified users
      const otp = generateOTP()

      // Save OTP to database
      const otpRecord = new OTP({
        userId: user._id,
        email: user.email,
        phone: user.phone,
        otp,
        purpose: "verify_email",
      })
      await otpRecord.save()

      // Send OTP
      await sendOTPByEmail(user.email, otp)
      await sendOTPBySMS(user.phone, otp)

      return res.status(403).json({
        success: false,
        message: "Account not verified. A new OTP has been sent.",
        userId: user._id,
        requiresVerification: true,
      })
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profilePicture: user.profilePicture,
        preferences: user.preferences,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    })
  }
}

// Request OTP for login
exports.requestLoginOTP = async (req, res) => {
  try {
    const { identifier } = req.body

    // Find user by email or phone
    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Generate OTP
    const otp = generateOTP()

    // Save OTP to database
    const otpRecord = new OTP({
      userId: user._id,
      email: user.email,
      phone: user.phone,
      otp,
      purpose: "login",
    })
    await otpRecord.save()

    // Send OTP
    await sendOTPByEmail(user.email, otp)
    await sendOTPBySMS(user.phone, otp)

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      userId: user._id,
    })
  } catch (error) {
    console.error("OTP request error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message,
    })
  }
}

// Login with OTP
exports.loginWithOTP = async (req, res) => {
  try {
    const { identifier, otp } = req.body

    // Find user by email or phone
    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Verify OTP
    const otpRecord = await OTP.findOne({
      userId: user._id,
      otp,
      purpose: "login",
      isUsed: false,
      expiresAt: { $gt: new Date() },
    })

    if (!otpRecord) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired OTP",
      })
    }

    // Mark OTP as used
    otpRecord.isUsed = true
    await otpRecord.save()

    // If user is not verified, mark as verified
    if (!user.isVerified) {
      user.isVerified = true
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profilePicture: user.profilePicture,
        preferences: user.preferences,
      },
    })
  } catch (error) {
    console.error("OTP login error:", error)
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    })
  }
}

// Verify OTP (for signup, password reset, etc.)
exports.verifyOTP = async (req, res) => {
  try {
    const { userId, otp, purpose } = req.body

    // Find the OTP record
    const otpRecord = await OTP.findOne({
      userId,
      otp,
      purpose,
      isUsed: false,
      expiresAt: { $gt: new Date() },
    })

    if (!otpRecord) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired OTP",
      })
    }

    // Mark OTP as used
    otpRecord.isUsed = true
    await otpRecord.save()

    // If purpose is signup or verify_email, mark user as verified
    if (purpose === "signup" || purpose === "verify_email") {
      await User.findByIdAndUpdate(userId, { isVerified: true })
    }

    // Generate JWT token if purpose is signup or login
    let token = null
    let userData = null

    if (purpose === "signup" || purpose === "login") {
      const user = await User.findById(userId)

      token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" })

      userData = {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profilePicture: user.profilePicture,
        preferences: user.preferences,
      }

      // Update last login
      user.lastLogin = new Date()
      await user.save()
    }

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
      user: userData,
    })
  } catch (error) {
    console.error("OTP verification error:", error)
    res.status(500).json({
      success: false,
      message: "OTP verification failed",
      error: error.message,
    })
  }
}

// Resend OTP
exports.resendOTP = async (req, res) => {
  try {
    const { userId, purpose } = req.body

    // Find user
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Generate new OTP
    const otp = generateOTP()

    // Save OTP to database
    const otpRecord = new OTP({
      userId: user._id,
      email: user.email,
      phone: user.phone,
      otp,
      purpose,
    })
    await otpRecord.save()

    // Send OTP
    await sendOTPByEmail(user.email, otp)
    await sendOTPBySMS(user.phone, otp)

    res.status(200).json({
      success: true,
      message: "OTP resent successfully",
    })
  } catch (error) {
    console.error("Resend OTP error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to resend OTP",
      error: error.message,
    })
  }
}

// Admin login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find admin user
    const admin = await User.findOne({ email, role: "admin" })

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      })
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password)
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      })
    }

    // Update last login
    admin.lastLogin = new Date()
    await admin.save()

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }, // Shorter expiry for admin tokens
    )

    res.status(200).json({
      success: true,
      message: "Admin login successful",
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    })
  } catch (error) {
    console.error("Admin login error:", error)
    res.status(500).json({
      success: false,
      message: "Admin login failed",
      error: error.message,
    })
  }
}

// Forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const { identifier } = req.body

    // Find user by email or phone
    const user = await User.findOne({
      $or: [{ email: identifier }, { phone: identifier }],
    })

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Generate OTP
    const otp = generateOTP()

    // Save OTP to database
    const otpRecord = new OTP({
      userId: user._id,
      email: user.email,
      phone: user.phone,
      otp,
      purpose: "reset_password",
    })
    await otpRecord.save()

    // Send OTP
    await sendOTPByEmail(user.email, otp)
    await sendOTPBySMS(user.phone, otp)

    res.status(200).json({
      success: true,
      message: "Password reset OTP sent successfully",
      userId: user._id,
    })
  } catch (error) {
    console.error("Forgot password error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to process password reset",
      error: error.message,
    })
  }
}

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { userId, otp, newPassword } = req.body

    // Verify OTP
    const otpRecord = await OTP.findOne({
      userId,
      otp,
      purpose: "reset_password",
      isUsed: false,
      expiresAt: { $gt: new Date() },
    })

    if (!otpRecord) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired OTP",
      })
    }

    // Mark OTP as used
    otpRecord.isUsed = true
    await otpRecord.save()

    // Update user password
    const user = await User.findById(userId)
    user.password = newPassword
    await user.save()

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    })
  } catch (error) {
    console.error("Reset password error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to reset password",
      error: error.message,
    })
  }
}
