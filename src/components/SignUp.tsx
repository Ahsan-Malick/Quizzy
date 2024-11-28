"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "./Button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import {
  ArrowRight,
  UserPlus,
  User,
  Eye,
  EyeOff,
  HelpCircle,
} from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useStore } from "../store/store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useForm } from "react-hook-form";
import axios from "axios";

type FormValues = {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [usernameexist, setUserNameExist] = useState<boolean>();
  const [emailexist, setEmailExist] = useState<boolean>();
  const [passwordError, setPasswordError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const userData = useStore((state) => state.userDetail);


  const { register, handleSubmit, reset, setValue } = useForm<FormValues>({
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const checkUsernameAsync = useStore((state) => state.checkUsernameAsync);
  const checkEmailAsync = useStore((state) => state.checkEmailAsync);
  const signUpUserAysnc = useStore((state) => state.signUpUserAsync);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const validatePassword = (value: string) => {
    if (!passwordRegex.test(value)) {
      setPasswordError("Password does not meet the requirements");
    } else {
      setPasswordError("");
    }
  };



  const onSubmit = async (data: FormValues) => {
    if (passwordError || confirmPasswordError) {
      return; // Prevent form submission if there are errors
    }

    try {
      await signUpUserAysnc(data);

      //   reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGuestAccess = () => {
    // Handle guest access logic here
  };

  const checkUsername = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target as HTMLInputElement;
    const username = value.value;
    const username_obj = { username: username };
    const response = await checkUsernameAsync(username_obj);
    setUserNameExist(response);
  };

  const checkEmail = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target as HTMLInputElement;
    const email = value.value;
    const email_obj = { email: email };
    const response = await checkEmailAsync(email_obj);
    setEmailExist(response);
  };


  useEffect(() => {

    const usernameField = document.querySelector<HTMLInputElement>(
      "input[name='username']"
    );
    const firstnameField = document.querySelector<HTMLInputElement>(
      "input[name='firstname']"
    );
    const lastnameField = document.querySelector<HTMLInputElement>(
      "input[name='lastname']"
    );
    const emailField = document.querySelector<HTMLInputElement>(
      "input[name='email']"
    );
    const passwordField = document.querySelector<HTMLInputElement>(
      "input[name='password']"
    );
    
    if(usernameField && usernameField.value){
    setValue("username", usernameField.value)
    }

    if(firstnameField && firstnameField.value){
      setValue("firstname", firstnameField.value)
    }

    if(lastnameField && lastnameField.value){
      setValue("lastname", lastnameField.value)
    } 

    if(emailField && emailField.value){
      setValue("email", emailField.value)
    } 

    if(passwordField && passwordField.value){
      setValue("password", passwordField.value)
    } 

    if (confirmPassword && password !== confirmPassword) {
      console.log(confirmPassword, password);
      setConfirmPasswordError("Passwords do not match");
    } 
    else{
      setConfirmPasswordError("");
    }
  }, [password, confirmPassword]);


  return userData ? (
    <Navigate to="/welcome" replace />
  ) :  (
  
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="backdrop-blur-sm bg-white/90 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-indigo-800">
              Create an Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    {...register("username")}
                    id="username"
                    placeholder="johndoe123"
                    required
                    onChange={checkUsername}
                  />
                </div>
                {usernameexist === true && (
                  <div className="text-red-500">username already taken</div>
                )}
                <div></div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  {...register("firstname")}
                  id="firstname"
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  {...register("lastname")}
                  id="lastname"
                  placeholder="Doe"
                  required
                />
              </div>
              <div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    onChange={checkEmail}
                  />
                </div>
                {emailexist === true && (
                  <div className="text-red-500">Email already registered</div>
                )}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Password must contain:</p>
                        <ul className="list-disc list-inside">
                          <li>At least 8 characters</li>
                          <li>One uppercase letter</li>
                          <li>One lowercase letter</li>
                          <li>One number</li>
                          <li>One special character</li>
                        </ul>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="relative">
                  <Input
                    {...register("password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validatePassword(e.target.value);
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-sm">{passwordError}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {confirmPasswordError && (
                  <p className="text-red-500 text-sm">{confirmPasswordError}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link to="/terms" className="text-indigo-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-indigo-600 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </Label>
              </div>
              <Button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    className="h-5 w-5 rounded-full border-t-2 border-r-2 border-white"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ) : (
                  <>
                    Sign Up <UserPlus className="ml-2 h-4 w-4" />
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
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGuestAccess}
            >
              Continue as Guest <User className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/signin" className="text-indigo-600 hover:underline">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}