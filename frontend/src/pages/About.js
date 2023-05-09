import React from 'react'
import tt from'../fruitStore/fruits.jpg'
const About = () => {
  return (
    <div className='p-2 md:p-4'>
    <div className='md:flex gap-3'>
      <div className='md:w-1/2 py-4 '>
        
        <h2 className='text-4xl md:text-7xl font-bold py-3' >Stay Home We Deliver ! <span className='text-green-700 '>
          The Fastest Delivery In Your Home.</span></h2>
        <p className='py-3 text-base '>
          Did you ever imagine that the freshest of fruits and vegetables, top-quality pulses and food grains, dairy products, and
          Could hundreds of branded items be handpicked and delivered to your home, all at the click of a button?
          Add to this the convenience of finding all your requirements at one single source, along with great savings, and you will
          realise that Healthy World, India’s largest online supermarket, has revolutionised the way India shops for groceries. Online grocery
          shopping has never been easier. Need things fresh? Whether it’s fruits and vegetables or dairy products, we have this
          covered as well! Hassle-free home delivery options.
        </p>
        </div>
        
            <div className='md:w-1/2 flex flex-wrap gap-5 p-4 items-center justify-center'>
        <img src={tt}
            className='h-80 w-90 pt-2 rounded' />
            </div>
        </div>
        </div>

  )
}

export default About