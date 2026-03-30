import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./Context/AuthContext"
import App from './App.jsx' 
import { GroupProvider } from './Context/GroupContext.jsx'
import { TaskProvider } from './Context/TaskContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
<AuthProvider>
  <GroupProvider>
    <TaskProvider>
    <App />
  </TaskProvider>
  </GroupProvider>
</AuthProvider>
  </BrowserRouter>
  ,
)
