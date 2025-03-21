import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import HowItWorks from './How-it-works'
import AboutQuizzy from './AboutQuizzy'
import Contact from './Contact'
import Pricing from './Pricing'
import Benefits from './Benefits'
import Footer from './Footer'




const Home: React.FC = () => {
  
  return (
    <div className="scroll-smooth">
     <Navbar></Navbar>
     {/* <UsersCount></UsersCount> */}
     <section id="hero">
        <Hero />
      </section>
      <section id="about-quizzy">
        <AboutQuizzy />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="benefits">
        <Benefits />
      </section>
      <section id="pricing">
     <Pricing></Pricing>
      </section>
      <section id="contact">
        <Contact />
      </section>
      {/* <Footer></Footer> */}
    </div>
  )
}

export default Home

