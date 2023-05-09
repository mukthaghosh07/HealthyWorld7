import React, { useState } from 'react'
import signupimg from '../fruitStore/login.gif'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { ImagetoBase64 } from '../utility/ImagetoBase64'
const Signup = () => {
  const navigate = useNavigate()  

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image : ""
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  console.log(process.env.REACT_APP_SERVER_DOMAIN)
  const handleSubmit = async(e) => {
    e.preventDefault()
    const { firstName, email, password, confirmPassword } = data;
    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchData =await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`,{
        method : "POST",
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })

      const dataRes = await fetchData.json()
       console.log(dataRes)
        
       //alert(dataRes.message)
       toast(dataRes.message)
       if(dataRes.alert){
        navigate("/login")

       }

      }
      else {
        alert("password and confirm password not equal");
      }
    } else {
      alert("Please Enter required fields");
    }
    }
    const handleUploadProfileImage = async(e)=>{
     
  const data =await ImagetoBase64(e.target.files[0])
 console.log(data)
 setData((preve)=>{
  return{
    ...preve,
    image:data
  }
 })
     

  }


  
  return (
    <div className='p-3 md:p-4'>
        <div className='w-full max-w-sm bg-white m-auto flex  flex-col p-4'>
        <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
          <img src={data.image ? data.image: signupimg} className="w-full h-full" />
          <label htmlFor="profileImage">
          <div className="absolute bottom-0 h-1/3  bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
            <input type={"file"} id="profileImage" accept="image/*" className="hidden" onChange={handleUploadProfileImage}/>
            </label>
          </div>
        
        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>

        
        <label htmlFor="firstName">First Name</label>
          <input type={"text"} id="firstName" name="firstName"
           className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300" value={data.firstName} onChange={handleOnChange} />
         <label htmlFor="lastName">Last Name</label>
          <input type={"text"} id="lastName" name="lastName"
           className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300" value={data.lastName} onChange={handleOnChange} />
            <label htmlFor="email">Email</label>
          <input type={"email"} id="email" name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300" value={data.email} onChange={handleOnChange}/>
            <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300" value={data.password} onChange={handleOnChange}>
            <input type={ "password"} id="password" name="password"
              className=" w-full bg-slate-200 border-none outline-none "/>
        </div>
        <label htmlFor="confirmpassword">Confirm Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2  focus-within:outline focus-within:outline-blue-300 "value={data.confirmPassword} onChange={handleOnChange}>
            <input type={"password"} id="confirmpassword" name="confirmPassword"
              className=" w-full bg-slate-200 border-none outline-none "/>
    </div>
    <button className="w-full max-w-[150px] m-auto  bg-blue-500 hover:bg-blue-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Sign up
          </button>
          </form>
          <p className="text-left text-sm mt-2">
          Already have account ?{" "}
          <Link to={"/login"} className="text-blue-500 underline">
            Login
          </Link>
        </p>
    </div>
    </div>
  )
}

export default Signup