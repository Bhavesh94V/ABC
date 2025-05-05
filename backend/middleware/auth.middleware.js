const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

// Authenticate JWT token
exports.authenticateToken = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(" ")[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Find user
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Attach user to request
    req.user = {
      id: user._id,
      role: user.role,
    }

    next()
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      })
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
      })
    }

    console.error("Authentication error:", error)
    res.status(500).json({
      success: false,
      message: "Authentication failed",
      error: error.message,
    })
  }
}

// Check if user is admin
exports.isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin role required.",
    })
  }

  next()
}

// Check if user is driver
exports.isDriver = (req, res, next) => {
  if (req.user.role !== "driver") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Driver role required.",
    })
  }

  next()
}

// Check if user is customer
exports.isCustomer = (req, res, next) => {
  if (req.user.role !== "customer") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Customer role required.",
    })
  }

  next()
}

// Check if user is owner of the resource or admin
exports.isOwnerOrAdmin = async (req, res, next) => {
  const resourceId = req.params.id

  if (req.user.id.toString() === resourceId || req.user.role === "admin") {
    return next()
  }

  res.status(403).json({
    success: false,
    message: "Access denied. You don't have permission to access this resource.",
  })
}
