"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCookies } from "react-cookie";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const Home = () => {

  const router = useRouter();
  const user = useSelector((state:{user:String}) => state.user)
    const checkCookieauth = async () => {
      try {
        const {data} = await axios.get('/api/auth/getAllUser',{withCredentials:true});
        console.log(data)
        console.log(user)
      } catch (error) {
        console.error('Verification error:', error);
        // router.push('/Login');
      }
    }

  return (
    <>
    <div>
      Home
      <button onClick={checkCookieauth}>get my id</button>
    </div>
    </>
  )
}

export default Home