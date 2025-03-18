// "use client"

// import { useState } from "react"
// import { X } from "lucide-react"
// import { Button } from "../Button"

// interface SubscriptionModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onSubscribe: (plan: string) => void
// }

// export default function SubscriptionModal({ isOpen, onClose, onSubscribe }: SubscriptionModalProps) {
//   const [selectedPlan, setSelectedPlan] = useState("basic")

//   if (!isOpen) return null

//   const handleSubscribe = () => {
//     onSubscribe(selectedPlan)
//     onClose()
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-bold">Choose Your Subscription</h3>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         <div className="space-y-4 mb-6">
//           <div
//             className={`p-4 border rounded-lg cursor-pointer ${
//               selectedPlan === "basic" ? "border-primary bg-blue-50" : "border-gray-200"
//             }`}
//             onClick={() => setSelectedPlan("basic")}
//           >
//             <div className="flex justify-between items-center">
//               <h4 className="font-semibold">Basic Plan</h4>
//               <span className="font-bold">$9/month</span>
//             </div>
//             <p className="text-sm text-gray-600 mt-1">Perfect for individuals and small teams</p>
//           </div>

//           <div
//             className={`p-4 border rounded-lg cursor-pointer ${
//               selectedPlan === "pro" ? "border-primary bg-blue-50" : "border-gray-200"
//             }`}
//             onClick={() => setSelectedPlan("pro")}
//           >
//             <div className="flex justify-between items-center">
//               <h4 className="font-semibold">Pro Plan</h4>
//               <span className="font-bold">$29/month</span>
//             </div>
//             <p className="text-sm text-gray-600 mt-1">Ideal for growing teams with advanced needs</p>
//           </div>

//           <div
//             className={`p-4 border rounded-lg cursor-pointer ${
//               selectedPlan === "enterprise" ? "border-primary bg-blue-50" : "border-gray-200"
//             }`}
//             onClick={() => setSelectedPlan("enterprise")}
//           >
//             <div className="flex justify-between items-center">
//               <h4 className="font-semibold">Enterprise Plan</h4>
//               <span className="font-bold">Custom pricing</span>
//             </div>
//             <p className="text-sm text-gray-600 mt-1">For large organizations with custom requirements</p>
//           </div>
//         </div>

//         <div className="flex justify-end space-x-3">
//           <Button variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleSubscribe}>Subscribe Now</Button>
//         </div>
//       </div>
//     </div>
//   )
// }

