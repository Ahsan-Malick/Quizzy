import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Book, 
  Brain, 
  Trophy, 
  Users, 
  BarChart2, 
  Settings, 
  PlusCircle, 
  Search,
  Zap,
  Clock,
  Star,
  Video,
  Upload,
  FileText,
  AlertCircle
} from 'lucide-react'
import { Button } from "./Button"
import { Input } from "./ui/input"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu"
import { Progress } from "./ui/progress"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

// Mock user data
const user = {
  name: "Alex Johnson",
  avatar: "/placeholder.svg?height=40&width=40",
  recentQuizzes: [
    { id: 1, title: "World Geography", score: 85 },
    { id: 2, title: "Math Fundamentals", score: 92 },
    { id: 3, title: "Science Trivia", score: 78 },
  ],
  achievements: [
    { id: 1, title: "Quiz Master", description: "Complete 50 quizzes", progress: 70 },
    { id: 2, title: "Perfect Score", description: "Get 100% on any quiz", progress: 90 },
  ],
}

export default function UserWelcome() {
  const [activeTab, setActiveTab] = useState<any>('dashboard')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [generatingQuiz, setGeneratingQuiz] = useState(false)

  const handleFileUpload = (e: React.MouseEvent<HTMLInputElement>) => {
    const assertFile  = e.target as HTMLInputElement
    // // const file = event.target.files[0]
    // setUploadedFile(file)
  }

  const generateQuiz = () => {
    if (uploadedFile) {
      setGeneratingQuiz(true)
      // Simulating quiz generation process
      setTimeout(() => {
        setGeneratingQuiz(false)
        setUploadedFile(null)
        // Here you would typically handle the generated quiz, e.g., navigate to a new page or show a success message
      }, 3000)
    }
  }

  type Tab = {
    [key: string]: JSX.Element
  }
  const tabContent: Tab = {
    dashboard: (
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-indigo-800">Welcome back, {user.name}!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div 
            className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-xl text-white shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="font-semibold text-xl mb-3">Quick Stats</h3>
            <p className="text-2xl font-bold mb-2">27 Quizzes Taken</p>
            <p className="text-lg">Average Score: 88%</p>
          </motion.div>
          <motion.div 
            className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-xl text-white shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="font-semibold text-xl mb-3">Next Goal</h3>
            <p className="text-lg mb-2">Complete 5 more quizzes to unlock:</p>
            <p className="text-2xl font-bold">"Quiz Enthusiast" badge!</p>
          </motion.div>
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-indigo-800">Recent Quizzes</h3>
        <ul className="space-y-3">
          {user.recentQuizzes.map(quiz => (
            <motion.li 
              key={quiz.id} 
              className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center"
              whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
              transition={{ duration: 0.2 }}
            >
              <span className="font-medium text-lg">{quiz.title}</span>
              <span className="text-2xl font-bold text-indigo-600">{quiz.score}%</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    ),
    explore: (
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-indigo-800">Explore Quizzes</h2>
        <div className="mb-6">
          <Input type="text" placeholder="Search quizzes..." className="w-full text-lg py-3" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {['History', 'Science', 'Literature', 'Mathematics', 'Geography', 'Pop Culture'].map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" className="w-full h-32 text-lg font-semibold bg-gradient-to-br from-indigo-50 to-blue-100 hover:from-indigo-100 hover:to-blue-200 border-2 border-indigo-200">
                {category}
                <br />
                <span className="text-sm font-normal text-indigo-600">20+ Quizzes</span>
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    ),
    create: (
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-indigo-800">Create a New Quiz</h2>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-indigo-700">Upload a Document</h3>
            <p className="text-gray-600 mb-4">Upload a document and our AI will generate a quiz based on its content.</p>
            <div className="flex items-center justify-center w-full">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-indigo-300 border-dashed rounded-lg cursor-pointer bg-indigo-50 hover:bg-indigo-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileText className="w-10 h-10 mb-3 text-indigo-500" />
                  <p className="mb-2 text-sm text-indigo-600"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-indigo-500">PDF, DOCX, or TXT (MAX. 10MB)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onClick={handleFileUpload} accept=".pdf,.docx,.txt" />
              </label>
            </div>
            {uploadedFile && (
              <div className="mt-4">
                <Alert>
                  <FileText className="h-4 w-4" />
                  <AlertTitle>File Uploaded</AlertTitle>
                  <AlertDescription>
                    {/* {uploadedFile.name} has been successfully uploaded. */} Uploaded
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={generateQuiz}
                disabled={!uploadedFile || generatingQuiz}
                className="px-8 py-4 text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl shadow-lg"
              >
                {generatingQuiz ? (
                  <>
                    <Zap className="mr-2 h-5 w-5 animate-spin" />
                    Generating Quiz...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-5 w-5" />
                    Generate Quiz
                  </>
                )}
              </Button>
            </motion.div>
          </div>
          <p className="text-sm text-indigo-600 bg-indigo-50 p-4 rounded-lg">
            Tip: You can also manually add questions after the AI generates the initial quiz!
          </p>
        </div>
      </motion.div>
    ),
    achievements: (
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-indigo-800">Your Achievements</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {user.achievements.map(achievement => (
            <motion.div 
              key={achievement.id} 
              className="bg-white p-6 rounded-xl shadow-lg"
              whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
            >
              <h3 className="font-semibold text-xl mb-2 text-indigo-700">{achievement.title}</h3>
              <p className="text-gray-600 mb-4">{achievement.description}</p>
              <Progress value={achievement.progress} className="h-2 bg-indigo-100"  />
              <p className="text-right mt-2 text-indigo-600 font-medium">{achievement.progress}% Complete</p>
            </motion.div>
          ))}
          <motion.div 
            className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-xl text-white shadow-lg flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-center text-2xl font-bold">More achievements to unlock!</p>
          </motion.div>
        </div>
      </motion.div>
    ),
    videoNotes: (
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-indigo-800">Video Lecture Notes</h2>
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">Upload a Video Lecture</h3>
          <p className="text-gray-600 mb-4">Our AI will analyze the video and generate comprehensive notes for you.</p>
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-video" className="flex flex-col items-center justify-center w-full h-64 border-2 border-indigo-300 border-dashed rounded-lg cursor-pointer bg-indigo-50 hover:bg-indigo-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-indigo-500" />
                <p className="mb-2 text-sm text-indigo-600"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-indigo-500">MP4, WebM or OGG (MAX. 2GB)</p>
              </div>
              <input id="dropzone-video" type="file" className="hidden" />
            </label>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">Your Recent Notes</h3>
          <ul className="space-y-3">
            {['Introduction to Quantum Physics', 'The French Revolution', 'Organic Chemistry Basics'].map((title, index) => (
              <motion.li 
                key={index}
                className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <span className="font-medium">{title}</span>
                <Button variant="outline" size="sm">View Notes</Button>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    ),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <header className="flex justify-between items-center mb-8">
          <h1  className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">QUIZ App</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-12 w-12 rounded-full">
                Avatar commented
                {/* <Avatar className="h-12 w-12">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar> */}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    alex.johnson@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChart2 className="mr-2 h-4 w-4" />
                <span>Analytics</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>Invite Friends</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        
        <nav className="flex flex-wrap justify-center gap-2 rounded-xl bg-indigo-50 p-2 mb-8">
          {[
            { id: 'dashboard', icon: Book, label: 'Dashboard' },
            { id: 'explore', icon: Search, label: 'Explore' },
            { id: 'create', icon: PlusCircle, label: 'Create' },
            { id: 'achievements', icon: Trophy, label: 'Achievements' },
            { id: 'videoNotes', icon: Video, label: 'Video Notes' },
          ].map(({ id, icon: Icon, label }) => (
            <Button
              key={id}
              variant={activeTab === id ? 'default' : 'ghost'}
              className={`flex-1 min-w-[120px] ${activeTab === id ? 'bg-white shadow-md' : 'hover:bg-indigo-100'}`}
              onClick={() => setActiveTab(id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {label}
            </Button>
          ))}
        </nav>
        
        <main>
          <AnimatePresence mode="wait">
            {tabContent[activeTab]}
          </AnimatePresence>
        </main>
        
        <footer className="mt-12 text-center text-sm text-indigo-600">
          <p>© 2024 QUIZ App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}