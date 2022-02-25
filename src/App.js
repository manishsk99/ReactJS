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
import Login, {VerifyEmail} from './components/basic/Login';
import Logout from './components/basic/Logout'
import Signup from './components/basic/Signup';
import PageNotFound from './components/basic/PageNotFound';
import ForgetPassword from './components/basic/ForgetPassword';
import Footer from './components/basic/Footer';

import Ecom from './components/ecom/Ecom';
import Cart from './components/ecom/Cart';
import MyProfile from './components/basic/MyProfile';
import AddAddress from './components/ecom/AddAddress';
import Transactions from './components/payment/Transactions';
import AccountHome from './components/basic/AccountHome';
import ItemDetail from './components/ecom/ItemDetail';
import { ToastContainer } from 'react-toastify';
import ManageAddress from './components/ecom/ManageAddress';
import SelectAddress from './components/ecom/SelectAddress';
import MakePayment from './components/ecom/MakePayment';
import ConfirmPage from './components/ecom/ConfirmPage';
import MyOrders from './components/ecom/MyOrders';
import ProtectedRoute from './components/basic/ProtectedRoute';

import SellerHome from './components/seller/SellerHome';
import SellerLogin from './components/seller/SellerLogin';
import SellerProfile from './components/seller/SellerProfile';
import AddItem from './components/seller/AddItem';
import ManageItem from './components/seller/ManageItem';
import SellerOrder from './components/seller/SellerOrder';

export const HeaderContext = createContext();

function App() {
  let [localData, setLocalData] = useState({});
  let [cartItemCount, setCartItemCount] = useState(0);
  useEffect(() => {
    let localDataTemp = {};
    localDataTemp["is_logged_In"] = localStorage.getItem("is_logged_In");
    localDataTemp["is_seller_logged_In"] = localStorage.getItem("is_seller_logged_In");
    setLocalData(localDataTemp);
    updateCartItemCount();
  }, []);

  function updateLocalData(localStorageObj) {
    let localDataTemp = {};
    localDataTemp["is_logged_In"] = localStorageObj.getItem("is_logged_In");
    localDataTemp["is_seller_logged_In"] = localStorageObj.getItem("is_seller_logged_In");
    setLocalData(localDataTemp);
  }

  function updateCartItemCount() {
    if(!localStorage.getItem("cart_items")) {
      localStorage.setItem("cart_items_count", 0);
    }
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
            {/* Normal route */}
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login updateLocalData={updateLocalData} />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/verifyemail/:token" element={<VerifyEmail />} />

            <Route path="/home" element={<Home />} />
            <Route path="/itemDetail/:itemId" element={<HeaderContext.Provider value={updateCartItemCount}><ItemDetail /></HeaderContext.Provider>} />
            <Route path="/cart" element={<Cart updateCartItemCount={updateCartItemCount} />} />

            {/* User private route */}
            <Route path="/myprofile" element={<AccountHome comp={MyProfile} />} />
            <Route path="/addaddress" element={<AccountHome comp={AddAddress} />} />
            <Route path="/manageaddress" element={<AccountHome comp={ManageAddress} />} />
            <Route path="/myorders" element={<AccountHome comp={MyOrders} />} />

            <Route path="/trans" element={<AccountHome comp={Transactions} />} />

            <Route path="/selectaddress" element={<ProtectedRoute component={SelectAddress} />} />
            <Route path="/makepayment" element={<HeaderContext.Provider value={updateCartItemCount}><ProtectedRoute component={MakePayment} /></HeaderContext.Provider>} />
            <Route path="/orderconfirm" element={<ProtectedRoute component={ConfirmPage} />} />

            {/* Seller route */}
            <Route path="/slogin" element={<SellerLogin updateLocalData={updateLocalData} />} />
            <Route path="/sprofile" element={<SellerHome comp={SellerProfile} />} />
            <Route path="/sorders" element={<SellerHome comp={SellerOrder} />} />
            <Route path="/additem" element={<SellerHome comp={AddItem} />} />
            <Route path="/manageitem" element={<SellerHome comp={ManageItem} />} />

            {/* Default route */}
            <Route exact path="/" element={<HeaderContext.Provider value={updateCartItemCount}><Ecom /></HeaderContext.Provider>} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
