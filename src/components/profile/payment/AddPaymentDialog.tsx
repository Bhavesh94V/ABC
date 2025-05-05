"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import PaymentMethodForm from "./PaymentMethodForm"
import type { PaymentMethodFormData } from "@/types/payment"

interface AddPaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  paymentData: PaymentMethodFormData
  onChangePaymentData: (data: Partial<PaymentMethodFormData>) => void
  onAddPayment: () => void
}

const AddPaymentDialog: React.FC<AddPaymentDialogProps> = ({
  open,
  onOpenChange,
  paymentData,
  onChangePaymentData,
  onAddPayment,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
          <DialogDescription>Enter your payment details to add a new payment method</DialogDescription>
        </DialogHeader>

        <PaymentMethodForm paymentData={paymentData} onChangePaymentData={onChangePaymentData} />

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onAddPayment} className="bg-green-nexus-600 hover:bg-green-nexus-700">
            Add Payment Method
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddPaymentDialog
