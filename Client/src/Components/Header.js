import React from "react";

function Header() {
  return (
    <div>
      <nav className="flex flex-col md:flex-row justify-between items-center px-4">
        <h1 className="text-gray-200 text-xl font-light">MyTask</h1>

        <ul className="flex flex-row text-gray-200 text-xl font-light gap-2">
          <a>Home</a>
          <a>About</a>
          <a>Contact</a>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
