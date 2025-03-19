'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { GraduationCap, BookOpen, Users, Clock, FileCheck, BarChart3, Brain, Lightbulb, Award } from 'lucide-react'

export default function BenefitsSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  const userGroups = [
    {
      title: "For Teachers",
      icon: <GraduationCap className="h-12 w-12 text-indigo-600" />,
      description: "Save time and enhance your teaching effectiveness",
      benefits: [
        {
          icon: <Clock className="h-5 w-5 text-indigo-600" />,
          title: "Time-Saving",
          description: "Automatically generate quizzes from your lecture materials in seconds"
        },
        {
          icon: <FileCheck className="h-5 w-5 text-green-600" />,
          title: "Customizable Content",
          description: "Adjust difficulty levels and question types to match your teaching objectives"
        },
        {
          icon: <BarChart3 className="h-5 w-5 text-blue-600" />,
          title: "Performance Insights",
          description: "Track student progress with detailed analytics and identify knowledge gaps"
        }
      ]
    },
    {
      title: "For Students",
      icon: <BookOpen className="h-12 w-12 text-green-600" />,
      description: "Enhance your learning experience and retention",
      benefits: [
        {
          icon: <Brain className="h-5 w-5 text-green-600" />,
          title: "Active Learning",
          description: "Reinforce concepts through interactive quizzes tailored to your course materials"
        },
        {
          icon: <Lightbulb className="h-5 w-5 text-yellow-600" />,
          title: "Instant Feedback",
          description: "Receive immediate results and explanations to improve understanding"
        },
        {
          icon: <Award className="h-5 w-5 text-purple-600" />,
          title: "Self-Assessment",
          description: "Track your progress and identify areas that need more attention"
        }
      ]
    },
    {
      title: "For Teaching Assistants",
      icon: <Users className="h-12 w-12 text-blue-600" />,
      description: "Streamline your support role and maximize impact",
      benefits: [
        {
          icon: <Clock className="h-5 w-5 text-blue-600" />,
          title: "Efficient Grading",
          description: "Automate assessment processes to focus more on supporting students"
        },
        {
          icon: <FileCheck className="h-5 w-5 text-indigo-600" />,
          title: "Content Creation",
          description: "Quickly generate supplementary practice materials for review sessions"
        },
        {
          icon: <BarChart3 className="h-5 w-5 text-green-600" />,
          title: "Progress Monitoring",
          description: "Easily identify struggling students who need additional support"
        }
      ]
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-4"
          >
            Benefits for Everyone
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Our QUIZ App is designed to improve the educational experience for all users, 
            whether you're teaching, learning, or supporting others.
          </motion.p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-3 gap-8"
        >
          {userGroups.map((group, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto mb-4">
                    {group.icon}
                  </div>
                  <CardTitle className="text-2xl">{group.title}</CardTitle>
                  <CardDescription className="text-base">{group.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {group.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start">
                        <div className="mr-3 mt-1">
                          {benefit.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{benefit.title}</h4>
                          <p className="text-gray-600 text-sm">{benefit.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}