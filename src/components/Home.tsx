import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import HowItWorks from './How-it-works'
import Pricing from './Pricing'

const Home: React.FC = () => {
  return (
    <div>
     <Navbar></Navbar>
     <Hero></Hero>
     <HowItWorks></HowItWorks>
     <Pricing></Pricing>
    </div>
  )
}

export default Home
