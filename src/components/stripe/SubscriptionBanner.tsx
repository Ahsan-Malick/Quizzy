// "use client"

// import { useState } from "react"
// import { X, Bell, CheckCircle } from "lucide-react"
// import { Button } from "../Button"
// import SubscriptionModal from "./SubscriptionModal"

// type SubscriptionStatus = "none" | "basic" | "pro" | "enterprise"

// interface SubscriptionBannerProps {
//   initialStatus?: SubscriptionStatus
// }

// export default function SubscriptionBanner({ initialStatus = "none" }: SubscriptionBannerProps) {
//   const [isVisible, setIsVisible] = useState(true)
//   const [status, setStatus] = useState<SubscriptionStatus>(initialStatus)
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   if (!isVisible) return null

//   const getStatusMessage = () => {
//     switch (status) {
//       case "none":
//         return "You are not currently subscribed to any plan."
//       case "basic":
//         return "You are currently on the Basic plan."
//       case "pro":
//         return "You are currently on the Pro plan."
//       case "enterprise":
//         return "You are currently on the Enterprise plan."
//     }
//   }

//   const handleSubscribe = (plan: string) => {
//     setStatus(plan as SubscriptionStatus)
//   }

//   const getActionButton = () => {
//     switch (status) {
//       case "none":
//         return (
//           <Button size="sm" onClick={() => setIsModalOpen(true)} className="ml-4">
//             Subscribe Now
//           </Button>
//         )
//       case "basic":
//         return (
//           <Button size="sm" variant="outline" onClick={() => setIsModalOpen(true)} className="ml-4">
//             Upgrade to Pro
//           </Button>
//         )
//       case "pro":
//         return (
//           <Button size="sm" variant="outline" onClick={() => setIsModalOpen(true)} className="ml-4">
//             Upgrade to Enterprise
//           </Button>
//         )
//       case "enterprise":
//         return (
//           <Button size="sm" variant="outline" className="ml-4" disabled>
//             <CheckCircle className="h-4 w-4 mr-1" />
//             Premium Plan
//           </Button>
//         )
//     }
//   }

//   const getBannerColor = () => {
//     switch (status) {
//       case "none":
//         return "bg-gray-100"
//       case "basic":
//         return "bg-blue-50"
//       case "pro":
//         return "bg-green-50"
//       case "enterprise":
//         return "bg-purple-50"
//     }
//   }

//   return (
//     <>
//       <div className={`py-2 px-4 ${getBannerColor()}`}>
//         <div className="container mx-auto flex items-center justify-between">
//           <div className="flex items-center">
//             <Bell className="h-4 w-4 mr-2 text-primary" />
//             <span className="text-sm">{getStatusMessage()}</span>
//             {getActionButton()}
//           </div>
//           <button
//             onClick={() => setIsVisible(false)}
//             className="text-gray-500 hover:text-gray-700"
//             aria-label="Close banner"
//           >
//             <X className="h-4 w-4" />
//           </button>
//         </div>
//       </div>

//       <SubscriptionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubscribe={handleSubscribe} />
//     </>
//   )
// }

