export type PaymentMethod = "cash" | "card" | "upi" | "wallet"

export interface CardDetails {
  id: string
  cardNumber: string
  nameOnCard: string
  expiryMonth: string
  expiryYear: string
  isDefault: boolean
  cardType: "visa" | "mastercard" | "amex" | "rupay" | "other"
}

export interface UPIDetails {
  id: string
  upiId: string
  isDefault: boolean
  provider: "gpay" | "phonepe" | "paytm" | "bhim" | "other"
}

export interface WalletDetails {
  id: string
  provider: "paytm" | "phonepe" | "amazon" | "other"
  balance: number
  isDefault: boolean
}

export interface PaymentMethodDetails {
  id: string
  userId: string
  type: PaymentMethod
  details: CardDetails | UPIDetails | WalletDetails | null
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}
