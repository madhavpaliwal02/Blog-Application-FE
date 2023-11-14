import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Services from './pages/Services';
import UserDashboard from './pages/user-routes/UserDashboard';
import PrivateRoute from './components/PrivateRoute';
import ProfileInfo from './pages/user-routes/ProfileInfo';
import PostPage from './pages/post-routes/PostPage';
import PostCategory from './pages/post-routes/PostCategory';
import UpdateUser from './pages/user-routes/UpdateUser';
import ContactUs from './pages/ContactUs';
import { ToastContainer } from 'react-toastify';
import UpdatePost from './pages/post-routes/UpdatePost';


function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/services' element={<Services />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/post/:postId' element={<PostPage />} />
        <Route path='/category/:categoryId' element={<PostCategory />} />


        <Route path='/user' element={<PrivateRoute />}>
          <Route path='dashboard' element={<UserDashboard />} />
          <Route path='profile-info' element={<ProfileInfo />} />
          <Route path='update-post/:postId' element={<UpdatePost />} />
          <Route path='update-user/:userId' element={<UpdateUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
