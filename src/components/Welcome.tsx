import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import { motion, AnimatePresence } from "framer-motion";
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
  AlertCircle,
  Rocket,
} from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import axios from "axios";
import { useStore } from "../store/store";
import { Label } from "./ui/label";
import { Bounce, ToastContainer, toast } from "react-toastify";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "./ui/select";
import Avatar from "../utils/avatar";
import { capitalizeFirstLetter } from "../utils/capitalize";
import { Link, useNavigate } from "react-router-dom";
import { PlanBanner } from "./Plan-Banner";

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
    {
      id: 1,
      title: "Quiz Master",
      description: "Complete 50 quizzes",
      progress: 70,
    },
    {
      id: 2,
      title: "Perfect Score",
      description: "Get 100% on any quiz",
      progress: 90,
    },
  ],
};

type Question = {
  id: string;
  question: string;
  options: string[];
  answer: string;
};

type TestQuestion = {
  title: string;
  questions: Question[];
  email: string;
  number_of_questions: number;
  quiztime_set: number;
  difficulty: string;
  category: string;
};

const quizCategories = [
  { value: "science", label: "Science" },
  { value: "technology", label: "Technology" },
  { value: "mathematics", label: "Mathematics" },
  { value: "philosophy", label: "Philosophy" },
  { value: "religion", label: "Religion" },
  { value: "entertainment", label: "Entertainment" },
  { value: "history", label: "History" },
  { value: "education", label: "Education" },
  { value: "other", label: "Other" },
];

const menuItems = [
  { icon: Settings, label: "Settings" },
  { icon: BarChart2, label: "Analytics" },
  { icon: Users, label: "Invite Friends" },
];

