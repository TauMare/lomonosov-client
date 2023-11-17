import * as React from 'react';
import DashboardMenu from '../Components/DashboardMenu';
import validate from '../Components/auth';
import { Navigate } from 'react-router-dom';
import '../styles/ForStreamer.css'
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export default function ForStreamer(){
    const [streamKey, setStreamKey] = useState('');

    const fetchData = useCallback(async () => {
        const authKey = localStorage.getItem('Authentication')
        const result = await axios.get('http://localhost:3001/streams/getKey', {
            headers: {
                'Authorization': `Bearer ${authKey}`
              }   
        });
        console.log(result)
        setStreamKey(result.data)
    }, [])

    if(validate()){
        useEffect(()=>{
            fetchData()
        }, [fetchData])
        // const key = await getKey(localStorage.getItem('Authentication'))
        // setStreamKey(key) 
        // const getKey = async () => {
        //     const authKey = localStorage.getItem('Authentication')
        //     const result = await axios.get('http://localhost:3001/streams/getKey', {
        //         headers: {
        //             'Authorization': `Bearer ${authKey}`
        //         }   
        //     });
        //     console.log(result)
        //     return result.data
        // }
        
        return(
            <div>
                <DashboardMenu/>
                <h2>Это страница с функциональностью для ведущего поток.</h2>
                <h3>Ваш индивидуальный ключ доступа трансляции: {streamKey} </h3>
                <h3>Сервер для приема трансляции: rtmp://localhost/live </h3>
            </div>
        )
    } else {
        return (
            <Navigate to="/" replace={true} />
        )
    }
}