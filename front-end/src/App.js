import './App.css';
import Login from './pages/Login'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path='/profile' element={
        <Auth redirectTo='/'>
          <Profile />
        </Auth>
      } />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  );
}

function Auth({ children, redirectTo }) {
  const history = useLocation();
  localStorage.setItem('location', history.pathname);
  const auth = useSelector((state) => state.data.user.auth)
  return auth ? children : <Navigate to={redirectTo} />
}

export default App;
