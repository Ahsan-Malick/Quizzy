import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import HowItWorks from './How-it-works'
import Pricing from './Pricing'


interface HomeProps {
  userLogged: boolean;
}


const Home: React.FC<HomeProps> = ({userLogged}) => {
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
