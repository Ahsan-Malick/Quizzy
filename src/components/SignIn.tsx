'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "./Button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Checkbox } from "./ui/checkbox"
import { LogIn, Users} from 'lucide-react'
import { Link } from "react-router-dom";
import { useStore } from "../store/store";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import GmailButton from './GmailButton'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Alert, AlertDescription } from "./ui/alert"
import axios from 'axios'

type FormValues = {
  username: string;
  password: string;
};


export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetEmailSent, setResetEmailSent] = useState(false)
  const [totalUsers, setTotalUsers] = useState()

  const { register, handleSubmit, reset } = useForm<FormValues>();

  const signInUserAsync = useStore((state)=>state.signInUserAsync)


  const userData = useStore((state)=>state.userDetail)

  const onSubmit=async(data:FormValues)=>{

    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    
    try {
      await signInUserAsync(formData)
    } catch (error) {
      alert(error)
    }
  }


  const handleResetPassword = async(event: React.FormEvent) => {
    event.preventDefault()
    await axios.post(`${import.meta.env.VITE_API_URL}/auth/forgot-password`,{email: resetEmail})
   
    setResetEmailSent(true)
  }

  

  useEffect(()=>{
      const fetch=async()=>{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users-count`)
      const total_users = response.data.total_users
      setTotalUsers(total_users)
      }
      fetch()
  }
  ,[])

  return userData ? (
    <Navigate to="/welcome" replace={true}/>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-sm bg-white/90 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-indigo-800">Sign In to Your Account</CardTitle>
          </CardHeader>
          {/* <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg mx-4 p-4 mb-6 flex items-center justify-center"
          >
            <Users className="w-5 h-5 text-indigo-600 mr-2" />
            <span className="text-sm text-gray-600">Join our community of</span>
            <span className="font-bold text-indigo-600 mx-1">{totalUsers}</span>
            <span className="text-sm text-gray-600">registered users</span>
          </motion.div> */}
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input {...register("username")} id="username" type="text" placeholder="username" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input {...register("password")} id="password" type="password" placeholder="password" required />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="text-sm">Remember me</Label>
                </div>
                <Dialog>
            <DialogTrigger asChild>
              <Button variant="link">Forgot password?</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogDescription>
                  Enter your email address and we'll send you a link to reset your password.
                </DialogDescription>
              </DialogHeader>
              <form  className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resetEmail">Email</Label>
                  <Input
                    id="resetEmail"
                    type="email"
                    placeholder="m@example.com"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                </div>
                {resetEmailSent ? (
                  <Alert>
                    <AlertDescription>
                      If an account exists for {resetEmail}, you will receive a password reset email shortly.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Button type="submit" className="w-full bg-indigo-700 text-white" onClick={handleResetPassword}>Send Reset Link</Button>
                )}
              </form>
            </DialogContent>
          </Dialog>
              </div>
              <Button type="submit" className="w-full text-white bg-indigo-600 hover:bg-indigo-700" disabled={isLoading}>
                {isLoading ? (
                  <motion.div
                    className="h-5 w-5 rounded-full border-t-2 border-r-2 border-white"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <>
                    Sign In <LogIn className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>
            <GmailButton></GmailButton> 
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-indigo-600 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
