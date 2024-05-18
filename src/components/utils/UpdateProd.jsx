import React from 'react'
import { useState } from 'react'
import { collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../Firebase/config';
import { addDoc } from 'firebase/firestore';

const AddProd = ({ 
    data 
}) => {
    const [name , setName] = useState(data.Name);
    const [price , setPrice] = useState(data.Price);
    const [Category , setCategory] = useState(data.Category)
    const [Rating , setRating] = useState(data.rating)
    const [Shadow , setShadow] = useState(data.shadow)
    const [color , setColor] = useState(data.color)
    const [path , setPath] = useState("")
    const ProductsCollection = collection(db , "Products")


    const UpdateProduct = async () => {
        const ProductDoc = doc(db , "Products" , data.id);
        await updateDoc(ProductDoc , {Name : name , Price: price , Category : Category , rating : Rating , shadow: Shadow , color : color , Path : path})
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
                <input defaultValue={data.Name} onChange={(e) => setName(e.target.value)} type="text"   placeholder='Product  Name' className='p-2 w-[80%] focus:outline-none bg-slate-200'/>
                <input defaultValue={data.Price} onChange={(e) => setPrice(e.target.value)} type="number"  placeholder='Price' className='p-2 w-[80%] focus:outline-none bg-slate-200'/>
                <input defaultValue={data.rating} onChange={(e) => setRating(e.target.value)} type="text"  placeholder='Rating'  className='p-2 w-[80%] focus:outline-none bg-slate-200'/>
                <input defaultValue={data.Category} onChange={(e) => setCategory(e.target.value)} type="text"  placeholder='Category' className='p-2 w-[80%] focus:outline-none bg-slate-200'/>
                <input  onChange={(e) => setPath(e.target.value)} type="text"  placeholder='Path' className='p-2 w-[80%] focus:outline-none bg-slate-200'/>
                <input defaultValue={data.shadow} onChange={(e) => setShadow(e.target.value)} type="text"  placeholder='Shadow' className='p-2 w-[80%] focus:outline-none bg-slate-200'/>
                <input defaultValue={data.color} onChange={(e) => setColor(e.target.value)} type="text"  placeholder='color' className='p-2 w-[80%] focus:outline-none bg-slate-200'/>
            </div>

            <div className='btns flex justify-center gap-2 my-4'>
                <button className='button-theme' onClick={() => data.setUpdate(false)}>Cancel</button>
                <button className='button-theme' onClick={() => UpdateProduct()}>Update Product</button>
            </div>
        </form>
    </div>
  )
}

export default AddProd