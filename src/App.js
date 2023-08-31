import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Base from './components/Base';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Services from './pages/Services';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    // <Base>
    //   <h1>This is Home Page</h1>
    // </Base>
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/services' element={<Services />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
