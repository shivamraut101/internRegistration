import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

export const GoogleAuth = () => {
    const { loginWithRedirect } = useAuth0();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-3xl font-bold mb-8">Welcome to Intern Registration</h1>
    <button
      onClick={() => loginWithRedirect()}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Login with Auth0
    </button>
  </div>
  )
}
