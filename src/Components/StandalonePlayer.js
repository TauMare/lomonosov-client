import * as React from "react";
import { ReactFlvPlayer } from "react-flv-player";
import axios from 'axios';
import { useEffect, useCallback, useState } from 'react';
import Async from "react-async";

const fetchStreamAccessURL = async () => {
    const authKey = localStorage.getItem('Authentication')
        const result = await axios.post('http://localhost:3001/streams/getStreamAccessURL',{inSystemID: props.id} , {
            headers: {
                'Authorization': `Bearer ${authKey}`
            }  
        });
        console.log(result)
}

export default function StandalonePlayer(props){
    
    // const [streamAccessURL, setStreamAccessURL] = useState('');

    // const fetchstreamAccessURL = useCallback(async () => {
    //     const authKey = localStorage.getItem('Authentication')
    //     const result = await axios.post('http://localhost:3001/streams/getStreamAccessURL',{inSystemID: props.id} , {
    //         headers: {
    //             'Authorization': `Bearer ${authKey}`
    //         }  
    //     });
    //     console.log(result)
    //     // setStreamAccessURL("http://localhost:8000" + result.data)
    //     setStreamAccessURL(`http://localhost:8000${result.data}`)
    //     alert(streamAccessURL)
    // }, [])
    // useEffect(()=>{
    //     fetchstreamAccessURL()
    // }, [fetchstreamAccessURL])
    return(
        
        <ReactFlvPlayer
            // url = {url}
            // url = {streamAccessURL}
            url = "http://localhost:8000/live/U2FsdGVkX1+dUoO7nQS77y2b61zsuiAgw1APw1K+J18=.flv?sign=1650852651515-1c4602936dcf45108107aee7a8074108"
            heigh = "800px"
            width = "800px"
            isMuted={true}
            handleError={(err)=>{
                console.log('Возникла ошибка')
                console.log(err)
            }}
        />
    )
}