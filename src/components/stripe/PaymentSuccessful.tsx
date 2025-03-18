"use client"

import { useState, useEffect } from "react"
import { CheckCircle, ArrowRight, Calendar, CreditCard} from "lucide-react"
import { Button } from "../Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Separator } from "../ui/separator"
import { Badge } from "../ui/badge"
import { useStore } from "../../store/store"
import { Link as RouterLink } from "react-router-dom"



export default function SubscriptionSuccess() {
  const [isAnimating, setIsAnimating] = useState(true)
  const customerEmail = useStore((state) => state.customerEmail);
  const customerName = useStore((state) => state.customerName);
  const product = useStore((state) => state.product);
  const productPrice = useStore((state) => state.product_price);
  const subscriptionStartDate = useStore((state) => state.subscriptionStartDate);
  const subscriptionEndDate = useStore((state) => state.subscriptionEndDate);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center">
            <CheckCircle className={`h-12 w-12 text-green-600 ${isAnimating ? "animate-pulse" : ""}`} />
          </div>
          <Badge className="mx-auto mb-2 bg-green-100 text-green-800 hover:bg-green-100">Subscription Active</Badge>
          <CardTitle className="text-2xl font-bold">Welcome to Geek Club {customerName} !</CardTitle>
          <CardDescription>Your subscription has been successfully activated</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-purple-50 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Subscription Plan</span>
              <span className="font-medium">{product}</span>
            </div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Billing Amount</span>
              <span className="font-medium">
                ${productPrice} / "monthly"
              </span>
            </div>
            {/* <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Start Date</span>
              <span className="font-medium">{subscriptionStartDate}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Next Billing Date</span>
              <span className="font-medium">{subscriptionEndDate}</span>
            </div> */}
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="mb-3 font-medium">Subscription Benefits</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                <span>Full access to all the difficulty levels</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                <span>You can download the quiz in PDF format</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                <span>You can generate quiz for upto 35 question per request</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-600" />
                <span>24/7 proprity customer support</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <h3 className="mb-3 font-medium">Subscription Management</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <Calendar className="mt-0.5 h-4 w-4 text-green-600" />
                <span>Your billing cycle renews monthly</span>
              </li>
              <li className="flex items-start gap-2">
                <CreditCard className="mt-0.5 h-4 w-4 text-green-600" />
                <span>You can cancel your subscription anytime</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="flex flex-col gap-2 pt-4">
          <RouterLink to="/welcome">
          <Button className="w-full text-white bg-green-600 hover:bg-green-700">
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          </RouterLink>
          {/* <Button variant="outline" className="w-full">
            Manage Subscription
            <Settings className="ml-2 h-4 w-4" />
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  )
}


