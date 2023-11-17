// import logo from './logo.svg';
// import {ReactFlvPlayer} from 'react-flv-player'
import * as React from 'react';
import LoginPage from './pages/Login';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import DashboardPage from './pages/Dashboard';
import ForStreamer from './pages/ForStreamer';
import Streams from './pages/Streams';
import Logout from './pages/Logout';
import Home from './pages/Home';
import StandaloneStream from './pages/StandaloneStream';

// function Home(){
//   return(
//       <div>
//         <h1>Ты - неавторизованное чмо.</h1>
//         <Link to='/login'>Войди </Link>
//         <Link to='/'> или предъяви коммунизм</Link>
//       </div>
//   )
// }

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <header className="App-header">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&family=Montserrat:wght@600&family=Work+Sans:wght@500&display=swap" rel="stylesheet"/>
      </header>
      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="dashboard" element={<DashboardPage/>}/>
        <Route path="dashboard/streams" element={<Streams/>}/>
        <Route path="dashboard/streams/:streamID" element={<StandaloneStream/>}/>
        <Route path="dashboard/forStreamer" element={<ForStreamer/>}/>
        <Route path="dashboard/logout" element={<Logout/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}


export default App;
