import * as React from 'react';
import DashboardMenu from '../Components/DashboardMenu';
import validate from '../Components/auth';
import { Navigate } from 'react-router-dom';
import { Grid, styled, Paper, Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: 180
  }));
  

export default function Streams(){
    if(validate()){
        const [streams, setStreams] = useState([]);
        const navigate = useNavigate();
        let isLoading = false;

        const fetchData = useCallback(async () => {
            const authKey = localStorage.getItem('Authentication')
            const result = await axios.get('http://localhost:3001/streams/getStreams', {
                headers: {
                    'Authorization': `Bearer ${authKey}`
                }   
            });
            console.log(result)
            setStreams(result.data)
        }, [])

        useEffect(()=>{
            if(!isLoading && streams.length === 0) {
                isLoading = true;
                fetchData()
            }
            
        }, [fetchData])

        const navigateToStream = (link) => {
            navigate(link)
          };
        // const streams = [
        //     {
        //         "id": 5,
        //         "inSystemID": "H587B9P7",
        //         "status": "started",
        //         "login": "1",
        //         "streamKey": "U2FsdGVkX1/N8ZgRSkU5ux8fUZtmYuDsZcBE7vXX/nw=",
        //         "createdAt": "2022-04-24T00:33:44.214Z",
        //         "endedAt": null
        //     }
        // ]
        console.log('DAROVKI')
        return(
            <div>
                <DashboardMenu/>
                <h1>Это страница, на которой будут все прямые трансляции.</h1>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {streams.map((stream) => (
                        <Grid key={stream.inSystemID} item xs={3}>
                            <Item key={stream.inSystemID}>
                                <h3 style={{textAlign: 'center', marginRight: '30px'}}>Трансляция: {stream['inSystemID']}</h3>
                                <h3 style={{textAlign: 'center', marginRight: '30px'}}>Автор: {stream['login']}</h3>
                                <Button variant="outlined" onClick={navigateToStream.bind(this, stream['inSystemID'])}>Смотреть</Button>
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </div>
        )
    } else {
        return (
            <Navigate to="/" replace={true} />
        )
    }
}

