"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"

interface PaymentMethod {
  id: string
  type: "card" | "upi" | "wallet"
  name: string
  details: string
  isDefault: boolean
}

const PaymentMethodManager: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "pm1",
      type: "card",
      name: "HDFC Credit Card",
      details: "•••• •••• •••• 4242",
      isDefault: true,
    },
    {
      id: "pm2",
      type: "upi",
      name: "Google Pay",
      details: "user@okicici",
      isDefault: false,
    },
  ])

  const [isAddingPayment, setIsAddingPayment] = useState(false)

  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      })),
    )
  }

  const removePaymentMethod = (id: string) => {
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                method.isDefault ? "border-primary bg-primary/5" : "border-border"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {method.type === "card" && <span className="text-primary">💳</span>}
                  {method.type === "upi" && <span className="text-primary">📱</span>}
                  {method.type === "wallet" && <span className="text-primary">👛</span>}
                </div>
                <div>
                  <p className="font-medium">{method.name}</p>
                  <p className="text-sm text-muted-foreground">{method.details}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!method.isDefault && (
                  <Button variant="outline" size="sm" onClick={() => setDefaultPaymentMethod(method.id)}>
                    Set Default
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => removePaymentMethod(method.id)}>
                  Remove
                </Button>
              </div>
            </div>
          ))}

          <Dialog open={isAddingPayment} onOpenChange={setIsAddingPayment}>
            <DialogTrigger asChild>
              <Button className="w-full" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Payment Method</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <p className="text-center text-muted-foreground">Payment method form would go here</p>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddingPayment(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddingPayment(false)}>Add Payment Method</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}

export default PaymentMethodManager
