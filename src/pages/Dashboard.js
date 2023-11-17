import * as React from 'react';
import { Navigate } from 'react-router-dom';
import validate from '../Components/auth';
import DashboardMenu from '../Components/DashboardMenu';
import someEmoji from '../Images/8206-pepe-simp.gif'
import { Grid } from '@mui/material';

function DashboardPage(){
    if(validate()){
        return (
            <div>
                <DashboardMenu/>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100vh' }}
                    >
                    <h1>Панель управления</h1>
                    <img src={someEmoji} style={{width:'300px',height:'300px'}} alt="Some emoji"></img>
                    <h2 style={{textAlign:'center'}}>Это главная страница Вашей личной панели управления. <br/>Выберите один из разделов выше или нажмите на свой профиль <br/>в правом верхнем углу, чтобы его редактировать.</h2>
                </Grid> 
            </div>
        )
    } else {
        return (
            <Navigate to="/" replace={true} />
        )
    }
    
}

export default DashboardPage