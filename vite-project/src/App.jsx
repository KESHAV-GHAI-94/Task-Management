import React from 'react';
import Signup from "./pages/Auth/Signup";
import Signin from "./pages/Auth/Signin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Route,Routes} from "react-router-dom";
import Dashboard from './pages/Dashboard';
import Groups from './pages/Groups/Groups';
import Tasks from './pages/Tasks/Tasks';
import KanbanViewSection from './pages/Tasks/KanbanViewSection';
import ProtectedRoutes from './routes/ProtectedRoutes';
import MainGroupPage from './pages/Groups/MainGroupPage';
import CreateTask from './pages/Tasks/CreateTask';
import DetailedTaskPage from './pages/Tasks/DetailedTaskPage';
import IndividualGroupTask from './pages/Groups/IndividualGroupTask';
import ForgetPassword from './pages/Auth/Forgetpassword';
import Layout from './components/Layout/Layout';
import ResetPassword from './pages/Auth/ResetPassword';
import Home from './pages/Home';
const App = () => {
  return (
    <div>
    <div>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path ="/login" element={<Signin/>}/>
    <Route path="/forget-password" element={<ForgetPassword/>}/>
    <Route path="/Change-password" element={<ResetPassword/>}/>
    <Route element={<ProtectedRoutes />}>
    <Route element={<Layout />}>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/groups" element={<Groups/>}/>
    <Route path="/tasks" element={<Tasks/>}/>
    <Route path="/groups/:id/members" element={<MainGroupPage/>} />
    <Route path ="/groups/:id/create-task" element={<CreateTask/>}/>
    <Route path="/tasks/:id" element={<DetailedTaskPage/>}/>
    <Route path="/groups/:id/tasks"element={<IndividualGroupTask/>}/>
    <Route path="/kanban" element={<KanbanViewSection/>}/>
    </Route>
    </Route>
    </Routes>
  </div>
  <ToastContainer position="top-right" autoClose={3000} />
  </div>
  );
};

export default App;