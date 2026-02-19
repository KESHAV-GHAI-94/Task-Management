import React from 'react';
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Route,Routes} from "react-router-dom";
import Dashboard from './pages/dashboard/Dashboard';
const App = () => {
  return (
    <div>
    <div>
    <Routes>
    <Route path="/signup" element={<Signup/>}/>
    <Route path ="/login" element={<Signin/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  </div>
  <ToastContainer position="top-right" autoClose={3000} />
  </div>
  );
};

export default App;