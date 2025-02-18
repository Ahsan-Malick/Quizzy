

import { motion } from "framer-motion"
import { Upload, Cpu, FileCheck, PenTool } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Upload Document",
    description: "Select and upload any document you want to create a quiz from.",
  },
  {
    icon: Cpu,
    title: "AI Processing",
    description: "Our advanced AI analyzes the document and extracts key information.",
  },
  {
    icon: FileCheck,
    title: "Quiz Generation",
    description: "The AI generates a comprehensive quiz based on the document content.",
  },
  {
    icon: PenTool,
    title: "Take the Quiz",
    description: "Start the interactive quiz and test your knowledge instantly.",
  },
]
const HowItWorks: React.FC =()=>{
  return (
    <section className="py-16 bg-gradient-to-b from-background to-primary-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <step.icon className="w-8 h-8 text-primary-foreground" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
        {/* <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center text-black justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md  bg-primary hover:bg-primary/90"
            >
              Get Started
            </a>
          </div>
          <div className="mt-3 inline-flex rounded-md shadow">
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50"
            >
              Learn More
            </a>
          </div>
        </motion.div> */}
      </div>
    </section>
  )
}

export default HowItWorks