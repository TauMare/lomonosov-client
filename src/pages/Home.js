import * as React from 'react'
import { Button } from '@mui/material'
import '../styles/Home.css'
import backgroundImage from '../Images/bckgr.svg'
import { createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import { useNavigate } from 'react-router-dom'


export default function Home(){
    let navigate = useNavigate();
    const theme = createTheme({
        palette: {
          primary: {
            main: '#E5E5E5',
          },
        },
      });

    const forwardToLoginPage = () => {
        window.history.pushState({}, undefined, "/login")
        navigate('/login', { replace: true })
    }

    return(
        <div>
            <img className='backgroundImage' src={backgroundImage} alt='background'></img>
            <div className='welcomeHeaderContainer'>
                <h1 className='welcomeText'>
                    Добро пожаловать в holo!
                </h1>
            </div>
            
            <div className='welcomeHeaderContainer'>
                <div className='whiteBox'></div>
                <h2 className='welcomeSubText'>
                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquet purus vitae fermentum porttitor. Morbi non leo posuere, varius erat et, fermentum tellus. Phasellus fringilla erat non velit.
                </h2>
            </div>

            <div className='loginButtonContainer'>
                <ThemeProvider theme={theme}>
                    <Button className='loginButton' variant="outlined" color="primary" onClick={forwardToLoginPage}>Войти/зарегистрироваться</Button>
                </ThemeProvider>
            </div>
        </div>
    )
}