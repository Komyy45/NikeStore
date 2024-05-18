import React from 'react'
import { useState } from 'react'
import { collection } from 'firebase/firestore';
import { db } from '../../Firebase/config';
import { addDoc } from 'firebase/firestore';

const AddProd = ({ setPopup }) => {
    const [name , setName] = useState("");
    const [price , setPrice] = useState(0);
    const [Category , setCategory] = useState("")
    const [Rating , setRating] = useState("")
    const [Shadow , setShadow] = useState("")
    const [color , setColor] = useState("")
    const [path , setPath] = useState("")
    const ProductsCollection = collection(db , "Products")




    const AddProduct = async () => {
        await addDoc(ProductsCollection , {Name : name , price: price , Category : Category , rating : Rating , shadow: Shadow , color : color , Path : path})
        window.location.reload();
    }
    const prevent = (e) => {
        e.preventDefault()
    }
    return (
    <div >
        <div className='overlay fixed top-0 left-0 w-full h-screen bg-black opacity-50'></div>
        <form className='fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white w-[350px] rounded-lg' onSubmit={(e) => prevent(e)} >
            <h3 className='text-gradient w-full text-center font-bold my-2'>
                Product Details
            </h3>

            <div className='flex flex-col justify-center gap-2 items-center '>
                <input onChange={(e) => setName(e.target.value)} type="text"  placeholder='Product  Name' className='p-2 w-[80%] focus:outline-none bg-slate-200'/>
                <input onChange={(e) => setPrice(e.target.value)} type="number"  placeholder='Price' className='p-2 w-[80%] focus:outline-none bg-slate-200'/>
                <input onChange={(e) => setRating(e.target.value)} type="text"  placeholder='Rating'  className='p-2 w-[80%] focus:outline-none bg-slate-200'/>
                <input onChange={(e) => setCategory(e.target.value)} type="text"  placeholder='Category' className='p-2 w-[80%] focus:outline-none bg-slate-200'/>
                <input onChange={(e) => setPath(e.target.value)} type="text"  placeholder='Path' className='p-2 w-[80%] focus:outline-none bg-slate-200'/>
                <input onChange={(e) => setShadow(e.target.value)} type="text"  placeholder='Shadow' className='p-2 w-[80%] focus:outline-none bg-slate-200'/>
                <input onChange={(e) => setColor(e.target.value)} type="text"  placeholder='color' className='p-2 w-[80%] focus:outline-none bg-slate-200'/>
            </div>

            <div className='btns flex justify-center gap-2 my-4'>
                <button className='button-theme' onClick={() => setPopup(false)}> Cancel</button>
                <button className='button-theme' onClick={() => AddProduct()}> Add Product</button>
            </div>
        </form>
    </div>
  )
}

export default AddProd