export default function UserWelcome() {
  const [activeTab, setActiveTab] = useState<any>("dashboard");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [generatingQuiz, setGeneratingQuiz] = useState(false);
  const [quizgenerated, setQuizGenerated] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [download, setDownload] = useState<boolean>(false);
  const [quizData, setQuizData] = useState<TestQuestion | null>(null);
  const [category, setCategory] = useState<string>("");
  const [quiztime, setQuizTime] = useState("");
  const [checkUpload, setCheckUpload] = useState<boolean>(false);

  const getQuestionsAsync = useStore((state) => state.getQuestionsAsync);
  const userPerformance = useStore((state) => state.userPerformance);
  const logOutUserAsync = useStore((state) => state.logOutUserAsync);
  const userDetails = useStore((state) => state.userDetail);
  const recentQuizzes = useStore((state) => state.recent_quizzes);

  const navigate = useNavigate();

  const handleMenuNavigation = (label: string) => {
    if (label === "Settings") {
      navigate("/settings");
    } else if (label === "Analytics") {
      // navigate("/analytics");
    }
  };

  const handleQuizTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizTitle(e.target.value);
  };

  const handleLogOut = async () => {
    await logOutUserAsync();
  };

  //OnChanging the file is uploaded
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_FILE_SIZE = 20 * 1024 * 1024; //20MB File size limit
    const assertFile = e.target as HTMLInputElement;
    const file = assertFile.files;
    if (file) {
      const selectedFile = file[0];
      if (selectedFile.size > MAX_FILE_SIZE) {
        // Show toast warning if file size exceeds the limit
        toast.warn("File size exceeds the 20MB limit!", {
          position: "top-center",
          autoClose: 3000,
        });
      } else {
        // Proceed with file upload
        setUploadedFile(selectedFile);
        setCheckUpload(true);
        toast.success("Uploaded Successfully", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    } else {
      alert("Something went wrong, try again");
    }
  };

  const uploadFile = async () => {
    if (
      uploadedFile &&
      quizTitle &&
      difficulty &&
      numQuestions &&
      category &&
      quiztime
    ) {
      // Check if a file has been selected *before* creating FormData
      const formData = new FormData();
      formData.append("file", uploadedFile);
      formData.append("email", userDetails?.email || ""); //if userDetails is null, then append an empty string
      formData.append("title", quizTitle);
      formData.append("difficulty", difficulty);
      formData.append("numQuestions", numQuestions);
      formData.append("category", category);
      formData.append("quiztime", quiztime);

      try {
        setGeneratingQuiz(true);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/quiz/uploadfile/`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        console.log({response});
        const data = await getQuestionsAsync(userDetails?.email || "");
        setQuizData(data);
        setGeneratingQuiz(false);
        setQuizGenerated(true);
        setDownload(true);
      } catch (error) {
        alert(error);
      }
    } else {
      // Handle the case where no file is selected
      toast.error("Make sure all fields are filled out"); // Or another appropriate action.
    }
  };

  const downloadPdf = () => {
    const doc = new jsPDF();
    const pageHeight = doc.internal.pageSize.height;
    const lineHeight = 10;
    const margin = 10;
    const bottomMargin = 20;
    let yOffset = 20;

    const difficulty = capitalizeFirstLetter(quizData?.difficulty || "");
    const category = capitalizeFirstLetter(quizData?.category || "");

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Name
    doc.text("Name:________________", margin, yOffset);

    // Date
    doc.text("Date: ________________", 150, yOffset);
    yOffset += 12;

    // Difficulty Level
    doc.text(`Difficulty: ${difficulty || "Not Specified"}`, margin, yOffset);

    // Category
    doc.text(`Category: ${category || "General"}`, 150, yOffset);
    yOffset += 10;

    // Disclaimer
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text(
      "Disclaimer: This quiz has been auto-generated based on the documents provided by the user. " +
        "The answer key is generated based on the provided content and is believed to be accurate. " +
        "However, the creator assumes no liability for any inaccuracies or misinterpretations.",
      margin,
      yOffset,
      { maxWidth: 180 } // Ensures the text wraps within the page width
    );
    yOffset += 20; // Add some spacing after the disclaimer

    // Quiz Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Quiz", margin, yOffset);
    yOffset += 10;

    // Add questions with options
    doc.setFont("helvetica", "normal");
    quizData?.questions.forEach((question: Question, index: number) => {
      const questionText = `${index + 1}. ${question.question}`;
      const questionLines = doc.splitTextToSize(questionText, 180);
      const questionHeight = questionLines.length * lineHeight;

      const optionsHeight = question.options.length * lineHeight;
      const totalHeight = questionHeight + optionsHeight + 5; // Extra padding between questions

      // Check if new page is needed
      if (yOffset + totalHeight > pageHeight - bottomMargin) {
        doc.addPage();
        yOffset = margin;
      }

      // Render question text
      questionLines.forEach((line: any) => {
        doc.text(line, margin, yOffset);
        yOffset += lineHeight;
      });

      // Render options
      question.options.forEach((option: string, optIndex: number) => {
        const optionText = `${String.fromCharCode(65 + optIndex)}. ${option}`;
        const optionLines = doc.splitTextToSize(optionText, 170); // Adjusted max width

        optionLines.forEach((line: any) => {
          if (yOffset + lineHeight > pageHeight - bottomMargin) {
            doc.addPage();
            yOffset = margin;
          }
          doc.text(line, margin + 5, yOffset);
          yOffset += lineHeight;
        });
      });

      yOffset += 5; // Extra spacing between questions
    });

    // Move to a new page for the Answer Key
    doc.addPage();
    yOffset = margin;

    // Answer Key Title
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Answer Key", margin, yOffset);
    yOffset += 10;

    // Add the Answer Key
    doc.setFont("helvetica", "normal");
    quizData?.questions.forEach((question: Question, index: number) => {
      const answerText = `${index + 1}. ${question.answer}`;
      const answerLines = doc.splitTextToSize(answerText, 180);

      answerLines.forEach((line: any) => {
        if (yOffset + lineHeight > pageHeight - bottomMargin) {
          doc.addPage();
          yOffset = margin;
        }
        doc.text(line, margin, yOffset);
        yOffset += lineHeight;
      });
    });

    // Save the PDF
    doc.save(`${quizTitle}.pdf`);
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await getQuestionsAsync(userDetails?.email || "");
      if (data) {
        setQuizGenerated(true);
        setCheckUpload(true);
        setGeneratingQuiz(false);
      }
    };
    fetch();
  }, []);

  type Tab = {
    [key: string]: JSX.Element;
  };
  const tabContent: Tab = {
    dashboard: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-indigo-800">
          Welcome, {userDetails?.firstname} {userDetails?.lastname}!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-xl text-white shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="font-semibold text-xl mb-3">Quick Stats</h3>
            <div className="space-y-2">
              <p className="flex justify-between items-center">
                <span>
                  <Book className="inline mr-2" size={18} /> Quizzes Taken:
                </span>
                <span className="text-2xl font-bold">
                  {userPerformance.quizzes_taken}
                </span>
              </p>
              <p className="flex justify-between items-center">
                <span>
                  <Brain className="inline mr-2" size={18} /> Popular Category:
                </span>
                <span className="text-2xl font-bold">
                  {userPerformance.popular_category
                    ? userPerformance.popular_category
                    : "N/A"}
                </span>
              </p>
            </div>
          </motion.div>
          <motion.div
            className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-xl text-white shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="font-semibold text-xl mb-3">Quiz Insights</h3>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Highest Score:</span>
                <span className="font-bold">
                  {userPerformance.highest_score.toFixed(1)}%
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span>Lowest Score:</span>
                <span className="font-bold">
                  {userPerformance.lowest_score.toFixed(1)}%
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span>Average Score:</span>
                <span className="font-bold">
                  {userPerformance.average_score.toFixed(1)}%
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-indigo-800">
          Recent Quizzes
        </h3>
        <ul className="space-y-3">
          {recentQuizzes?.map((quiz) => (
            <motion.li
              key={quiz.quiz_no}
              className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              }}
              transition={{ duration: 0.2 }}
            >
              <span className="font-medium text-lg">{quiz.title}</span>
              <span className="text-2xl font-bold text-indigo-600">
                {quiz.score_percentage.toFixed(1)}%
              </span>
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
        <h2 className="text-3xl font-bold mb-6 text-indigo-800">
          Explore Quizzes
        </h2>
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search quizzes..."
            className="w-full text-lg py-3"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "History",
            "Science",
            "Literature",
            "Mathematics",
            "Geography",
            "Pop Culture",
          ].map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                className="w-full h-32 text-lg font-semibold bg-gradient-to-br from-indigo-50 to-blue-100 hover:from-indigo-100 hover:to-blue-200 border-2 border-indigo-200"
              >
                {category}
                <br />
                <span className="text-sm font-normal text-indigo-600">
                  20+ Quizzes
                </span>
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
        <h2 className="text-3xl font-bold mb-6 text-indigo-800">
          Create a New Quiz
        </h2>

        <div className="space-y-6">
          <div className=" flex flex-col " id="quiz-info">
            <div
              className="mx-auto w-full xsm:flex xsm:justify-around max-xsm:items-center max-xsm:flex max-xsm:flex-col"
              id="info-1"
            >
              <div className="space-y-2 mb-4 xsm:w-[40%] max-xsm:w-full">
                <Label htmlFor="quizTitle" className="font-semibold">
                  Quiz Title
                </Label>
                <Input
                  type="text"
                  id="quizTitle"
                  value={quizTitle}
                  onChange={handleQuizTitleChange}
                  placeholder="Enter the quiz title"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div className="space-y-2 mb-4 xsm:w-[40%] max-xsm:w-full">
                <Label className="font-semibold" htmlFor="numQuestions">
                  Number of Questions
                  <span className="text-gray-500 text-sm ml-1">
                    (Max {userDetails?.subscription_status === "Geek" ? "35" : "5"} for current plan)
                  </span>
                </Label>
                <Input
                  id="numQuestions"
                  type="number"
                  min="1"
                  max={userDetails?.subscription_status === "Geek" ? "35" : "5"}
                  value={numQuestions}
                  placeholder="Enter the number of questions"
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value > 5 && userDetails?.subscription_status !== "Geek") {
                      toast.error("Number of questions cannot exceed 5 for Free Plan");
                      setNumQuestions("5");
                    }
                    else if (value > 35 && userDetails?.subscription_status === "Geek") {
                      toast.error("Number of questions cannot exceed 35 for Geek Plan");
                      setNumQuestions("35");
                    }
                     else if (quizgenerated) {
                      toast.error("Quiz is Already Uploaded");
                    } else {
                      setNumQuestions(e.target.value);
                    }
                  }}
                />
              </div>
            </div>

            <div className="mx-auto w-full xsm:flex xsm:justify-around max-xsm:items-center max-xsm:flex max-xsm:flex-col" id="info-2">
              <div className="space-y-2 mb-4 xsm:w-[40%] max-xsm:w-full">
                <Label className="font-semibold" htmlFor="difficulty">
                  Difficulty Level
                </Label>
                <Select
                  value={difficulty}
                  onValueChange={
                    quizgenerated
                      ? () => toast.error("Quiz is Already Uploaded")
                      : (value) => setDifficulty(value)
                  }
                >
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem
                      className="cursor-pointer hover:bg-indigo-100"
                      value="easy"
                    >
                      Easy
                    </SelectItem>
                    {userDetails?.subscription_status === "Geek" && (
                      <>
                    <SelectItem
                      className="cursor-pointer hover:bg-indigo-100"
                      value="medium"
                    >
                      Medium
                    </SelectItem>
                    <SelectItem
                      className="cursor-pointer hover:bg-indigo-100"
                      value="hard"
                    >
                      Hard
                    </SelectItem>
                    </>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 xsm:w-[40%] max-xsm:w-full">
                <Label className="font-semibold" htmlFor="category">
                  Select Category
                </Label>
                <Select
                  value={category}
                  onValueChange={
                    quizgenerated
                      ? () => toast.error("Quiz is Already Uploaded")
                      : (value) => setCategory(value)
                  }
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white max-h-60">
                    {quizCategories.map((category) => (
                      <SelectItem
                        className="cursor-pointer hover:bg-indigo-100"
                        value={category.value}
                      >
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className=" flex justify-around mt-4" id="quiztime">
              <div className="space-y-2 mb-4 xsm:w-[40%] max-xsm:w-full">
                <Label className="font-semibold" htmlFor="numQuestions">
                  Quiz Time(mins)
                </Label>
                <Input
                  id="quizTime"
                  type="number"
                  min="2"
                  max={userDetails?.subscription_status === "Geek" ? "180" : "5"}
                  value={quiztime}
                  placeholder="Enter the time allowed for the quiz"
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value > 5 && userDetails?.subscription_status !== "Geek") {
                      toast.error("Quiz Time cannot exceed 5 mins for Free Plan");
                      setQuizTime("5");
                    } else if (value > 180 && userDetails?.subscription_status === "Geek") {
                      toast.error("Quiz Time cannot exceed 180 mins for Geek Plan");
                      setQuizTime("180");
                    } else if (quizgenerated) {
                      toast.error("Quiz is Already Uploaded");
                    } else {
                      setQuizTime(e.target.value);
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-indigo-700">
              Upload a Document{" "}
              <span className="text-gray-400 text-sm">
                File size must not exceed 20MB
              </span>
            </h3>
            <p className="text-gray-600 mb-4">
              Upload a document and our AI will generate a quiz based on its
              content.
            </p>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-indigo-300 border-dashed rounded-lg cursor-pointer bg-indigo-50 hover:bg-indigo-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FileText className="w-10 h-10 mb-3 text-indigo-500" />
                  <p className="mb-2 text-sm text-indigo-600">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-indigo-500">
                    PDF Only (MAX. 20MB)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileUpload}
                  accept=".pdf,.docx,.txt"
                />
              </label>
            </div>
            {uploadedFile && (
              <div className="mt-4">
                <Alert>
                  <FileText className="h-4 w-4" />
                  <AlertTitle>File Uploaded</AlertTitle>
                  <AlertDescription>
                    {/* {uploadedFile.name} has been successfully uploaded. */}{" "}
                    Uploaded
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </div>

          <div className="max-xsm:flex max-xsm:flex-col max-xsm:items-center max-xsm:space-y-2 max-xsm:justify-center xsm:flex xsm:justify-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                disabled={!checkUpload || generatingQuiz}
                className="px-8 py-4 text-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-xl shadow-lg"
              >
                {generatingQuiz ? (
                  <>
                    <Zap className="mr-2 h-5 w-5 animate-spin" />
                    Generating Quiz...
                  </>
                ) : quizgenerated ? (
                  <>
                    <Link to="/quiz" state={{ quizTime: Number(quiztime) }}>
                      <div className="flex">
                        <Rocket className="mr-2 h-5 w-5" />
                        Let's Go!
                      </div>
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="flex" onClick={uploadFile}>
                      <Zap className="mr-2 h-5 w-5" />
                      Generate Quiz
                    </div>
                  </>
                )}
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                disabled={!download || userDetails?.subscription_status === "Free"}
                onClick={downloadPdf}
                className="bg-green-500 text-white text-lg rounded-xl shadow-lg"
              >
                Download Quiz
              </Button>
            </motion.div>
          </div>
          {/* <p className="text-sm text-indigo-600 bg-indigo-50 p-4 rounded-lg">
            Tip: You can also manually add questions after the AI generates the
            initial quiz!
          </p> */}
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
        <h2 className="text-3xl font-bold mb-6 text-indigo-800">
          Your Achievements
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {user.achievements.map((achievement) => (
            <motion.div
              key={achievement.id}
              className="bg-white p-6 rounded-xl shadow-lg"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              }}
            >
              <h3 className="font-semibold text-xl mb-2 text-indigo-700">
                {achievement.title}
              </h3>
              <p className="text-gray-600 mb-4">{achievement.description}</p>
              <Progress
                value={achievement.progress}
                className="h-2 bg-indigo-100"
              />
              <p className="text-right mt-2 text-indigo-600 font-medium">
                {achievement.progress}% Complete
              </p>
            </motion.div>
          ))}
          <motion.div
            className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-xl text-white shadow-lg flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-center text-2xl font-bold">
              More achievements to unlock!
            </p>
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
        <h2 className="text-3xl font-bold mb-6 text-indigo-800">
          Video Lecture Notes
        </h2>
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">
            Upload a Video Lecture
          </h3>
          <p className="text-gray-600 mb-4">
            Our AI will analyze the video and generate comprehensive notes for
            you.
          </p>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-video"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-indigo-300 border-dashed rounded-lg cursor-pointer bg-indigo-50 hover:bg-indigo-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-indigo-500" />
                <p className="mb-2 text-sm text-indigo-600">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-indigo-500">
                  MP4, WebM or OGG (MAX. 2GB)
                </p>
              </div>
              <input id="dropzone-video" type="file" className="hidden" />
            </label>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-indigo-700">
            Your Recent Notes
          </h3>
          <ul className="space-y-3">
            {[
              "Introduction to Quantum Physics",
              "The French Revolution",
              "Organic Chemistry Basics",
            ].map((title, index) => (
              <motion.li
                key={index}
                className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg"
                whileHover={{ scale: 1.02 }}
              >
                <span className="font-medium">{title}</span>
                <Button variant="outline" size="sm">
                  View Notes
                </Button>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    ),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-4">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-6">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            QUIZZY
          </h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="">
                <Avatar initials={userDetails?.avatar || ""}></Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-56 bg-white"
              align="end"
              forceMount
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {userDetails?.firstname} {userDetails?.lastname}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userDetails?.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {menuItems.map(({ icon: Icon, label }) => (
                <DropdownMenuItem
                  className="flex items-center hover:bg-indigo-100 cursor-pointer"
                  key={label}
                  onClick={() => handleMenuNavigation(label)}
                  disabled
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{label}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="flex items-center hover:bg-indigo-100 cursor-pointer"
                onClick={handleLogOut}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* banner */}
       <PlanBanner email={userDetails?.email || ""} userPlan={userDetails?.subscription_status || "Free"} userName={userDetails?.firstname || ""} />

        <nav className="flex flex-wrap justify-center gap-2 rounded-xl bg-indigo-50 p-2 mb-8">
          {[
            { id: "dashboard", icon: Book, label: "Dashboard" },
            // { id: "explore", icon: Search, label: "Explore" },
            { id: "create", icon: PlusCircle, label: "Create" },
            // { id: "achievements", icon: Trophy, label: "Achievements" },
            // { id: "videoNotes", icon: Video, label: "Video Notes" },
          ].map(({ id, icon: Icon, label }) => (
            <Button
              key={id}
              variant={activeTab === id ? "default" : "ghost"}
              className={`flex-1 min-w-[120px] ${
                activeTab === id ? "bg-white shadow-md" : "hover:bg-indigo-100"
              }`}
              onClick={() => setActiveTab(id)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {label}
            </Button>
          ))}
        </nav>

        <main>
          <AnimatePresence mode="wait">{tabContent[activeTab]}</AnimatePresence>
        </main>

        <footer className="mt-12 text-center text-sm text-indigo-600">
          <p>© 2024 QUIZ App. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
