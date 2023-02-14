import { NamedAPIResource, Pokemon, PokemonClient } from "pokenode-ts";
import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";

async function onMount(api: PokemonClient, name: string, setData: any) {}

export default function PokemonCard({ name }: { name: string }) {
  const api = new PokemonClient();
  const [data, setData] = useState<Pokemon | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await api.getPokemonByName(name);
      setData(res);
      setLoaded(true);
    })();
  }, [name]);

  const [dots, setDots] = useState(0);

  if (!loaded) {
    setTimeout(() => {
      setDots((dots) => (dots + 1) % 4);
    }, 350);
    return (
      <div className="bg-slate-600 border-black border-2 rounded-md min-w-card flex-1 h-80 flex flex-col items-center justify-center max-w-card">
        <h1 className="text-red-600 text-2xl">Loading {".".repeat(dots)}</h1>
      </div>
    );
  }

  return (
    <Link
      to={`/pokemon/${data?.name}`}
      className="min-w-card flex-1 h-80 flex flex-col items-center justify-center max-w-card"
    >
      <div className="bg-slate-600 border-black border-2 rounded-md min-w-card flex-1 h-80 flex flex-col items-center justify-center max-w-card">
        <h1 className="text-white text-2xl">{data?.name}</h1>
        <img
          src={data?.sprites.front_default!}
          className="h-full max-h-card"
          alt="pokemon image"
        />
      </div>
    </Link>
  );
}
