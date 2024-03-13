import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorPage } from './ErrorPage';
import { GoogleAuth } from './GoogleAuth';
import { useAuth0 } from '@auth0/auth0-react';
import { MainDashboard } from './main dashboard/MainDashboard';
import { Layout } from './Layout/Layout';


function App() {
  const [count, setCount] = useState(0)
 const {user} = useAuth0()

  return (
    <BrowserRouter>
    <Layout>
    <Routes>
        <Route path='/' element={<GoogleAuth />} />
        {
          user && <Route path="main-dashboard" element={<MainDashboard/>} />
        }
        <Route path='*' element={<ErrorPage/>}/> 
    </Routes>
    </Layout>
  </BrowserRouter>
  )
}

export default App
