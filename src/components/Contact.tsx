import React from 'react'
import myImage from '../assets/myImage.jpg'
import { Linkedin } from 'lucide-react'

const Contact = () => {
  return (
    <div>
      <hr className="my-8 border-t border-gray-300 w-1/2 mx-auto" />
      <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Get in touch with me</h2>
          <div className="flex justify-center items-center w-full">
            {["Ahsan Javed"].map((member, index) => (
              <div key={index} className="bg-white px-10 py-3 rounded-lg shadow-md text-center">
                <div className="mb-4 relative w-32 h-32 mx-auto">
                  <img
                    src={myImage}
                    alt="myImage"
                    className="rounded-full w-32 h-32"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member}</h3>
                <p className="text-gray-600">Quizzy Developer</p>
                <div className="flex justify-center items-center mt-4">
                  <a href="https://www.linkedin.com/in/ahsan-javed-3b1b2a151/" target="_blank" className="text-gray-600">
                    <Linkedin />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
    </div>
  )
}

export default Contact
