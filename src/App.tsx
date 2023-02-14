import React from "react";
import "./global.css";
import { Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Pokemons from "./pages/Pokemons";

export default function App() {
  return (
    <div className="h-screen w-full flex flex-col">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/pokemons" element={<Pokemons />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </main>
    </div>
  );
}
