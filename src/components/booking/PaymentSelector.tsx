"use client"

import type React from "react"
import { useState } from "react"
import { CreditCard, PlusCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface PaymentMethod {
  id: string
  type: string
  cardNumber?: string
  cardName?: string
  expiryDate?: string
  isDefault: boolean
}

interface PaymentSelectorProps {
  paymentMethods: PaymentMethod[]
  paymentMethod: string
  setPaymentMethod: (paymentId: string) => void
  setPaymentMethods: React.Dispatch<React.SetStateAction<PaymentMethod[]>>
  selectedRideOption: {
    id: string
    name: string
    price: number
  } | null
  onConfirmRide: () => void
}

const PaymentSelector: React.FC<PaymentSelectorProps> = ({
  paymentMethods,
  paymentMethod,
  setPaymentMethod,
  setPaymentMethods,
  selectedRideOption,
  onConfirmRide,
}) => {
  const { toast } = useToast()
  const [showAddPaymentDialog, setShowAddPaymentDialog] = useState(false)
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: "credit",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })

  const handleAddPayment = () => {
    if (newPaymentMethod.type === "credit" || newPaymentMethod.type === "debit") {
      // Validate card details
      if (
        !newPaymentMethod.cardNumber ||
        !newPaymentMethod.cardName ||
        !newPaymentMethod.expiryDate ||
        !newPaymentMethod.cvv
      ) {
        toast({
          title: "Error",
          description: "Please fill in all card details",
          variant: "destructive",
        })
        return
      }
    } else if (newPaymentMethod.type === "upi") {
      // Validate UPI ID
      if (!newPaymentMethod.cardName) {
        toast({
          title: "Error",
          description: "Please enter a valid UPI ID",
          variant: "destructive",
        })
        return
      }
    }

    // Create a new payment method
    const newPayment: PaymentMethod = {
      id: `payment-${Date.now()}`,
      type: newPaymentMethod.type,
      cardNumber: newPaymentMethod.type === "upi" ? undefined : `•••• ${newPaymentMethod.cardNumber.slice(-4)}`,
      cardName: newPaymentMethod.cardName,
      expiryDate: newPaymentMethod.type === "upi" ? undefined : newPaymentMethod.expiryDate,
      isDefault: false,
    }

    setPaymentMethods((prev) => [...prev, newPayment])
    setPaymentMethod(newPayment.id)

    // Reset form
    setNewPaymentMethod({
      type: "credit",
      cardNumber: "",
      cardName: "",
      expiryDate: "",
      cvv: "",
    })

    setShowAddPaymentDialog(false)

    toast({
      title: "Success",
      description: "New payment method added successfully",
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="font-medium flex items-center text-gray-900 dark:text-white">
          Payment Method <Info className="h-4 w-4 ml-1 text-gray-400" />
        </h4>
        <div className="space-y-2">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`flex items-center justify-between p-3 border rounded-lg transition-colors cursor-pointer
                ${
                  paymentMethod === method.id
                    ? "border-green-nexus-500 bg-green-nexus-50/50 dark:bg-green-nexus-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-green-nexus-300 dark:hover:border-green-nexus-700"
                }`}
              onClick={() => setPaymentMethod(method.id)}
            >
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{method.cardName}</div>
                  {method.cardNumber && <div className="text-xs text-gray-500">{method.cardNumber}</div>}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 rounded-full border-2 border-green-nexus-500 flex items-center justify-center">
                  {paymentMethod === method.id && <div className="h-2 w-2 rounded-full bg-green-nexus-500"></div>}
                </div>
              </div>
            </div>
          ))}

          <Dialog open={showAddPaymentDialog} onOpenChange={setShowAddPaymentDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <PlusCircle className="h-4 w-4" /> Add New Payment Method
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Payment Method</DialogTitle>
                <DialogDescription>Enter your payment details to add a new payment method</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <Tabs
                  defaultValue="credit"
                  onValueChange={(value) => setNewPaymentMethod((prev) => ({ ...prev, type: value }))}
                >
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="credit">Credit Card</TabsTrigger>
                    <TabsTrigger value="debit">Debit Card</TabsTrigger>
                    <TabsTrigger value="upi">UPI</TabsTrigger>
                  </TabsList>

                  <TabsContent value="credit" className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Card Number</label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={newPaymentMethod.cardNumber}
                        onChange={(e) => setNewPaymentMethod((prev) => ({ ...prev, cardNumber: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Card Holder Name</label>
                      <Input
                        placeholder="John Doe"
                        value={newPaymentMethod.cardName}
                        onChange={(e) => setNewPaymentMethod((prev) => ({ ...prev, cardName: e.target.value }))}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Expiry Date</label>
                        <Input
                          placeholder="MM/YY"
                          value={newPaymentMethod.expiryDate}
                          onChange={(e) => setNewPaymentMethod((prev) => ({ ...prev, expiryDate: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">CVV</label>
                        <Input
                          placeholder="123"
                          type="password"
                          maxLength={3}
                          value={newPaymentMethod.cvv}
                          onChange={(e) => setNewPaymentMethod((prev) => ({ ...prev, cvv: e.target.value }))}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="debit" className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Card Number</label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={newPaymentMethod.cardNumber}
                        onChange={(e) => setNewPaymentMethod((prev) => ({ ...prev, cardNumber: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Card Holder Name</label>
                      <Input
                        placeholder="John Doe"
                        value={newPaymentMethod.cardName}
                        onChange={(e) => setNewPaymentMethod((prev) => ({ ...prev, cardName: e.target.value }))}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Expiry Date</label>
                        <Input
                          placeholder="MM/YY"
                          value={newPaymentMethod.expiryDate}
                          onChange={(e) => setNewPaymentMethod((prev) => ({ ...prev, expiryDate: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">CVV</label>
                        <Input
                          placeholder="123"
                          type="password"
                          maxLength={3}
                          value={newPaymentMethod.cvv}
                          onChange={(e) => setNewPaymentMethod((prev) => ({ ...prev, cvv: e.target.value }))}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="upi" className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">UPI ID</label>
                      <Input
                        placeholder="name@upi"
                        value={newPaymentMethod.cardName}
                        onChange={(e) => setNewPaymentMethod((prev) => ({ ...prev, cardName: e.target.value }))}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddPaymentDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddPayment} className="bg-green-nexus-600 hover:bg-green-nexus-700">
                  Add Payment Method
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {selectedRideOption && (
        <Button onClick={onConfirmRide} className="w-full bg-green-nexus-600 hover:bg-green-nexus-700">
          Confirm {selectedRideOption.name} (₹{selectedRideOption.price})
        </Button>
      )}
    </div>
  )
}

export default PaymentSelector
