import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const itemStyle = "bg-slate-800 p-1 px-3 rounded-xl text-white";
  return (
    <header className="flex bg-slate-700 h-14 w-screen">
      <nav className="flex w-screen">
        <ul className="flex items-center w-screen gap-4 px-4">
          <li>
            <img className="h-9 w-9" src="./pokeball.svg" alt="pokeball" />
          </li>
          <li className={itemStyle}>
            <Link to="/pokemons">pokemons</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
