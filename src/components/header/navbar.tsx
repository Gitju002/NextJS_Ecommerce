import React from "react";
const routes = [
  {
    Home: "/",
  },
  {
    Products: "/products",
  },
  {
    Analytic: "/analytic",
  },
];

const Navbar = () => {
  return (
    <nav className="p-5 fixed bg-white border h-16 flex items-center w-full">
      <ul className="flex gap-5 text-slate-600 text-sm md:text-lg xl:text-2xl">
        {routes.map((route, index) => {
          return (
            <li key={index} className="">
              <a href={Object.values(route)[0]} className="nav-link">
                {Object.keys(route)[0]}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
