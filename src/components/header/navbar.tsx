import React from "react";
const routes = [
  { Home: "/" },
  { Products: "/products" },
  { Analytic: "/analytic" },
];

const Navbar = () => {
  return (
    <nav className="p-5 fixed bg-white border h-16 flex items-center gap-10 w-full">
      <div className="">
        <img
          src="https://cdn-icons-png.freepik.com/512/7835/7835563.png"
          alt="Avatar"
          className="w-10 h-10"
        />
      </div>
      <ul className="flex gap-5 text-slate-600 text-sm md:text-lg xl:text-2xl">
        {routes.map((route, index) => (
          <li key={index}>
            <a href={Object.values(route)[0]} className="nav-link">
              {Object.keys(route)[0]}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
