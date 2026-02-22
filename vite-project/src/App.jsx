import React from 'react';
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Route,Routes} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Groups from './pages/Groups';
import Tasks from './pages/Tasks';
import Kanban from "./pages/Kanban";
import Members from "./pages/Members";
import Settings from './pages/Settings';
import MainGroupPage from './pages/MainGroupPage';
import AddMemberGroup from './pages/AddMemberGroup';
const App = () => {
  return (
    <div>
    <div>
    <Routes>
    <Route path="/signup" element={<Signup/>}/>
    <Route path ="/login" element={<Signin/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/groups" element={<Groups/>}/>
    <Route path="/tasks" element={<Tasks/>}/>
    <Route path="/kanban" element={<Kanban/>}/>
    <Route path="/settings" element={<Settings/>}/>
    <Route path="/groups/:id/members" element={<MainGroupPage/>} />
    <Route path ="/groups/:id/members/add" element={<AddMemberGroup/>}/>
    </Routes>
  </div>
  <ToastContainer position="top-right" autoClose={3000} />
  </div>
  );
};

export default App;