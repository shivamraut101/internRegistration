import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ErrorPage } from './ErrorPage';
import { GoogleAuth } from './GoogleAuth';
import { useAuth0 } from '@auth0/auth0-react';
import { MainDashboard } from './main dashboard/MainDashboard';
import { Layout } from './Layout/Layout';
import { PersonalInfo } from './main dashboard/PersonalInfo';


function App() {
  const [count, setCount] = useState(0)
 const {user} = useAuth0()
 const { isAuthenticated } = useAuth0();
 const PrivateRoute = ({ children }) => {
   return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
 };

  return (
    <BrowserRouter>
    <Layout>
    <Routes>
          <Route path="/" element={<GoogleAuth />} />
          <Route
            path="/main-dashboard"
            element={
              <PrivateRoute>
                <MainDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="personal-info"
            element={
              <PrivateRoute>
                <PersonalInfo />
              </PrivateRoute>
            }
          />
        </Routes>
    </Layout>
  </BrowserRouter>
  
  )
}

export default App
