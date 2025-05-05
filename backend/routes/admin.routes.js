const express = require("express")
const router = express.Router()
const { authenticateToken, isAdmin } = require("../middleware/auth.middleware")
const adminController = require("../controllers/admin.controller")

// Admin routes - all require admin role
router.use(authenticateToken)
router.use(isAdmin)

// User management
router.get("/users", adminController.getAllUsers)
router.get("/users/:id", adminController.getUserById)
router.put("/users/:id", adminController.updateUser)
router.delete("/users/:id", adminController.deleteUser)

// Driver management
router.get("/drivers", adminController.getAllDrivers)
router.get("/drivers/pending", adminController.getPendingDrivers)
router.put("/drivers/:id/approve", adminController.approveDriver)
router.put("/drivers/:id/reject", adminController.rejectDriver)

// Statistics and dashboard
router.get("/stats", adminController.getStats)

module.exports = router
