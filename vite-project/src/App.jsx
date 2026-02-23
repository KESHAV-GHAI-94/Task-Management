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
// import ProtectedRoutes from './routes/ProtectedRoutes';
import Settings from './pages/Settings';
import MainGroupPage from './pages/MainGroupPage';
import AddMemberGroup from './pages/AddMemberGroup';
import CreateTask from './pages/CreateTask';
import DetailedTaskPage from './pages/DetailedTaskPage';
import IndividualGroupTask from './pages/IndividualGroupTask';
const App = () => {
  return (
    <div>
    <div>
    <Routes>
    <Route path="/signup" element={<Signup/>}/>
    <Route path ="/login" element={<Signin/>}/>
    {/* <Route element={<ProtectedRoutes />}> */}
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/groups" element={<Groups/>}/>
    <Route path="/tasks" element={<Tasks/>}/>
    <Route path="/kanban" element={<Kanban/>}/>
    <Route path="/settings" element={<Settings/>}/>
    <Route path="/groups/:id/members" element={<MainGroupPage/>} />
    <Route path ="/groups/:id/members/add" element={<AddMemberGroup/>}/>
    <Route path ="/groups/:id/create-task" element={<CreateTask/>}/>
    <Route path="/tasks/:id" element={<DetailedTaskPage/>}/>
    <Route path="/groups/:id/tasks"element={<IndividualGroupTask/>}/>
    {/* </Route> */}
    </Routes>
  </div>
  <ToastContainer position="top-right" autoClose={3000} />
  </div>
  );
};

export default App;