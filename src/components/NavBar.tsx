import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const itemStyle = "bg-slate-800 p-1 px-3 rounded-xl text-white";
  const inputRef = useRef<HTMLInputElement>(null);
  function handle(e: any) {
    e.preventDefault();
    const search = inputRef.current?.value;
    if (search) {
      navigate(`/search/${search}`);
      inputRef.current.value = "";
    }
  }
  return (
    <header className="flex bg-slate-700 h-18 w-full max-[900px]:h-32 max-[900px]:justify-center">
      <nav className="flex w-full my-4">
        <ul className="flex items-center w-full px-4 flex-wrap">
          <li>
            <img className="h-9 w-9" src="/pokeball.svg" alt="pokeball" />
          </li>
          <li className={itemStyle}>
            <Link to="/pokemons">pokemons</Link>
          </li>
          <li className="ml-auto max-[400px]:ml-0">
            <form onSubmit={handle}>
              <input
                ref={inputRef}
                className="bg-slate-800 p-1 px-3 rounded-xl text-white"
                type="text"
                placeholder="search"
              />
            </form>
          </li>
        </ul>
      </nav>
    </header>
  );
}
