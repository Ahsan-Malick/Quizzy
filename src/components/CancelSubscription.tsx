"use client"

import { useState } from "react"
import { AlertTriangle, CheckCircle } from "lucide-react"
import { Button } from "./ui/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { useStore } from "../store/store"

interface CancelSubscriptionDialogProps {
  userPlan?: string|null
  email?: string
  onCancelled?: () => void
}

function CancelSubscription({ userPlan, email, onCancelled }: CancelSubscriptionDialogProps) {
  const [confirmText, setConfirmText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [open, setOpen] = useState(false)

  const isConfirmDisabled = confirmText.toLowerCase() !== "cancel subscription"
  const [cancelling, setCancelling] = useState<boolean|undefined>(false)
  const user = useStore((state) => state.userDetail)
  const cancel_at_period_end = user?.cancel_at_period_end

  const handleCancel = async () => {
    if (isConfirmDisabled) return

    setIsProcessing(true)

    // Simulate API call to cancel subscription
    await fetch(`${import.meta.env.VITE_API_URL}/stripe/cancel-subscription?email=${email}`, {
      method: "POST",
    })

    setIsProcessing(false)
    setShowSuccess(true)
    setCancelling(cancel_at_period_end)
    alert("Subscription cancelled")
    

    if (onCancelled) {
      onCancelled()
    }
  }

  const resetDialog = () => {
    setConfirmText("")
    setShowSuccess(false)
  }

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    if (!open) {
      resetDialog()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={cancel_at_period_end?true:false} className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
          Cancel Subscription
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        {!showSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Cancel Your {userPlan === "premium" ? "Premium" : "Pro"} Subscription
              </DialogTitle>
              <DialogDescription>
                You're about to cancel your {userPlan === "premium" ? "Premium" : "Pro"} subscription. This action will
                downgrade your account to the Free plan at the end of your current billing period.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">

              <div className="space-y-2">
                <Label htmlFor="confirm-cancel">
                  Type <span className="font-medium">cancel subscription</span> to confirm:
                </Label>
                <Input
                  id="confirm-cancel"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="cancel subscription"
                  className="w-full"
                />
              </div>
            </div>

            <DialogFooter >
              <Button
                type="button"
                variant="destructive"
                disabled={isConfirmDisabled || isProcessing}
                onClick={handleCancel}
                className="mt-2 sm:mt-0 bg-blue-500"
              >
                {isProcessing ? "Processing..." : "Cancel Subscription"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Subscription Cancelled
              </DialogTitle>
              <DialogDescription>Your subscription has been successfully cancelled.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="rounded-md bg-green-50 p-4">
                <div className="flex">
                  <div className="text-green-800">
                    <p className="text-sm">
                      You'll continue to have access to {userPlan === "premium" ? "Premium" : "Pro"} features until the
                      end of your current billing period. After that, your account will be downgraded to the Free plan.
                    </p>
                    <p className="mt-2 text-sm">You can resubscribe at any time if you change your mind.</p>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" onClick={() => setOpen(false)} className="w-full">
                Close
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CancelSubscription;
