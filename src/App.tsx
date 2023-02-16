import React from "react";
import "./global.css";
import { Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Pokemons from "./pages/Pokemons";
import PokemonPage from "./pages/PokemonPage";
import SearchPage from "./pages/SearchPage";

export default function App() {
  return (
    <div className="h-screen w-full flex flex-col">
      <NavBar />
      <main className="flex-1 max-h-full items-center">
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/pokemons" element={<Pokemons />} />
          <Route path="/pokemon/:id" element={<PokemonPage />} />
          <Route path="/search/:search" element={<SearchPage />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </main>
    </div>
  );
}
