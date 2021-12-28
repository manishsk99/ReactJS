import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/basic/Basic.css';
import Header from './components/basic/Header';
import Home from './components/basic/Home';
import About from './components/basic/About';
import Contact from './components/basic/Contact';
import Login from './components/basic/Login';
import Logout from './components/basic/Logout'
import Signup from './components/basic/Signup';
import PageNotFound from './components/basic/PageNotFound';
import ForgetPassword from './components/basic/ForgetPassword';
import Footer from './components/basic/Footer';

import Ecom from './components/ecom/Ecom';
import Cart from './components/ecom/Cart';

function App() {
  let [localData, setLocalData] = useState({});
  useEffect(() => {
    let localDataTemp = {};
    localDataTemp["is_logged_In"] = localStorage.getItem("is_logged_In");
    localDataTemp["user_data"] = localStorage.getItem("user_data");
    setLocalData(localDataTemp);
  }, []);

  function updateLocalData(localStorageObj) {
    let localDataTemp = {};
    localDataTemp["is_logged_In"] = localStorageObj.getItem("is_logged_In");
    localDataTemp["user_data"] = localStorageObj.getItem("user_data");
    setLocalData(localDataTemp);
  }

  return (
    <div>
      <BrowserRouter>
        <Header localData={localData} updateLocalData = {updateLocalData} />
        <div className="app-body">

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login updateLocalData = {updateLocalData} />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />

            <Route path="/ecom" element={<Ecom />} />
            <Route path="/cart" element={<Cart />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
