const User = require("../models/user.model")
const bcrypt = require("bcryptjs")

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password")

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
    console.error("Get profile error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get profile",
      error: error.message,
    })
  }
}

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone } = req.body

    // Check if email or phone already exists
    if (email || phone) {
      const existingUser = await User.findOne({
        $and: [{ _id: { $ne: req.user.id } }, { $or: [{ email: email || "" }, { phone: phone || "" }] }],
      })

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email or phone number already in use",
        })
      }
    }

    // Update profile
    const updateData = { name, email, phone }

    // Add profile picture if uploaded
    if (req.file) {
      updateData.profilePicture = req.file.path
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true, runValidators: true },
    ).select("-password")

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    })
  } catch (error) {
    console.error("Update profile error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: error.message,
    })
  }
}

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      })
    }

    // Get user with password
    const user = await User.findById(req.user.id)

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      })
    }

    // Update password
    user.password = newPassword
    await user.save()

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    })
  } catch (error) {
    console.error("Change password error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to change password",
      error: error.message,
    })
  }
}

// Get saved locations
exports.getSavedLocations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("savedLocations")

    res.status(200).json({
      success: true,
      data: user.savedLocations,
    })
  } catch (error) {
    console.error("Get saved locations error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get saved locations",
      error: error.message,
    })
  }
}

// Add saved location
exports.addSavedLocation = async (req, res) => {
  try {
    const { name, address, lat, lng, type } = req.body

    // Validate input
    if (!name || !address || !lat || !lng) {
      return res.status(400).json({
        success: false,
        message: "Name, address, latitude, and longitude are required",
      })
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          savedLocations: { name, address, lat, lng, type: type || "other" },
        },
      },
      { new: true },
    ).select("savedLocations")

    res.status(201).json({
      success: true,
      message: "Location saved successfully",
      data: user.savedLocations,
    })
  } catch (error) {
    console.error("Add saved location error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to save location",
      error: error.message,
    })
  }
}

// Update saved location
exports.updateSavedLocation = async (req, res) => {
  try {
    const { name, address, lat, lng, type } = req.body
    const locationId = req.params.id

    const user = await User.findOneAndUpdate(
      {
        _id: req.user.id,
        "savedLocations._id": locationId,
      },
      {
        $set: {
          "savedLocations.$.name": name,
          "savedLocations.$.address": address,
          "savedLocations.$.lat": lat,
          "savedLocations.$.lng": lng,
          "savedLocations.$.type": type,
        },
      },
      { new: true },
    ).select("savedLocations")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Location updated successfully",
      data: user.savedLocations,
    })
  } catch (error) {
    console.error("Update saved location error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to update location",
      error: error.message,
    })
  }
}

// Delete saved location
exports.deleteSavedLocation = async (req, res) => {
  try {
    const locationId = req.params.id

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: {
          savedLocations: { _id: locationId },
        },
      },
      { new: true },
    ).select("savedLocations")

    res.status(200).json({
      success: true,
      message: "Location deleted successfully",
      data: user.savedLocations,
    })
  } catch (error) {
    console.error("Delete saved location error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to delete location",
      error: error.message,
    })
  }
}

// Get payment methods
exports.getPaymentMethods = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("paymentMethods")

    res.status(200).json({
      success: true,
      data: user.paymentMethods,
    })
  } catch (error) {
    console.error("Get payment methods error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to get payment methods",
      error: error.message,
    })
  }
}

