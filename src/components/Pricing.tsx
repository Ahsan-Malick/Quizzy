import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "./Button"
import { Check, Zap, Brain, Rocket } from "lucide-react"

const plans = [
  {
    name: "Novice",
    icon: Zap,
    price: "$9.99",
    features: [
      "50 AI-generated quizzes/month",
      "Basic question types",
      "Email support",
      "1 team member",
    ],
    color: "from-blue-400 to-blue-600",
  },
  {
    name: "Expert",
    icon: Brain,
    price: "$29.99",
    features: [
      "Unlimited AI-generated quizzes",
      "Advanced question types",
      "Priority support",
      "5 team members",
      "Custom branding",
    ],
    color: "from-purple-400 to-purple-600",
  },
  {
    name: "Genius",
    icon: Rocket,
    price: "Custom",
    features: [
      "Unlimited everything",
      "Cutting-edge AI features",
      "24/7 dedicated support",
      "Unlimited team members",
      "API access",
      "Custom integrations",
    ],
    color: "from-orange-400 to-red-600",
  },
]

const Pricing: React.FC = () => {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)

  return (
    <section className="py-16  text-white overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(62, 62, 62, 0.8) 0%, rgba(31, 31, 31, 0.4) 100%)`,
          }}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        /> */}
        <motion.h2 
          className="text-4xl font-bold text-center mb-12 relative z-10 text-black"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Choose Your AI Power Level
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative rounded-lg overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHoveredPlan(index)}
              onHoverEnd={() => setHoveredPlan(null)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-75`} />
              <div className="relative p-6 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <plan.icon className="h-8 w-8 mr-2" />
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                </div>
                <p className="text-4xl font-bold mb-6">{plan.price}</p>
                <ul className="mb-6 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex} 
                      className="flex items-center mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + featureIndex * 0.1 }}
                    >
                      <Check className="h-5 w-5 mr-2" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
                <Button 
                  className="w-full bg-white text-gray-800 hover:bg-gray-200 transition-colors duration-300"
                  variant="outline"
                >
                  Power Up Now
                </Button>
              </div>
              <AnimatePresence>
                {hoveredPlan === index && (
                  <motion.div
                    className="absolute inset-0 bg-white opacity-10"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        <motion.p 
          className="text-center mt-12 text-gray-300 relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          All plans include a 14-day quantum leap trial. No time machine required.
        </motion.p>
      </div>
    </section>
  )
}

export default Pricing