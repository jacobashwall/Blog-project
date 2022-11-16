import './App.css';
import Toolbar from './Toolbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './pages/Login-Page/LoginPage';
import ErrorPage from './pages/Error-Page/ErrorPage';
import RegisterPage from './pages/Register-Page/RegisterPage';
import AboutUsPage from './pages/AboutUs-Page/AboutUsPage';
import SettingsPage from './pages/Settings-Page/SettingsPage';
import ForgotPasswordPage from './pages/ForgotPassword-Page/ForgotPasswordPage';
import ImagesPage from './pages/Images-Page/ImagesPage';
import EditBlogPage from './pages/Edit-Blog-Page/EditBlogPage';
import ViewBlogPage from './pages/View-Blog-Page/ViewBlogPage';
import Footer from './Footer';
import React from 'react';
import MainPage from './pages/Main-Page/MainPage';
import SearchPage from './pages/Search-Page/SearchPage';



function App() {
  return (
    <div className="App">
      <Router>
      <Toolbar />
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/Settings' element={<SettingsPage />} />
          <Route path='/Register' element={<RegisterPage />} />
          <Route path='/About-Us' element={<AboutUsPage />} />
          <Route path='/Forgot-my-password' element={<ForgotPasswordPage />} />
          <Route path='/:username/Main' element={<MainPage />} />
          <Route path='/:username/:blogId/Edit' element={<EditBlogPage />} />
          <Route path='/:username/:blogId/View' element={<ViewBlogPage />} />
          <Route path='/:username/Images' element={<ImagesPage />} />
          <Route path='/:username/Search/:tag' element={<SearchPage/>}/>
          <Route path=':page' element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}


export default App;
