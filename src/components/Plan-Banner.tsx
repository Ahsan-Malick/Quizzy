"use client"

import type React from "react"

import { useState } from "react"
import { Sparkles, X, ChevronRight, Check } from "lucide-react"
import { Button } from "./Button"   
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Link } from "react-router-dom"
import CancelSubscription from "./CancelSubscription"

interface PlanBannerProps {
  userPlan: string
  email: string
  userName?: string
}

export function PlanBanner({ userPlan, email, userName }: PlanBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const plans = {
    Free: {
      name: "Free Plan",
      color: "bg-blue-100 border-blue-200",
      textColor: "text-blue-700",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      icon: <Sparkles className="h-5 w-5 text-blue-500" />,
      message: "Upgrade to unlock premium features",
      showUpgrade: true,
    },
    Geek: {
      name: "Geek",
      color: "bg-purple-100 border-purple-200",
      textColor: "text-purple-700",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      icon: <Sparkles className="h-5 w-5 text-purple-500" />,
      message: "You're enjoying enhanced features",
      showUpgrade: false,
    },
    // premium: {
    //   name: "Premium Plan",
    //   color: "bg-amber-100 border-amber-200",
    //   textColor: "text-amber-700",
    //   buttonColor: "bg-amber-600 hover:bg-amber-700",
    //   icon: <Sparkles className="h-5 w-5 text-amber-500" />,
    //   message: "You have access to all features",
    //   showUpgrade: false,
    // },
  }

  const currentPlan = plans[userPlan as keyof typeof plans]

  return (
    <div className={`relative mt-4 mb-8 rounded-lg border p-4 shadow-sm ${currentPlan.color}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {currentPlan.icon}
          <span className={`font-medium ${currentPlan.textColor}`}>{currentPlan.name}</span>
        </div>
        {/* <button
          onClick={() => setIsVisible(false)}
          className="rounded-full p-1 hover:bg-white/20"
          aria-label="Close banner"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button> */}
      </div>

      <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-sm ${currentPlan.textColor}`}>
          {userName ? `Hi ${userName}, ` : ""}
          {currentPlan.message}
        </p>

        {currentPlan.showUpgrade ? (
          <PlanUpgradeDialog email={email}>
            <Button size="sm" className={`mt-2 sm:mt-0 ${currentPlan.buttonColor} text-white`}>
              Upgrade Now
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </PlanUpgradeDialog>
        ) : (
          <CancelSubscription email={email}/>
        )}
      </div>
    </div>
  )
}

function PlanUpgradeDialog({ children, email }: { children: React.ReactNode, email: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose Your Plan</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <PlanCard
              name="Geek"
              price="$2.99"
              period="/month"
              features={["Unlimited quizzes", "Advanced analytics", "Custom branding", "Priority support"]}
              color="bg-purple-600"
              email={email}
            />

            <PlanCard
              name="Custom"
            //   price="$19.99"
            //   period="month"
              features={[
                "Everything in Pro",
                "Team collaboration",
                "API access",
                "White-label solution",
                "Dedicated account manager",
              ]}
              color="bg-amber-600"
              email={email}
            //   recommended
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface PlanCardProps {
  name: string
  price?: string
  period?: string
  features: string[]
  color: string
  email: string
  recommended?: boolean
}

function PlanCard({ name, price, period, features, color, recommended, email }: PlanCardProps) {

const handleUpgrade = async () => {
await fetch(`${import.meta.env.VITE_API_URL}/stripe/create-checkout-session?email=${email}`, {
  method: "POST",
}) 
}

  return (
    <div className={`relative rounded-lg border p-4 shadow-sm ${recommended ? "ring-2 ring-purple-500" : ""}`}>
      {recommended && (
        <div className="absolute -top-2 right-4 rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-800">
          Recommended
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-lg font-medium">{name}</h3>
        <div className="mt-2 flex items-baseline">
          <span className="text-2xl font-bold">{price}</span>
          <span className="ml-1 text-sm text-gray-500">{period}</span>
        </div>
      </div>

      <ul className="mb-6 space-y-2 text-sm">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="mr-2 h-4 w-4 text-green-500" />
            {feature}
          </li>
        ))}
      </ul>
      {name === "Geek" ? (
        <Link to="/checkout">
        <Button className={`w-full text-white ${color}`} >Upgrade to Geek</Button>
        </Link>
      ) : (
        <Button className={`w-full text-white ${color}`}>Contact Us</Button>
      )}
    </div>
  )
}

