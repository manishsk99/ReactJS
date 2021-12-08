import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/basic/Basic.css';
import Header from './components/basic/Header';
import Home from './components/basic/Home';
import About from './components/basic/About';
import Contact from './components/basic/Contact';
import Login from './components/basic/Login';
import Signup from './components/basic/Signup';
import PageNotFound from './components/basic/PageNotFound';
import ForgetPassword from './components/basic/ForgetPassword';
import Footer from './components/basic/Footer';

import Ecom from './components/ecom/Ecom';
import Cart from './components/ecom/Cart';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="app-body">
          
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
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
