import React, { useEffect, useState } from 'react'

export const ErrorPage = () => {
    const [loading,setLoading] = useState(true)
    const setLoadingFun = ()=>{
        setLoading(false)
    }
    const loadingFunction = () =>{
        setTimeout(setLoadingFun,1200)
    }
    useEffect(()=>{
        loadingFunction()   
    },[])
  return (
    <>
    {loading ? <h1>Loading...</h1> : <h1>Page Not Found</h1>}
    </>
  )
}
