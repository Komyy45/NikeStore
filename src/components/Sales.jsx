import React from 'react'
import Item from './utils/Item'
import Title from './utils/Title' 
import {  getDocs , collection} from 'firebase/firestore'
import { db } from '../Firebase/config';
import loader from '../assets/Pulse@1x-1.0s-200px-200px.gif'
import { useEffect , useState } from 'react';

const Sales = ({ ifExists, endpoint: { title, items }  , Top}) => {
  const [Products , setProducts] = useState([]);
  const ProductsCollectionRef = collection(db , "Products");
  const [category , setCategory] = useState("All");

  useEffect(() =>{
    async function getData(){
      const data = await getDocs(ProductsCollectionRef);
      setProducts(data.docs.map(doc => ({...doc.data() , id: doc.id})));
      console.log(Products)
  }
  getData()
  }, [])

  return (
    <>
      <div className='nike-container'>
        <Title title={title} />
{ Top ?        <div className='Categories flex w-full justify-center gap-8 my-6 flex-wrap'>
          <button className={`button-theme ${category === "All" ? "text-gradient" : ""}`} onClick={() => setCategory("All")}>
            All Categories
          </button>
          <button className={`button-theme ${category === "Running" ? "text-gradient" : ""}`} onClick={() => setCategory("Running")}>
            Running
          </button>
          <button className={`button-theme ${category === "Fashion" ? "text-gradient" : ""}`} onClick={() => setCategory("Fashion")}>
            Fashion
          </button>
          <button className={`button-theme ${category === "Jordan" ? "text-gradient" : ""}`} onClick={() => setCategory("Jordan")}>
            Jordan
          </button>
          <button className={`button-theme ${category === "SB" ? "text-gradient" : ""}`} onClick={() => setCategory("SB")}>
            SB
          </button>
        </div>: null}
        <div className={`grid items-center justify-items-center gap-7 lg:gap-5 mt-7 ${ifExists ? 'grid-cols-3 xl:grid-cols-2 sm:grid-cols-1' : 'grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'}`}>
          {Products?.map((item, i) => {
              if(!Top && i > 2) return null
              if(item?.Category === category || category === "All")
              return <Item {...item} img={items[Math.floor(Math.random() * items.length)]?.img} key={i} />
              else return null
          })
          }
        </div>
      </div>
   </>
  )
}

export default Sales