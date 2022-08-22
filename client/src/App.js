import './App.css';
import Toolbar from './Toolbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/Login-Page/LoginPage';
import ErrorPage from './pages/Error-Page/ErrorPage';
import RegisterPage from './pages/Register-Page/RegisterPage';
import AboutUsPage from './pages/AboutUs-Page/AboutUsPage';
import SettingsPage from './pages/Settings-Page/SettingsPage';
import ForgotPasswordPage from './pages/ForgotPassword-Page/ForgotPasswordPage';
import BlogPage from './pages/Blog-Page/BlogPage';
import Footer from './Footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const [backendData, setBackendData] = useState(undefined)
  const url="http://localhost:5000"

  useEffect(() => {
    getUsers();
  },[])

  const getUsers =() => {
    axios.get(`${url}/api`)
      .then((response) => {
        const users=response.data.users;
        setBackendData(users);
      })
      .catch((error) => {
        console.error(`ERROR: ${error}`);
      });
  }

  return (
    <div className="App">
      <Toolbar />

      {( backendData == undefined) ?
        (<p>Lodaing...</p>) :
        (backendData.map((user, i) => (
          <p key={i}>{user}</p>)
        ))}
        

      <Router>
        <Routes>
          <Route path='/Settings' element={<SettingsPage />} />
          <Route path='/' element={<LoginPage />} />
          <Route path='/Register' element={<RegisterPage />} />
          <Route path='/About-Us' element={<AboutUsPage />} />
          <Route path='/Forgot-my-password' element={<ForgotPasswordPage />} />
          <Route path='/Blog/:username' element={<BlogPage />} />
          <Route path=':page' element={<ErrorPage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}


export default App;
