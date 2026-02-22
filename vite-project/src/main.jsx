import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext"
import App from './App.jsx'
import { GroupProvider } from './Context/GroupContext.jsx'
createRoot(document.getElementById('root')).render(
<AuthProvider>
  <GroupProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </GroupProvider>
</AuthProvider>
  ,
)