// Add payment method
exports.addPaymentMethod = async (req, res) => {
  try {
    const { type, cardNumber, cardName, expiryDate, upiId } = req.body

    // Validate input based on payment type
    if (type === "credit" || type === "debit") {
      if (!cardNumber || !cardName || !expiryDate) {
        return res.status(400).json({
          success: false,
          message: "Card number, name, and expiry date are required for card payments",
        })
      }
    } else if (type === "upi" && !upiId) {
      return res.status(400).json({
        success: false,
        message: "UPI ID is required for UPI payments",
      })
    }

    // Check if this is the first payment method (make it default)
    const user = await User.findById(req.user.id).select("paymentMethods")
    const isDefault = user.paymentMethods.length === 0

    // Add payment method
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $push: {
          paymentMethods: {
            type,
            cardNumber,
            cardName,
            expiryDate,
            upiId,
            isDefault,
          },
        },
      },
      { new: true },
    ).select("paymentMethods")

    res.status(201).json({
      success: true,
      message: "Payment method added successfully",
      data: updatedUser.paymentMethods,
    })
  } catch (error) {
    console.error("Add payment method error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to add payment method",
      error: error.message,
    })
  }
}

// Update payment method
exports.updatePaymentMethod = async (req, res) => {
  try {
    const { type, cardNumber, cardName, expiryDate, upiId, isDefault } = req.body
    const paymentId = req.params.id

    // If setting as default, unset other default methods
    if (isDefault) {
      await User.updateOne({ _id: req.user.id }, { $set: { "paymentMethods.$[].isDefault": false } })
    }

    // Update the payment method
    const updateFields = {}
    if (type) updateFields["paymentMethods.$.type"] = type
    if (cardNumber) updateFields["paymentMethods.$.cardNumber"] = cardNumber
    if (cardName) updateFields["paymentMethods.$.cardName"] = cardName
    if (expiryDate) updateFields["paymentMethods.$.expiryDate"] = expiryDate
    if (upiId) updateFields["paymentMethods.$.upiId"] = upiId
    if (isDefault !== undefined) updateFields["paymentMethods.$.isDefault"] = isDefault

    const user = await User.findOneAndUpdate(
      {
        _id: req.user.id,
        "paymentMethods._id": paymentId,
      },
      { $set: updateFields },
      { new: true },
    ).select("paymentMethods")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Payment method not found",
      })
    }

    res.status(200).json({
      success: true,
      message: "Payment method updated successfully",
      data: user.paymentMethods,
    })
  } catch (error) {
    console.error("Update payment method error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to update payment method",
      error: error.message,
    })
  }
}

// Delete payment method
exports.deletePaymentMethod = async (req, res) => {
  try {
    const paymentId = req.params.id

    // Check if it's the default payment method
    const user = await User.findOne({
      _id: req.user.id,
      "paymentMethods._id": paymentId,
    })

    const paymentMethod = user.paymentMethods.find((method) => method._id.toString() === paymentId)

    if (!paymentMethod) {
      return res.status(404).json({
        success: false,
        message: "Payment method not found",
      })
    }

    // Delete the payment method
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $pull: {
          paymentMethods: { _id: paymentId },
        },
      },
      { new: true },
    ).select("paymentMethods")

    // If deleted method was default and other methods exist, make another one default
    if (paymentMethod.isDefault && updatedUser.paymentMethods.length > 0) {
      updatedUser.paymentMethods[0].isDefault = true
      await updatedUser.save()
    }

    res.status(200).json({
      success: true,
      message: "Payment method deleted successfully",
      data: updatedUser.paymentMethods,
    })
  } catch (error) {
    console.error("Delete payment method error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to delete payment method",
      error: error.message,
    })
  }
}

// Update user preferences
exports.updatePreferences = async (req, res) => {
  try {
    const { language, theme, notifications } = req.body

    const updateData = {}

    if (language) updateData["preferences.language"] = language
    if (theme) updateData["preferences.theme"] = theme
    if (notifications) {
      if (notifications.email !== undefined) updateData["preferences.notifications.email"] = notifications.email
      if (notifications.sms !== undefined) updateData["preferences.notifications.sms"] = notifications.sms
      if (notifications.push !== undefined) updateData["preferences.notifications.push"] = notifications.push
    }

    const user = await User.findByIdAndUpdate(req.user.id, { $set: updateData }, { new: true }).select("preferences")

    res.status(200).json({
      success: true,
      message: "Preferences updated successfully",
      data: user.preferences,
    })
  } catch (error) {
    console.error("Update preferences error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to update preferences",
      error: error.message,
    })
  }
}
