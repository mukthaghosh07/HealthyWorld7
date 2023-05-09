import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import HomeCard from '../cmponent/HomeCard';
import CardFeature from '../cmponent/CardFeature';
import add from '../fruitStore/add.gif'
import {GrFormNext,GrFormPrevious} from 'react-icons/gr'
import FilterProduct from '../cmponent/FilterProduct';
import AllProduct from '../cmponent/AllProduct';
const Home = () => {
  const productData = useSelector((state) => state.product.productList);
  console.log(productData)
  const homeProductCartList = productData.slice(8, 11);
  const homeProductCartListVegetables = productData.filter(
    (el) => el.category === "vegetable",
    []
  )
  console.log(homeProductCartListVegetables)
  const loadingArray = new Array(4).fill(null);
  const loadingArrayFeature = new Array(10).fill(null);

  const slideProductRef = useRef();
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const preveProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  

  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-3'>
        <div className='md:w-1/2 py-4 '>
          <div className='flex gap-3 bg-slate-300 rounded-full w-32'>
            <p className='text-sm px-3 font-medium'>Fastest Delivery....</p>
            <img src='https://i.pinimg.com/474x/01/9d/df/019ddf9d6e02ecf44ed6459a597aa977--organic-food-delivery-organic-fruits-and-vegetables.jpg'
              className='h-10 rounded-full ' />
          </div>
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
          <button className='w-full max-w-[150px] m-auto py-1 rounded-full  mt-4   bg-green-600  hover:bg-green-400 text-xl   font-medium text-center cursor-pointer'>
            Order Now
          </button>
        </div>
        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
          {
            homeProductCartList[0] ? homeProductCartList.map(el => {
              return (
                <HomeCard
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}

                />
              )
            })
            :
            loadingArray.map((el, index) => {
              return <HomeCard key={index+"loading"} loading={"Loading..."} />;
            })}
          
          <img src={add}
            className='h-50 w-80 pt-2 rounded' />

        </div>

      </div>
      <div className=''>
        <div className='flex w-full items-center'>
        <h2 className="font-bold text-2xl text-slate-800 mb-4"> Fresh Vegetables</h2>
        <div className='ml-auto flex gap-4'>
          <button onClick={preveProduct}  className=" hover:bg-slate-400 text-lg  p-1 rounded" >
            <GrFormPrevious/>
          </button >
          <button onClick={nextProduct} className=" hover:bg-slate-400 text-lg  p-1 rounded">
            <GrFormNext/>
          </button>
        </div>
        </div>
        <div className="ml-auto flex gap-4 overflow-scroll scrollbar-none" ref={slideProductRef}>
          {
            homeProductCartListVegetables[0] ? homeProductCartListVegetables.map(el => {
              return (
                <CardFeature
                  key={el._id+"vegetable"}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}

                />
              )
            })
            :

            loadingArrayFeature.map((el,index) => (
              <CardFeature loading="Loading..." key={index+"cartLoading"} />
            ))}

        </div>
      </div>


<AllProduct heading={"Products"}/>




      
    </div>
  )
}

export default Home