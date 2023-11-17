import * as React from 'react';
import DashboardMenu from '../Components/DashboardMenu';
import { ReactFlvPlayer } from 'react-flv-player';
import axios from 'axios';
import { useEffect, useCallback, useState } from 'react';
import validate from '../Components/auth';
import { Navigate } from 'react-router-dom';
import '../styles/StandaloneStream.css'
import ReactPlayer from 'react-player';

export default function StandaloneStream(){
    if(validate()){
        const currentID = (window.location.href).split('/streams/')[1];
        const [stream, setStream] = useState([]);
        const [streamAccessURL, setStreamAccessURL] = useState('');
        let isLoading = false;

        const fetchData = useCallback(async () => {
            const authKey = localStorage.getItem('Authentication')
            const result = await axios.post('http://localhost:3001/streams/getStream',{inSystemID: currentID} , {
                headers: {
                    'Authorization': `Bearer ${authKey}`
                }  
            });
            const accessUrl = await axios.post('http://localhost:3001/streams/getStreamAccessURL',{inSystemID: currentID} , {
                headers: {
                    'Authorization': `Bearer ${authKey}`
                }  
            });
            setStreamAccessURL(`http://localhost:8000${accessUrl.data}`)
            setStream(result.data)
            //console.log(result.data);
        }, [])
        
        useEffect(()=>{
            if(!isLoading && stream.length === 0) {
                isLoading = true;
                console.log('ЗАШЛО НА ХУЙ')
                fetchData()
            }
        }, [fetchData, stream, isLoading])

        if(stream.length !== 0){
            console.log('ДАРОВА');
            console.log(stream);
            console.log(streamAccessURL);
            const rawDate = new Date(stream[0].createdAt)
            const clearDate = rawDate.toLocaleString();
            return(
                <div>
                    <DashboardMenu/>
                    <p>Вы смотрите стрим с ID: {stream[0].inSystemID} | {stream[0].id}</p>
                    <p>Стрим создан {clearDate}</p>
                    <div>
                        {/* <ReactFlvPlayer
                            url = {streamAccessURL}
                            showControls = {false}
                            heigh = "80%"
                            width = "80%"
                            isMuted={true}
                            handleError={(err)=>{
                                console.log('Возникла ошибка')
                                console.log(err)
                            }}
                            // enableError= {false}
                        /> */}
                        <ReactPlayer 
                        url={streamAccessURL}
                        playing={true} 
                        width='80%'
                        height='80%'/>
                        <div className='overlayID'>{stream[0].inSystemID}</div>
                    </div>
                </div>
            )
        } else{
            return(
                <div>
                    <h2>Такого стрима не существует</h2>
                </div>
            )
        }
    } else{
        return (
            <Navigate to="/" replace={true} />
        )
    }   
}

/*export default class StandaloneStream extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            streamData: [],
            streamURL: ''
        };
        this.currentID = (window.location.href).split('/streams/')[1];
        this.authKey = localStorage.getItem('Authentication')
    }

    componentDidMount() {
        this.getStreamData();
        this.getStreamURL();
    }

    getStreamData(){
        // const currentID = (window.location.href).split('/streams/')[1]
        // const authKey = localStorage.getItem('Authentication')
        axios.post('http://localhost:3001/streams/getStream',{inSystemID: this.currentID} , {
            headers: {
                'Authorization': `Bearer ${this.authKey}`
            }  
        }) 
            .then(res => {
                let streams = res.data;
                this.setState({streamData: streams})
            });
    }

    getStreamURL(){
        axios.post('http://localhost:3001/streams/getStreamAccessURL',{inSystemID: this.currentID} , {
            headers: {
                'Authorization': `Bearer ${this.authKey}`
            }  
        })
            .then(res => {
                let streamURL = res.data;
                this.setState({streamURL: streamURL})
            });
    }

    render() {
        const currentStream = this.state.streamData
        console.log(currentStream)
        const streamData = this.state.streamData.map((stream)=>{
            // console.log('dsadas')
            // console.log(stream)
            const streamURL = 'http://localhost:8000' + this.state.streamURL
            if(this.state.streamURL !== ''){
                const rawDate = new Date(stream.createdAt)
                const clearDate = rawDate.toLocaleString();
                return(
                    <div key={stream.inSystemID}>
                        <p>Вы смотрите стрим с ID: {stream.inSystemID} | {stream.id}</p>
                        <p>Стрим создан {clearDate}</p>
                        <ReactFlvPlayer
                                url = {streamURL}
                                showControls = {false}
                                heigh = "80%"
                                width = "80%"
                                isMuted={true}
                                handleError={(err)=>{
                                    console.log('Возникла ошибка')
                                    console.log(err)
                                }}
                                // enableError= {false}
                            />
                    </div>
                )
            }
        })
        return(
            <div>
                <DashboardMenu/>
                {streamData}
            </div>
        )
    }
}
*/