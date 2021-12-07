import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Basic/Header';
import Home from './components/Basic/Home';
import About from './components/Basic/About';
import Contact from './components/Basic/Contact';
import Login from './components/Basic/Login';
import Signup from './components/Basic/Signup';
import PageNotFound from './components/Basic/PageNotFound';
import ForgetPassword from './components/Basic/ForgetPassword';
import Footer from './components/Basic/Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
