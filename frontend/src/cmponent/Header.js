import React, { useState } from 'react'
import logo from "../fruitStore/logo.png"
import { Link } from 'react-router-dom'
import { FaRegUserCircle } from 'react-icons/fa'
import { HiShoppingCart } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRedux } from '../redux/userSlice'
import { toast } from 'react-hot-toast'
const Header = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  console.log(userData.email)

  const handleShowMenu = () => {
    setShowMenu((preve) => !preve);
  };
  const handleLogout = () => {
    dispatch(logoutRedux())
    toast("Logout Succesfull!!")
  };
  const cartItemNumber = useSelector((state)=>state.product.cartItem)
  return (
    <header>
      <div className='fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white'>
        {/* desktop*/}

        <div className='flex items-center h-full justify-between'>
          <Link to={""}>
            <div className="h-14">
              <img src={logo} className="h-full cursor-pointer" />
            </div>
          </Link>


          <div className='flex items-center gap-4 md:gap-6'>
            <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
              <Link to={""}> Home</Link>
              <Link to={"menu/6458ea7f37f78cee5e7ff74f"}>  Menu</Link>
              <Link to={"about"}> About</Link>
              <Link to={"contact"}>  Contact</Link>
            </nav>
            <div className='text-2xl text-slate-600 relative cursor-pointer'>
            <Link to={"cart"}>
              <HiShoppingCart />
              <div className='absolute -top-1 -right-1 text-white bg-red-600 h-4 w-4 rounded-full m-0 p-0 text-sm text-center'>
                {cartItemNumber.length}
              </div>
              </Link>

            </div>
            <div className='text-2xl text-slate-600 relative cursor-pointer' onClick={handleShowMenu}>
              <div className='text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md' >
                {userData.image ?
                  <img src={userData.image} className="h-full w-full" /> :

                  <FaRegUserCircle />
                }
              </div>
              {
                showMenu && (<div className='absolute right-2 bg-white py-2 text-sm px-2 shadow drop-shadow-md flex flex-col min-w-[120px]'>
                 {
                  userData.email === process.env.REACT_APP_ADMIN_EMAIL && <Link to={"newproduct"} className='whitespace-nowrap'> New Product </Link>

                 }
                  {
                    userData.email ? <p className="cursor-pointer text-red-600 font-bold  px-2" onClick={handleLogout}>LogOut ({userData.firstName})</p> : <Link to={"login"} className='whitespace-nowrap'> Login</Link >

                  }
                      <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="px-2 py-1">
                    Home
                  </Link>
                  <Link to={"menu"}  className="px-2 py-1">Menu </Link>
                  <Link to={"about"} className="px-2 py-1">About</Link>
                  <Link to={"contact"} className="px-2 py-1">Contact</Link>
                </nav>

                </div>
                )}

            </div>
          </div>
        </div>
      </div>



      {/*header */}
    </header>
  )
}

export default Header