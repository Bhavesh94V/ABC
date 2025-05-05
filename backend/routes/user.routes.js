const express = require("express")
const router = express.Router()
const multer = require("multer")
const { v4: uuidv4 } = require("uuid")
const { authenticateToken, isOwnerOrAdmin } = require("../middleware/auth.middleware")
const userController = require("../controllers/user.controller")

// Set up multer for profile picture uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profiles/")
  },
  filename: (req, file, cb) => {
    const uniqueFilename = `${uuidv4()}-${file.originalname}`
    cb(null, uniqueFilename)
  },
})

const upload = multer({ storage })

// User routes
router.get("/profile", authenticateToken, userController.getProfile)
router.put("/profile", authenticateToken, upload.single("profilePicture"), userController.updateProfile)
router.put("/password", authenticateToken, userController.changePassword)
router.get("/saved-locations", authenticateToken, userController.getSavedLocations)
router.post("/saved-locations", authenticateToken, userController.addSavedLocation)
router.put("/saved-locations/:id", authenticateToken, userController.updateSavedLocation)
router.delete("/saved-locations/:id", authenticateToken, userController.deleteSavedLocation)
router.get("/payment-methods", authenticateToken, userController.getPaymentMethods)
router.post("/payment-methods", authenticateToken, userController.addPaymentMethod)
router.put("/payment-methods/:id", authenticateToken, userController.updatePaymentMethod)
router.delete("/payment-methods/:id", authenticateToken, userController.deletePaymentMethod)
router.put("/preferences", authenticateToken, userController.updatePreferences)

module.exports = router
