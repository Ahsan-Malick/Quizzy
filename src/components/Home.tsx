import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import HowItWorks from './How-it-works'
import Pricing from './Pricing'
import UsersCount from './UsersCount'
import AboutQuizzy from './AboutQuizzy'
import Contact from './Contact'


interface HomeProps {
  userLogged: boolean;
}


const Home: React.FC<HomeProps> = () => {
  
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
      <section id="contact">
        <Contact />
      </section>
     
     {/* <Pricing></Pricing> */}
    </div>
  )
}

export default Home

