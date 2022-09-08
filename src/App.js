import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import About from './components/About';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Guideline from './components/user-routes/Guidline';
import MyTransactions from './components/user-routes/MyTransactions';
import PrivateRoute from './components/user-routes/PrivateRoute';
import ProcessOauth from './components/user-routes/ProcessOauth';
import SendToken from './components/user-routes/SendToken';
import UserDashboard from './components/user-routes/UserDashboard';


function App() {
  return (


    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/about' element={<About />} />


        <Route path='/user' element={<PrivateRoute />}>

          <Route path='home' element={<Home />} />
          <Route path='dashboard' element={<UserDashboard />} />
          <Route path='send-token' element={<SendToken />} />

          <Route path='my-transactions' element={<MyTransactions />} />
          <Route path='process-discord-oauth' element={<ProcessOauth />} />

          <Route path='guideline' element={<Guideline />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
