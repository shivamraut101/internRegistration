import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function Header() {
  const [activeUser, setActiveUser] = useState(false);
  const { user, loginWithPopup, logout, isAuthenticated } = useAuth0();
  useEffect(() => {
    setActiveUser(isAuthenticated);
  }, [isAuthenticated]);
  console.log(user);
  return (
    <header className="bg-white shadow-md">
  <div className="container mx-auto">
    <nav className="flex items-center justify-between flex-wrap py-4">
      <div className="flex items-center flex-shrink-0 mr-6">
        <a href="#home" className="font-bold text-xl text-gray-800">
          Basket Hunt
        </a>
      </div>
      <div className="block lg:hidden">
        {/* <button
          className="navbar-toggler flex items-center px-3 py-2 border rounded text-gray-500 border-gray-500 hover:text-gray-800 hover:border-gray-800 transition-colors duration-300"
          type="button"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button> */}
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="flex items-center">
          <div className="flex items-center ml-4">
            <a href="#home" className="text-gray-800 mr-4 hover:text-gray-600 transition-colors duration-300">
              Home
            </a>
            {activeUser ? (
              <a
                href="#logout"
                onClick={() =>
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  })
                }
                className="text-gray-800 mr-4 hover:text-gray-600 transition-colors duration-300"
              >
                Logout
              </a>
            ) : (
              <a
                href="#login"
                onClick={() => loginWithRedirect()}
                className="text-gray-800 mr-4 hover:text-gray-600 transition-colors duration-300"
              >
                Login
              </a>
            )}
          </div>
        </div>
        {activeUser && (
          <div className="flex ml-auto items-center">
            <div className="flex items-center ml-4">
              <h4 className="text-gray-800 mr-2">{user.name}</h4>
              <img
                src={user.picture}
                alt="Profile Picture"
                className="rounded-full img-fluid"
                style={{ width: "26px", height: "26px" }}
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  </div>
</header>

  );
}

export default Header;
