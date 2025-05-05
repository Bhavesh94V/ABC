"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { PaymentMethodFormData } from "@/types/payment"

interface PaymentMethodFormProps {
  paymentData: PaymentMethodFormData
  onChangePaymentData: (data: Partial<PaymentMethodFormData>) => void
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({ paymentData, onChangePaymentData }) => {
  return (
    <div className="grid gap-4 py-4">
      <Tabs defaultValue="credit" onValueChange={(value) => onChangePaymentData({ type: value as any })}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="credit">Credit Card</TabsTrigger>
          <TabsTrigger value="debit">Debit Card</TabsTrigger>
          <TabsTrigger value="upi">UPI</TabsTrigger>
        </TabsList>

        {(paymentData.type === "credit" || paymentData.type === "debit") && (
          <TabsContent value={paymentData.type} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Card Number</label>
              <Input
                placeholder="1234 5678 9012 3456"
                value={paymentData.cardNumber}
                onChange={(e) => onChangePaymentData({ cardNumber: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Card Holder Name</label>
              <Input
                placeholder="John Doe"
                value={paymentData.cardName}
                onChange={(e) => onChangePaymentData({ cardName: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Expiry Date</label>
                <Input
                  placeholder="MM/YY"
                  value={paymentData.expiryDate}
                  onChange={(e) => onChangePaymentData({ expiryDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">CVV</label>
                <Input
                  placeholder="123"
                  type="password"
                  maxLength={3}
                  value={paymentData.cvv}
                  onChange={(e) => onChangePaymentData({ cvv: e.target.value })}
                />
              </div>
            </div>
          </TabsContent>
        )}

        <TabsContent value="upi" className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">UPI ID</label>
            <Input
              placeholder="name@upi"
              value={paymentData.cardName}
              onChange={(e) => onChangePaymentData({ cardName: e.target.value })}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PaymentMethodForm
