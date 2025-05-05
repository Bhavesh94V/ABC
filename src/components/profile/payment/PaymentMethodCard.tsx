"use client"

import type React from "react"
import { CreditCard, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { PaymentMethod } from "@/types/payment"

interface PaymentMethodCardProps {
  method: PaymentMethod
  isDefault: boolean
  onSetDefault: (id: string) => void
  onRemove: (id: string) => void
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({ method, isDefault, onSetDefault, onRemove }) => {
  return (
    <div
      key={method.id}
      className={`border rounded-lg p-4 transition-colors
        ${
          isDefault
            ? "border-green-nexus-500 bg-green-nexus-50/50 dark:bg-green-nexus-900/20"
            : "border-gray-200 dark:border-gray-700"
        }`}
    >
      <div className="flex justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <CreditCard className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">{method.cardName}</div>
            {method.cardNumber && <div className="text-xs text-gray-500">{method.cardNumber}</div>}
            {method.expiryDate && <div className="text-xs text-gray-500">Expires: {method.expiryDate}</div>}
            {isDefault && (
              <div className="text-xs text-green-nexus-600 dark:text-green-nexus-400 font-medium mt-1">Default</div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {!isDefault && (
            <>
              <Button variant="outline" size="sm" onClick={() => onSetDefault(method.id)}>
                Set Default
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                onClick={() => onRemove(method.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default PaymentMethodCard
