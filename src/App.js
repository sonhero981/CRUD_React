import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Signup from './components/Signup';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path='/' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/forgotpassword' element={<ForgotPassword/>}/>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
