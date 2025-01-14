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
    <div className="container bg-white h-16 flex items-center">
      <nav className="">
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
    </div>
  );
};

export default Navbar;
