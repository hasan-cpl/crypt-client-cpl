import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import About from './components/About';
import AdminRoute from './components/admin-routes/AdminRoute';
import DiscordReactions from './components/admin-routes/discord/DiscordReactions';
import Interactions from './components/admin-routes/discord/Interactions';
import AllDisburse from './components/admin-routes/token-disburse/AllDisburse';
import AllUser from './components/admin-routes/users/AllUser';
import AllVote from './components/admin-routes/vote/AllVote';
import CreateVote from './components/admin-routes/vote/CreateVote';
import VoteDetails from './components/admin-routes/vote/VoteDetails';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Guideline from './components/user-routes/Guideline';
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
          <Route path="vote/:id" element={<VoteDetails />} />
          <Route path='votes' element={<AllVote />} />
          <Route path='vote-details' element={<VoteDetails />} />
        </Route>
        <Route path='/admin' element={<AdminRoute />}>
          <Route path='discord-reactions' element={<DiscordReactions />} />
          <Route path='all-user' element={<AllUser />} />
          <Route path='discord-interactions' element={<Interactions />} />
          <Route path='token-disburse' element={<AllDisburse />} />
          <Route path='create-vote' element={<CreateVote />} />
        </Route>

      </Routes>


    </BrowserRouter>
  );
}

export default App;
