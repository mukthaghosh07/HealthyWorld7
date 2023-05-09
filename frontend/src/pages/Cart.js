import React from 'react'
import { useSelector } from 'react-redux';
import CartProduct from '../cmponent/cartProduct';
import emptyCartImage from '../fruitStore/emptycart.gif'
import { toast } from 'react-hot-toast';
import {loadStripe} from '@stripe/stripe-js';
import {useNavigate} from 'react-router-dom'
const Cart = () => {

    const productCartItem = useSelector((state) => state.product.cartItem);
    console.log(productCartItem)
    const user = useSelector(state => state.user)
    console.log(user)

    const navigate =useNavigate()
    const totalPrice = productCartItem.reduce(
        (acc, curr) => acc + parseInt(curr.total),
        0
    );
    const totalQty = productCartItem.reduce(
        (acc, curr) => acc + parseInt(curr.qty),
        0
    );

       


const handlePayment =async()=>{
 if(user.email){
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
    const res =await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/checkout-payment`,{
        method : "POST",
        headers  : {
            "content-type" : "application/json"
          },
          body  : JSON.stringify(productCartItem)
    }
    )
    if(res.statusCode === 500) return;
    const data = await res.json()
    console.log(data)
    
    toast("Redriect to payment...")
    stripePromise.redirectToCheckout({sessionId : data})
 }
   else{
    toast("Before Payment ...please login! ")
    setTimeout(()=>{
        navigate("/login")
    },1000)
   } 

}




    return (
        <>
        
            <div className="p-2 md:p-4">

                <h2 className="text-lg md:text-2xl font-bold text-slate-600">
                    Your Cart Items
                </h2>
                {productCartItem[0] ?
                <div className='my-5 md:flex'>
                    {/* dispaly cart */}
                    <div className="w-full max-w-3xl ">
                        {
                            productCartItem.map((el) => {
                                return (

                                    <CartProduct
                                        key={el._id}
                                        id={el._id}
                                        name={el.name}
                                        image={el.image}
                                        category={el.category}
                                        qty={el.qty}
                                        total={el.total}
                                        price={el.price}

                                    />
                                );
                            })}
                    </div>


                    {/*total cart */}
                    <div className=' w-full py-5  max-w-md ml-auto '>
                        <h2 className='text-green-700 font-bold text-3xl bg-slate-300 p-2 pl-3 '> Summary</h2>
                        <div className='flex w-full py-2 text-lg border-b'>
                            <p> Total Item : </p>

                            <p className='ml-auto w-32 font-bold '>   <span className="text-black-500"></span> {totalQty} </p>


                        </div>
                        <div className="flex w-full py-2 text-lg border-b">
                            <p>Total Price</p>
                            <p className="ml-auto w-32 font-bold">    <span className="text-red-500">₹</span> {totalPrice} </p>
                        </div>
                        <button className="bg-green-500 hover:bg-green-600 w-full text-lg font-bold py-2 text-white" onClick={handlePayment}>
                            Proceed to Pay</button>

                    </div>
                </div>
                :
                <>
                <div className="flex w-full justify-center items-center flex-col">
                  <img src={emptyCartImage} className="w-full max-w-sm"/>
                  <p className="text-green-600 text-3xl font-bold">Your cart is Empty....</p>
                </div>
              </>
}
            </div>

        </>

    )
}

export default Cart