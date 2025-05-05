"use client"

import type React from "react"
import { CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyPaymentStateProps {
  onAddPayment: () => void
}

const EmptyPaymentState: React.FC<EmptyPaymentStateProps> = ({ onAddPayment }) => {
  return (
    <div className="text-center py-12 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
      <CreditCard className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No payment methods</h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto mb-4">
        Add a payment method to make your booking process smoother
      </p>
      <Button onClick={onAddPayment}>Add Your First Payment Method</Button>
    </div>
  )
}

export default EmptyPaymentState
