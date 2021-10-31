

import React, { useEffect, useState } from 'react';
const getData=()=>{
    const localData= localStorage.getItem('mytodolist')
    if(localData){
        return JSON.parse(localData)
    }else{
        return []
    }
}
const Home = ()=>{
    const[input,setInput]=useState("");
    const[item,setItem]=useState(getData);
    const[editItem,setEditItem]=useState('');
    const[togglebtn,seTogglebtn]=useState(false)
   
   
     const Add=()=>{
         if(!input){
             alert("plz fill the data")
         }else if(input && togglebtn){
             setItem(
                 item.map((curElem)=>{
                     if(curElem.id===editItem){
                         return {...curElem,name:input}
                     }
                     return curElem;
                 })
             )
        setInput("");
        setEditItem(null);
        seTogglebtn(false);
         }
         else{
        const newData={
            id:new Date().getTime().toString(),
            name:input
        }
         setItem([...item,newData])
         setInput("");
         }
         
     }
     const deleteThis=(id)=>{
       const updateItem = item.filter((curElem)=>{
           return curElem.id!==id
       })
       setItem(updateItem);
     }
     const removeAll=()=>{
         setItem([]);
     }

     const editThis=(id)=>{
        const editItem = item.find((element)=>{
           return element.id===id
        })
        setInput(editItem.name);
        setEditItem(id);
        seTogglebtn(true);
     }

     useEffect(()=>{
        localStorage.setItem('mytodolist',JSON.stringify(item))
     },[item])


    return (
           <>
           <nav className="w-11/12 lg:w-10/12 mx-auto py-2">
               <div className="flex justify-between items-center">
                <h1 className="text-white text-2xl font-semibold">My ToDo 📝</h1>
                <a href="https://www.instagram.com/sunny674195/"><button className="text-white font-semibold bg-green-500 py-2 px-4 rounded-xl hover:bg-green-400">About me 😎</button></a>
               </div>
            </nav>

            <section className="w-11/12 lg:w-10/12 mx-auto min-h-screen flex justify-center">
                <div className="w-full lg:w-1/2 h-full flex flex-col items-center mt-16 lg:border-2 lg:border-green-500 py-2 px-0 lg:px-4 rounded-lg">
                    <div className="bg-white w-full flex">
                    <input className="outline-none h-full flex-1 bg-transparent px-4 lg:text-lg py-2" 
                    placeholder="✏ Enter the task.."
                    maxLength='25'
                    value={input}
                    onChange={(event)=> setInput(event.target.value)}
                    />
                    {togglebtn? <button 
                    className="text-white font-bold bg-purple-500 py-2 px-4 hover:bg-purple-600"
                    onClick={Add}
                    >Edit</button>: <button 
                    className="text-white font-bold  bg-green-500 py-2 px-4 hover:bg-green-400"
                    onClick={Add}
                    >Add</button>}
                   
                    </div>
                   
                        {item.map((elem,index)=>{
                            return(
                                <div key={index} className="lowercase lg:capitalize w-full py-2 px-1 lg:px-4 text-lg text-white bg-green-500 hover:bg-white hover:text-black mt-6 flex justify-between">
                                    <h1 className="flex-1">{elem.name}</h1>
                                    <i className="fas fa-edit hover:text-green-600 mr-6" onClick={()=>{editThis(elem.id)}}></i>
                                    <i className="fas fa-trash-alt hover:text-red-500" onClick={()=>{deleteThis(elem.id)}}></i>
                                </div>
                            )
                        })
                    }
                 
                    <button onClick={removeAll} className="font-bold bg-transparent border-2 border-green-500 text-white py-3 px-8 rounded-md mt-6 hover:bg-green-400" >CHECK LIST</button>

                </div>

            </section>
              
           </>
        
    )
   }
   
export default Home;