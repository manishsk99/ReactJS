import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
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
import MyProfile from './components/basic/MyProfile';
import AddItem from './components/ecom/AddItem';
import AddAddress from './components/ecom/AddAddress';
import Transactions from './components/payment/Transactions';
import AccountHome from './components/basic/AccountHome';
import ItemDetail from './components/ecom/ItemDetail';
import { ToastContainer } from 'react-toastify';
import ManageAddress from './components/ecom/ManageAddress';
import SelectAddress from './components/ecom/SelectAddress';
import MakePayment from './components/ecom/MakePayment';
import ConfirmPage from './components/ecom/ConfirmPage';

export const HeaderContext = createContext();

function App() {
  let [localData, setLocalData] = useState({});
  let [cartItemCount, setCartItemCount] = useState(0);
  useEffect(() => {
    let localDataTemp = {};
    localDataTemp["is_logged_In"] = localStorage.getItem("is_logged_In");
    localDataTemp["user_data"] = localStorage.getItem("user_data");
    setLocalData(localDataTemp);
    updateCartItemCount();
  }, []);

  function updateLocalData(localStorageObj) {
    let localDataTemp = {};
    localDataTemp["is_logged_In"] = localStorageObj.getItem("is_logged_In");
    localDataTemp["user_data"] = localStorageObj.getItem("user_data");
    setLocalData(localDataTemp);
  }

  function updateCartItemCount() {
    if(localStorage.getItem("cart_items_count")) {
      setCartItemCount(localStorage.getItem("cart_items_count"));
    }    
  }

  return (
    <div>
      <BrowserRouter>
        <Header localData={localData} cartItemCount={cartItemCount} updateLocalData={updateLocalData} />
        <ToastContainer />
        <div className="app-body">

          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login updateLocalData={updateLocalData} />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />

            <Route path="/myprofile" element={<AccountHome comp={MyProfile} />} />
            <Route path="/additem" element={<AccountHome comp={AddItem} />} />
            <Route path="/addaddress" element={<AccountHome comp={AddAddress} />} />
            <Route path="/manageaddress" element={<AccountHome comp={ManageAddress} />} />

            <Route path="/trans" element={<AccountHome comp={Transactions} />} />

            <Route path="/home" element={<Home />} />
            <Route path="/" element={<HeaderContext.Provider value={updateCartItemCount}><Ecom /></HeaderContext.Provider>} />
            <Route path="/itemDetail/:itemId" element={<HeaderContext.Provider value={updateCartItemCount}><ItemDetail /></HeaderContext.Provider>} />
            <Route path="/cart" element={<Cart updateCartItemCount={updateCartItemCount} />} />

            <Route path="/selectaddress" element={<SelectAddress />} />
            <Route path="/makepayment" element={<MakePayment />} />
            <Route path="/orderconfirm" element={<ConfirmPage />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
