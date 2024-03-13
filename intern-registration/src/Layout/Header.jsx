import React from 'react';

function Header() {
  return (
    <header className="bg-blue-500 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">Intern Registration</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="text-white hover:text-gray-200">Home</a></li>
            <li><a href="/about" className="text-white hover:text-gray-200">About</a></li>
            <li><a href="/contact" className="text-white hover:text-gray-200">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
