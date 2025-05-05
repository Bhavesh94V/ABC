const User = require("../models/user.model")

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query

    // Build query
    const query = {}

    if (role) {
      query.role = role
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ]
    }

    // Execute query with pagination
    const users = await User.find(query)
      .select("-password")
      .limit(Number.parseInt(limit))
      .skip((Number.parseInt(page) - 1) * Number.parseInt(limit))
      .sort({ createdAt: -1 })

    // Get total count
    const total = await User.countDocuments(query)

    res.status(200).json({
      success: true,
      data: {
        users,
        totalPages: Math.ceil(total / limit),
        currentPage: Number.parseInt(page),
        total,
      },
    })
  } catch (error) {
    console.error("Get all users error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get users",
      error: error.message,
    })
  }
}

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    console.error("Get user by ID error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get user",
      error: error.message,
    })
  }
}

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone, role, isVerified, isApproved } = req.body

    // Check if email or phone already exists
    if (email || phone) {
      const existingUser = await User.findOne({
        $and: [{ _id: { $ne: req.params.id } }, { $or: [{ email: email || "" }, { phone: phone || "" }] }],
      })

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email or phone number already in use",
        })
      }
    }

    // Update user
    const updateData = {}
    if (name) updateData.name = name
    if (email) updateData.email = email
    if (phone) updateData.phone = phone
    if (role) updateData.role = role
    if (isVerified !== undefined) updateData.isVerified = isVerified
    if (isApproved !== undefined) updateData.isApproved = isApproved

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true },
    ).select("-password")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    })
  } catch (error) {
    console.error("Update user error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    })
  }
}

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    })
  } catch (error) {
    console.error("Delete user error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    })
  }
}

// Get all drivers
exports.getAllDrivers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, isApproved } = req.query

    // Build query
    const query = { role: "driver" }

    if (isApproved !== undefined) {
      query.isApproved = isApproved === "true"
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { vehicleNumber: { $regex: search, $options: "i" } },
      ]
    }

    // Execute query with pagination
    const drivers = await User.find(query)
      .select("-password")
      .limit(Number.parseInt(limit))
      .skip((Number.parseInt(page) - 1) * Number.parseInt(limit))
      .sort({ createdAt: -1 })

    // Get total count
    const total = await User.countDocuments(query)

    res.status(200).json({
      success: true,
      data: {
        drivers,
        totalPages: Math.ceil(total / limit),
        currentPage: Number.parseInt(page),
        total,
      },
    })
  } catch (error) {
    console.error("Get all drivers error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get drivers",
      error: error.message,
    })
  }
}

// Get pending drivers
exports.getPendingDrivers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query

    // Query for pending drivers
    const query = {
      role: "driver",
      isApproved: false,
      isVerified: true,
    }

    // Execute query with pagination
    const drivers = await User.find(query)
      .select("-password")
      .limit(Number.parseInt(limit))
      .skip((Number.parseInt(page) - 1) * Number.parseInt(limit))
      .sort({ createdAt: -1 })

    // Get total count
    const total = await User.countDocuments(query)

    res.status(200).json({
      success: true,
      data: {
        drivers,
        totalPages: Math.ceil(total / limit),
        currentPage: Number.parseInt(page),
        total,
      },
    })
  } catch (error) {
    console.error("Get pending drivers error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get pending drivers",
      error: error.message,
    })
  }
}

// Approve driver
exports.approveDriver = async (req, res) => {
  try {
    const driver = await User.findOneAndUpdate(
      { _id: req.params.id, role: "driver" },
      { $set: { isApproved: true } },
      { new: true },
    ).select("-password")

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      })
    }

    // TODO: Send notification to driver about approval

    res.status(200).json({
      success: true,
      message: "Driver approved successfully",
      data: driver,
    })
  } catch (error) {
    console.error("Approve driver error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to approve driver",
      error: error.message,
    })
  }
}

// Reject driver
exports.rejectDriver = async (req, res) => {
  try {
    const { reason } = req.body

    const driver = await User.findOneAndUpdate(
      { _id: req.params.id, role: "driver" },
      { $set: { isApproved: false } },
      { new: true },
    ).select("-password")

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      })
    }

    // TODO: Send notification to driver about rejection with reason

    res.status(200).json({
      success: true,
      message: "Driver rejected successfully",
      data: driver,
    })
  } catch (error) {
    console.error("Reject driver error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to reject driver",
      error: error.message,
    })
  }
}

// Get statistics for admin dashboard
exports.getStats = async (req, res) => {
  try {
    // Get user counts by role
    const totalCustomers = await User.countDocuments({ role: "customer" })
    const totalDrivers = await User.countDocuments({ role: "driver" })
    const pendingDrivers = await User.countDocuments({ role: "driver", isApproved: false, isVerified: true })
    const approvedDrivers = await User.countDocuments({ role: "driver", isApproved: true })

    // Get new users in last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const newCustomers = await User.countDocuments({
      role: "customer",
      createdAt: { $gte: thirtyDaysAgo },
    })

    const newDrivers = await User.countDocuments({
      role: "driver",
      createdAt: { $gte: thirtyDaysAgo },
    })

    // Get recent users
    const recentUsers = await User.find()
      .select("name email phone role createdAt isVerified isApproved")
      .sort({ createdAt: -1 })
      .limit(10)

    res.status(200).json({
      success: true,
      data: {
        userCounts: {
          totalCustomers,
          totalDrivers,
          pendingDrivers,
          approvedDrivers,
          total: totalCustomers + totalDrivers,
        },
        newUsers: {
          customers: newCustomers,
          drivers: newDrivers,
          total: newCustomers + newDrivers,
        },
        recentUsers,
      },
    })
  } catch (error) {
    console.error("Get stats error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get statistics",
      error: error.message,
    })
  }
}
