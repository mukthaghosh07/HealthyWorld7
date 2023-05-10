import logo from './logo.svg';
import './App.css';
import Header from './cmponent/Header';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDataProduct } from './redux/productSlide';

function App() {

  const dispatch = useDispatch()
  const productData = useSelector((state)=>state.product)
  console.log(productData)
  useEffect(()=>{
    (async()=>{
      const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/product`)
      const resData = await res.json()
      dispatch(setDataProduct(resData))
     // console.log(resData)
    })()
  },[])
  return (
    <>
    <Toaster/>
      <div>
        <Header />
        <main className='pt-16'>
          <Outlet />
        </main>
      </div>
    </>


  );
}

export default App;
