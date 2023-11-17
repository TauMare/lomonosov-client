import * as React from 'react';
import { useRef } from 'react';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PasswordRounded from '@mui/icons-material/PasswordRounded'
import axios from 'axios';
import '../styles/Login.css'
import { useNavigate } from 'react-router-dom';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const theme = createTheme({
    palette: {
      primary: {
        main: '#E5834C',
      },
    },
  });


function saveToken(request){
    if(request.data.access_token){
        localStorage.setItem('Authentication', request.data.access_token)
    } else{
        throw new Error('No token recieved')
    }
}

function LoginPage(){
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    let navigate = useNavigate();
    const [modalErrorState, setModalErrorState] = React.useState('')
  

    const loginRef = useRef('')
    const pwdRef = useRef('')
    const login = async () => {
        let result = null;
        try {
            result = await axios.post('http://localhost:3001/auth/login', {login: loginRef.current.value, password: pwdRef.current.value});
            saveToken(result)
            navigate('/dashboard', { replace: true })
            console.log(result);
        } catch (err) {
            setModalErrorState(err.response.data.message)
            handleOpen()
            console.log(err.response.data);    
            return
        } 
    }
    const register = async () => {
        // const result = await axios.post('http://localhost:3001/auth/register', {login: loginRef.current.value, password: pwdRef.current.value})  
        // console.log(result);

        let result = null;
        try {
            result = await axios.post('http://localhost:3001/auth/register', {login: loginRef.current.value, password: pwdRef.current.value});
            saveToken(result)
            navigate('/dashboard', { replace: true })
            console.log(result);
        } catch (err) {
            setModalErrorState(err.response.data.message)
            handleOpen()
            console.log(err.response.data);    
            return
        } 
    }


    
    return (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
          >
            <Grid item xs={3}>
              <Box sx={{ p: 2, border: '3px solid #E5834C', borderRadius:'15px' }}>
                <ThemeProvider theme={theme}>
                <Typography variant="h6" component="h2">
                  Holo Streaming Service <br/>Авторизуйтесь.
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField id="input-with-sx" label="Место для логина" variant="standard" inputRef={loginRef}/>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <PasswordRounded sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                  <TextField id="input-with-sx" label="Место для пароля" variant="standard" inputRef={pwdRef} inputProps={{type:'password'}}/>
                </Box>
                <div className='buttonsBox'>
                  
                    <Button variant="outlined" color="primary" onClick={login}>Вход</Button>
                    <Button variant="outlined" color="primary"onClick={register}>Регистрация</Button>
                  
                </div>
                </ThemeProvider>
              </Box>
            </Grid>

            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Произошла ошибка
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {modalErrorState}
                    </Typography>
                    </Box>
                </Modal>
            </div>
          </Grid> 
            /* <div>
            <ReactFlvPlayer
              url = "http://localhost:8000/live/fuckMyAss.flv?sign=1670189000-2047d077c840539d16aadbfcecff5bc2"
              heigh = "800px"
              width = "800px"
              isMuted={true}
              handleError={(err)=>{
                console.log('Возникла ошибка')
                console.log(err)
              }}
            />
          </div> */
      );
}

export default LoginPage;