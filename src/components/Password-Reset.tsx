import React, { useState } from 'react'
import { Button } from "./Button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from './ui/card'
import { Alert, AlertDescription } from "./ui/alert"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { Link, useParams } from "react-router-dom";
import { useEffect } from 'react'
import axios from 'axios'


export default function PasswordReset() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [validToken, setValidToken] = useState<Boolean|null> (null); // null = loading state
  const [newPassword, setNewPassword] = useState("");

  const {token} = useParams();


  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

  const handleResetPassword = async(event: React.FormEvent) => {
    event.preventDefault()
    const data = {token: token, new_password: password}
    await axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password`, data )
    setError('')
    setSuccess(false)

    if (password !== confirmPassword) {
      setError("Passwords don't match")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long")
      return
    }

    // TODO: Implement actual password reset logic here
    
    setSuccess(true)
  }

  useEffect(() => {
    // Check token validity when the page loads
    fetch(`${import.meta.env.VITE_API_URL}/auth/validate-reset-token?token=${token}`)
      .then(response => response.json())
      .then(data => {
        if (data.message === "Token is valid") {
          setValidToken(true);
        } else {
          setValidToken(false);
        }
      })
      .catch(() => setValidToken(false)); // Handle errors
  }, [token]);

  if (validToken === null) return <p>Checking reset link...</p>; // Loading state
  if (validToken === false) return <p style={{ color: "red" }}>Reset link expired or invalid.</p>; // Expired token

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md bg-white">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription className='text-gray-500'>Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div className="space-y-2">
              <Label className='' htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert>
                <AlertDescription>Password reset successfully! You can now log in with your new password.</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full bg-indigo-700 text-white">Reset Password</Button>
          </form>
        </CardContent>
        <CardFooter className='flex justify-center'>
            <Link to="/signin">
          <Button variant="link" className="w-full">
            Back to Sign In
          </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}