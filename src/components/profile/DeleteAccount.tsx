"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const DeleteAccount = () => {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmation, setConfirmation] = useState("")
  const [step, setStep] = useState(1)

  const handleDeleteAccount = () => {
    setIsDeleting(true)

    // Simulate API call to delete account
    setTimeout(() => {
      setIsDeleting(false)
      toast({
        title: "Account Deletion Initiated",
        description:
          "Your account will be permanently deleted within 7 days. You can cancel this request by logging in again during this period.",
      })

      // Log the user out after account deletion is initiated
      logout()

      // Redirect to home page
      navigate("/")
    }, 2000)
  }

  const canProceedToStep2 = confirmation.toLowerCase() === "delete"
  const canDeleteAccount = confirmation.toLowerCase() === user?.email?.toLowerCase()

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-900/20 rounded-lg">
      <div className="flex items-start">
        <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mr-4">
          <Trash className="h-5 w-5 text-red-600 dark:text-red-500" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Delete Account</h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Once you delete your account, all your data will be permanently removed. This action cannot be undone.
          </p>
        </div>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="sm">
            Delete Account
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Your Account</AlertDialogTitle>
            <AlertDialogDescription>
              {step === 1 ? (
                <div className="space-y-4">
                  <p>Before deleting your account, please understand:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>All your personal data will be permanently deleted</li>
                    <li>Your ride history and payment information will be removed</li>
                    <li>Your account will be permanently deleted within 7 days</li>
                    <li>You can cancel this request by logging in again during this period</li>
                  </ul>
                  <div className="pt-2">
                    <p className="font-medium text-sm">To proceed, type "delete" below:</p>
                    <Input
                      value={confirmation}
                      onChange={(e) => setConfirmation(e.target.value)}
                      className="mt-2"
                      placeholder="Type 'delete' to confirm"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="font-medium text-red-600 dark:text-red-400">Final confirmation required</p>
                  <p>This is an irreversible action. To confirm account deletion, please enter your email address:</p>
                  <Input
                    value={confirmation}
                    onChange={(e) => setConfirmation(e.target.value)}
                    placeholder={user?.email || "your@email.com"}
                  />
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setStep(1)
                setConfirmation("")
              }}
            >
              Cancel
            </AlertDialogCancel>
            {step === 1 ? (
              <Button
                variant="destructive"
                disabled={!canProceedToStep2}
                onClick={() => {
                  setStep(2)
                  setConfirmation("")
                }}
              >
                Continue
              </Button>
            ) : (
              <Button variant="destructive" disabled={!canDeleteAccount || isDeleting} onClick={handleDeleteAccount}>
                {isDeleting ? "Deleting..." : "Delete My Account"}
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default DeleteAccount
