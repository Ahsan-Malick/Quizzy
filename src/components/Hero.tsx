import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "./Button";
import { ArrowRight, Brain, FileText, Zap, Pause, Play } from "lucide-react";
import HeroImg from  "../assets/HeroImg.jpg"
import ReactPlayer from 'react-player'





const Hero: React.FC = () => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);


  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const features = [
    {
      icon: FileText,
      text: "Support for multiple file formats",
      bgColor: "bg-blue-100",
    },
    {
      icon: Brain,
      text: "AI-powered question generation",
      bgColor: "bg-green-100",
    },
    { icon: Zap, text: "Instant quiz creation", bgColor: "bg-yellow-100" },
  ];




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
              Upload any document and let our AI generate interactive quizzes
              instantly. Perfect for educators, students, and curious minds
              alike.
            </motion.p>
            <motion.div
              className="mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button
                size="lg"
                asChild
                className="text-white bg-black font-semibold"
              >
                <Link to="/signin" className="group">
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
                  <p className="text-sm font-medium text-center">
                    {feature.text}
                  </p>
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
            <div className="hidden lg:block aspect-w-5 aspect-h-4 overflow-hidden rounded-lg bg-white relative">
              <img 
                src={HeroImg} 
                alt="Hero"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              className="absolute -bottom-6 -left-6 h-48 w-48 rounded-full bg-primary/10 blur-2xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute -top-6 -right-6 h-40 w-40 rounded-full bg-secondary/10 blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
