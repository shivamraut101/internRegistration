import React from 'react'
import { Link } from 'react-router-dom';

export const MainDashboard = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      <h1 className="text-center display-3 fw-bold mb-5">Main Dashboard</h1>
      <div className="row row-cols-2 g-4">
        <Link to="/personal-info" className="col border border-3 border-gray-300 rounded-3 p-4 text-decoration-none d-flex align-items-center justify-content-center bg-light">
          Personal Info
        </Link>
        <Link to="/education" className="col border border-3 border-gray-300 rounded-3 p-4 text-decoration-none d-flex align-items-center justify-content-center bg-light">
          Education
        </Link>
        <Link to="/certificates" className="col border border-3 border-gray-300 rounded-3 p-4 text-decoration-none d-flex align-items-center justify-content-center bg-light">
          Certificates
        </Link>
        <Link to="/residential-details" className="col border border-3 border-gray-300 rounded-3 p-4 text-decoration-none d-flex align-items-center justify-content-center bg-light">
          Residential Details
        </Link>
      </div>
      
    </div>
  )
}
