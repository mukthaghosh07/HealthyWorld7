import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import FilterProduct from '../cmponent/FilterProduct';
import CardFeature from './CardFeature';
const AllProduct = ({heading}) => {
    const productData = useSelector((state) => state.product.productList);
    const loadingArrayFeature = new Array(10).fill(null);
    const categoryList =[...new Set(productData.map(el =>el.category))]
    console.log(categoryList)
  
  
    const [filterby, setFilterBy] = useState("");
    const [dataFilter, setDataFilter] = useState([]);
  
    useEffect(() => {
      setDataFilter(productData);
    }, [productData]);
  
    const handleFilterProduct = (category) => {
      setFilterBy(category)
      const filter = productData.filter(
        (el) => el.category.toLowerCase() === category.toLowerCase()
      );
      setDataFilter(() => {
        return [...filter];
      });
    };



  return (
    <div className='my-5'>
        <h2 className="font-bold text-2xl text-slate-800 mb-4">  {heading}</h2>

        <div className='flex gap-5 justify-center overflow-scroll scrollbar-none'>
          {
            categoryList[0] ? categoryList.map(el=>{
              return(
                <FilterProduct category={el} key={el} isActive={el ===filterby} onClick={()=>handleFilterProduct(el)}/>
              )
            })

            : (
              <div className="min-h-[150px] flex justify-center items-center">
                <p>Loading...</p>
              </div>
         ) }
        </div>
        <div className="flex flex-wrap justify-center gap-4 my-4">
        {dataFilter[0]
          ? dataFilter.map((el) => {
              return (
                <CardFeature
                  key={el._id}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                />
              );
            })
          : 
          loadingArrayFeature.map((el,index) => (
              <CardFeature loading="Loading..." key={index+"allProduct"} />
            ))}
      </div>
    </div>
  )
}

export default AllProduct