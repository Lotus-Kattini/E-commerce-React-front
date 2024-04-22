import axios from 'axios'
import React, { useEffect } from 'react'
import { GOOGLE_CALL_BACK, baseURL } from '../../Api/Api'
import { useLocation } from 'react-router-dom'
import Cookie from 'cookie-universal'

function GoogleCallBack() {
    const location=useLocation();
    const cookie=Cookie()
    useEffect(()=>{
        async function GoogleCall(){
            try{
                const res = await axios.get(`${baseURL}/${GOOGLE_CALL_BACK}/${location.search}`)
                const token=res.data.access_token;
                cookie.set('e-commers',token)
            }
            catch(err){
                console.log(err)
            }
        }
        GoogleCall()
    },[])
  return (
    <h1 style={{textAlign:'center'}}>test</h1>
  )
}

export default GoogleCallBack