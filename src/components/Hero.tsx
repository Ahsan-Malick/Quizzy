import React from "react";
import heroimage from "../assets/Flat Uni.jpg"

const Hero = () => {
  return (
    <div>
      <section className="bg-[#ffffff] py-20 px-6 overflow-hidden relative">
        <div className="mx-auto flex flex-col-reverse lg:flex-row items-center justify-between">
          <div className="flex justify-between mx-10">
          {/* Text Content */}
          <div className="sm:w-1/2 text-left mb-12 lg:mb-0">
            <h1 className="text-5xl lg:text-7xl font-bold text-[#4A148C] leading-tight">
            Turn Your Content into a Quiz with One Click!
            </h1>
            <p className="mt-6 text-lg text-[#616161]">
            Upload a document, and let AI create quizzes in seconds. Perfect for students, teachers, and lifelong learners.
            </p>
            <button
              
              className="mt-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full inline-flex items-center transition duration-300"
            >
              Get Started
            </button>
          </div>
          {/* Image & Shapes */}
          <div className="hidden sm:block">
            {/* Illustration - Replace with your chosen image */}
            <img
              src={heroimage}// Replace with your illustration URL
              alt="Learning Illustration"
              className="w-96 h-auto relative z-10"
            />
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
