import React from "react";
import heroimage from "../assets/Flat Uni.jpg"
import { Link } from "react-router-dom";
import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "./Button"
import { ArrowRight, BookOpen, Brain, FileText, Zap } from "lucide-react"

const Hero: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null)

  const features = [
    { icon: FileText, text: "Support for multiple file formats", bgColor: "bg-blue-100" },
    { icon: Brain, text: "AI-powered question generation", bgColor: "bg-green-100" },
    { icon: Zap, text: "Instant quiz creation", bgColor: "bg-yellow-100" },
  ]

  return (
    <div className="bg-gradient-to-b from-primary-50 to-background overflow-hidden">
      <div className="container mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <motion.div 
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div>Transform Documents into </div>
              <div className="text-indigo-600">Engaging Quizzes</div>
            </motion.h1>
            <motion.p 
              className="mt-6 text-xl text-muted-foreground max-w-prose"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Upload any document and let our AI generate interactive quizzes instantly. Perfect for educators, students, and curious minds alike.
            </motion.p>
            <motion.div 
              className="mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button size="lg" asChild className="text-white bg-black font-semibold">
                <Link to="/create-quiz" className="group">
                  Create Your First Quiz 
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
            <motion.div 
              className="mt-12 grid gap-4 sm:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {features.map((feature, index) => (
                <motion.div 
                  key={index} 
                  className={`flex flex-col items-center p-4 rounded-lg transition-colors ${feature.bgColor}`}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHovered(index)}
                  onHoverEnd={() => setHovered(null)}
                >
                  <feature.icon className="h-8 w-8 text-primary mb-2" />
                  <p className="text-sm font-medium text-center">{feature.text}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div 
            className="relative lg:col-start-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="aspect-w-5 aspect-h-4 overflow-hidden rounded-lg bg-white shadow-lg relative">
              {/* AI and Education related background elements */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(79, 70, 229, 0.1)" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <circle cx="10%" cy="20%" r="30" fill="rgba(79, 70, 229, 0.1)" />
                <circle cx="90%" cy="60%" r="40" fill="rgba(79, 70, 229, 0.1)" />
                <path d="M50,30 Q70,5 90,30 T130,30" fill="none" stroke="rgba(79, 70, 229, 0.2)" strokeWidth="2" />
              </svg>
              
              {/* Main illustration */}
              <motion.svg
                viewBox="0 0 500 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.path
                  d="M50 200 L150 200 L200 150 L250 250 L300 200 L350 300 L450 300"
                  stroke="#4F46E5"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                />
                <motion.circle
                  cx="150"
                  cy="200"
                  r="10"
                  fill="#4F46E5"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.3 }}
                />
                <motion.circle
                  cx="250"
                  cy="250"
                  r="10"
                  fill="#4F46E5"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.3 }}
                />
                <motion.circle
                  cx="350"
                  cy="300"
                  r="10"
                  fill="#4F46E5"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.6, duration: 0.3 }}
                />
                <motion.rect
                  x="100"
                  y="50"
                  width="60"
                  height="80"
                  rx="5"
                  fill="#9CA3AF"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 50, opacity: 1 }}
                  transition={{ delay: 2, duration: 0.5 }}
                />
                <motion.rect
                  x="220"
                  y="70"
                  width="60"
                  height="80"
                  rx="5"
                  fill="#9CA3AF"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 70, opacity: 1 }}
                  transition={{ delay: 2.2, duration: 0.5 }}
                />
                <motion.rect
                  x="340"
                  y="90"
                  width="60"
                  height="80"
                  rx="5"
                  fill="#9CA3AF"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 90, opacity: 1 }}
                  transition={{ delay: 2.4, duration: 0.5 }}
                />
                <motion.path
                  d="M250 350 L270 330 L270 370 Z"
                  fill="#4F46E5"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2.6, duration: 0.3 }}
                />
                <motion.rect
                  x="180"
                  y="320"
                  width="140"
                  height="30"
                  rx="15"
                  fill="#4F46E5"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 2.8, duration: 0.5 }}
                />
                <motion.text
                  x="250"
                  y="340"
                  textAnchor="middle"
                  fill="white"
                  fontSize="14"
                  fontWeight="bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.3, duration: 0.3 }}
                >
                  AI-Generated Quiz
                </motion.text>
              </motion.svg>
            </div>
            <motion.div 
              className="absolute -bottom-6 -left-6 h-48 w-48 rounded-full bg-primary/10 blur-2xl"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="absolute -top-6 -right-6 h-40 w-40 rounded-full bg-secondary/10 blur-2xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  )
};

export default Hero;
