const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const { v4: uuidv4 } = require("uuid")
const authController = require("../controllers/auth.controller")

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${uuidv4()}-${file.originalname}`
    cb(null, uniqueFilename)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [".jpg", ".jpeg", ".png", ".pdf"]
    const ext = path.extname(file.originalname).toLowerCase()

    if (allowedTypes.includes(ext)) {
      cb(null, true)
    } else {
      cb(new Error("Invalid file type. Only JPG, JPEG, PNG, and PDF files are allowed."))
    }
  },
})

// Auth routes
router.post("/register", upload.single("driverLicense"), authController.register)
router.post("/login/password", authController.loginWithPassword)
router.post("/login/otp/request", authController.requestLoginOTP)
router.post("/login/otp/verify", authController.loginWithOTP)
router.post("/verify-otp", authController.verifyOTP)
router.post("/resend-otp", authController.resendOTP)
router.post("/admin/login", authController.adminLogin)
router.post("/forgot-password", authController.forgotPassword)
router.post("/reset-password", authController.resetPassword)

module.exports = router
