import React from "react";
import { HiMinus, HiPlusSm } from 'react-icons/hi'
import {MdDelete} from 'react-icons/md'
import { useDispatch } from "react-redux";
import { decreaseQty, deleteCartItem, increaseQty } from "../redux/productSlide";

const CartProduct = ({ id, name, image, category, qty, total, price }) => {
const dispatch=useDispatch()
  return (
    <div className="bg-slate-200 p-2 flex gap-4 rounded border border-slate-100">
      <div className="p-3 bg-white rounded overflow-hidden">
        <img src={image} className="h-full w-40 object-cover " />

      </div>
      <div className='w-full '>
        <div className='flex justify-between '>
        <h3 className="font-semibold text-slate-600 capitalize text-lg md:text-xl">
          {name}
        </h3>
       <div className='cursor-pointer text-slate-700 hover:text-red-600 'onClick={()=>dispatch(deleteCartItem(id))}>
        <MdDelete/>
       </div>
        </div>
        <p className=" text-slate-500  font-medium text-m">{category}</p>

        <p className=" font-bold ">
          <span className="text-red-500 text-m">₹</span>
          <span>{price}</span>
        </p>
        <div className='flex justify-between '>
          <div className='flex gap-4 items-center'>
            <button onClick={()=>dispatch(increaseQty(id))} className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1">
              <HiPlusSm />

            </button>
            <p className='font-bold p-1'>{qty}</p>
            <button onClick={()=>dispatch(decreaseQty(id))} className="bg-slate-300 py-1 mt-2 rounded hover:bg-slate-400 p-1">
              < HiMinus />
            </button>

          </div>
          <div className='flex items-center font-bold text-slate-600'>
          
            <p>Total- </p>
            <span className="text-red-500">₹</span>
            <p>{total}</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CartProduct;