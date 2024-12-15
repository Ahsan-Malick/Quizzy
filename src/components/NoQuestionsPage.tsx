import { motion } from 'framer-motion'
import { FileQuestion, PlusCircle } from 'lucide-react'
import { Button } from "./Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import {Link} from "react-router-dom"

export default function NoQuestionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-100 to-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md mx-auto bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-indigo-800">No Questions Available</CardTitle>
            <CardDescription className="text-center">It looks like you haven't created any quizzes yet.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <FileQuestion className="w-24 h-24 text-indigo-500" />
            <p className="text-center text-gray-600">
              To get started, create your first quiz by uploading a document and setting quiz parameters.
            </p>
            <Link to="/welcome">
              <Button className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Your First Quiz
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}