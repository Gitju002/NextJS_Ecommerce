import React from "react";
import CustomButton from "../custom-button";
import { Slack } from "lucide-react";
const routes = [
  { Home: "/" },
  { Products: "/products" },
  { Analytic: "/analytic" },
];

const Navbar = () => {
  return (
    <nav className="p-5 fixed h-16 flex justify-evenly items-center gap-10 w-full">
      <div className="flex items-center gap-2 ">
        <Slack size={40} className="text-white" />
        <p className="text-white text-xl font-extralight uppercase">
          Dashboard
        </p>
      </div>
      <ul className="flex gap-5 text-slate-600 text-sm md:text-lg xl:text-xl">
        {routes.map((route, index) => (
          <li key={index} className="text-white">
            <a href={Object.values(route)[0]} className="nav-link">
              {Object.keys(route)[0]}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex gap-5">
        <CustomButton className="text-lg font-normal">Login</CustomButton>
        <CustomButton className="text-lg font-normal">SignUp</CustomButton>
      </div>
    </nav>
  );
};

export default Navbar;
