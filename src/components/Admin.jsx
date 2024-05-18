import React, { useEffect , useState } from 'react'
import { deleteDoc , doc, getDocs } from 'firebase/firestore'
import { db } from '../Firebase/config';
import { collection } from 'firebase/firestore';
import loader from '../assets/Pulse@1x-1.0s-200px-200px.gif'
import AddProd from './utils/AddProd';
import UpdateProd from './utils/UpdateProd'
import { update } from 'lodash';

const Admin = () => {
    const [Products , setProducts] = useState([]);
    const ProductsCollection = collection(db , "Products")
    const [sidebarState , setSidebarState] = useState(false)
    const [activeState , setActiveState]  = useState(false)
    const [search , setSearch] = useState("")
    const [addState , setAddState] = useState(false)
    const [Update , setUpdate] = useState(false)
    const [item , setItem] = useState({
        setUpdate: setUpdate,
        Name: "",
        Price: "",
        rating: "",
        Category: "",
        color: "",
        shadow: "",
        id: ""
    }
    )
    const DeleteProduct = async (id) => {
        console.log(id);
        const d = doc(db , "Products" , id);
        await deleteDoc(d);
        window.location.reload();
    }
    useEffect(() => { 
        async function getData(){
            const data = await getDocs(ProductsCollection);
            setProducts(data.docs.map(doc => ({...doc.data() , id: doc.id})));
        }
        getData()
        
    } , [])
    
    const HandleUpdate = (id , name , Category , price , shadow , color , rating) => {
        setItem(
            {
                setUpdate: setUpdate,
                Name: name,
                Price: price,
                rating: rating,
                Category: Category,
                color: color,
                shadow: shadow,
                id: id
            }
        )
        setUpdate(true);
    }

    return (
    <div className='h-screen flex flex-col'>
        <header className='flex h-14 w-full bg-slate-200 px-5 border-b-2 border-b-gray-300 items-center gap-8'>
            <button className='button-theme p-2 ml-3' onClick={() => setSidebarState(!sidebarState)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
            <h1 className='text-xl '>Admin</h1>
        </header>
        <div className={`  body flex h-full relative`} >
            <div className={` ${sidebarState ? "left-0" : "left-[-225px]"} w-[225px] p-2 bg-slate-100 transition-all absolute h-[100%]`}>

                
                
                <div className="pages flex flex-col mt-5">
                    <button className={`${activeState ? "text-gradient" : ""} ${sidebarState ? "block" : "hidden"} w-full pl-2 text-start  h-11 hover:bg-gray-100 transition-all`} onClick={() => setActiveState(true)}>
                        Dashboard
                    </button>
                    <button className={`${activeState ? "" : "text-gradient"} ${sidebarState ? "block" : "hidden"} w-full pl-2 text-start h-11 hover:bg-gray-100 transition-all`} onClick={() => setActiveState(false)}>
                        Manage Products
                    </button>
                </div>


            </div>
            <div className='flex-1 px-10 py-5 sm:p-2' >
                <div className='flex justify-between' >
                    <h2>
                        Manage products
                    </h2>
                    <button className='button-theme hover:text-gradient transition-all' onClick={() => setAddState(true)}>
                        Add Product
                    </button>
                </div>

                <div className='prodcuts mt-10 border-black border-2 rounded-lg'>
                    <div className='head flex justify-between p-5'>
                        <h3>Prodcuts List</h3>
                        <input type='text' className='w-[175px] sm:w-[125px] h-8 rounded-full px-5 bg-slate-200 focus:outline-none' placeholder='Search' onChange={(e) => setSearch(e.target.value)}/>
                    </div>
                    <table className='w-full'>
                        <tr className='bg-slate-200 h-10'>
                            <th className='w-[25%] '>Name</th>
                            <th className='w-[20%] '>Price</th>
                            <th className='w-[10%] '>Rate</th>
                            <th className='w-auto'> </th>
                        </tr>
                        {Products.length > 0 ? Products.map(prod => {
                            if(prod?.Name?.toLowerCase().indexOf(search.toLowerCase()) > -1){
                            return(
                            <tr className='h-12' key={prod?.id}>
                                
                                <th className='text-xs'>{prod?.Name}</th>
                                <th className='text-xs'>{prod?.price}$</th>
                                <th className='text-xs'>{prod?.rating}</th>
                                <th className='flex flex-row-reverse h-12 items-center gap-5 px-2'>
                                    <button className='button-theme hover:text-gradient sm:px-2 sm:py-1' onClick={() => HandleUpdate(prod?.id , prod?.Name, prod?.Category , prod?.price , prod?.shadow , prod?.color , prod?.rating)}>Edit</button>
                                    <button className='button-theme hover:text-red-500 sm:px-2 sm:py-1' onClick={() => DeleteProduct(prod.id)}>Delete</button>
                                </th>
                            </tr>
                            )
                            } else return null
                        }) : null 
} 
                    </table>

                    {Products.length === 0 ? 
                            <div className='flex w-full '>
                                <img src={loader} className='m-auto w-20' alt='loading'/>
                            </div> : null
                    }
                </div>

            </div>
            {
                addState ?
                <AddProd setPopup={setAddState}/> 
                : null
            }
            {
                Update ?
                <UpdateProd data={item}/> : 
                null
            }
        </div>
    </div>
  )
}

export default Admin