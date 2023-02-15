import React, { Suspense, useEffect, useState, lazy } from "react";
import { NamedAPIResourceList, PokemonClient } from "pokenode-ts";
import PokemonCard from "../components/PokemonCard";

async function onMount(page: number, setData: any, api: PokemonClient) {
  const pageSize = 20;
  const res = await api.listPokemons(page * pageSize - pageSize, pageSize);
  setData(res);
}

export default function Pokemons() {
  const api = new PokemonClient();
  const prevNextstyle = "bg-slate-500 rounded-md p-0.5 ";
  const [page, setPage] = useState(1);
  const [data, setData] = useState<NamedAPIResourceList | null>(null);
  const [loaded, setLoaded] = useState(false);

  const [data2, setData2] = useState<NamedAPIResourceList | null>(null);

  useEffect(() => {
    (async () => {
      const pageSize = 20;
      const res = await api.listPokemons(page * pageSize - pageSize, pageSize);
      setData(res);
      setLoaded(true);
    })();
  }, [page]);

  if (!loaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-4">
      <div className="flex flex-wrap gap-1">
        {data?.results.map((i) => {
          return <PokemonCard key={i.name} name={i.name} />;
        })}
      </div>
      <div>
        <button
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
          className={
            prevNextstyle +
            (() => {
              if (page === 1) {
                return "bg-slate-400";
              }
            })()
          }
        >
          previous
        </button>
        <button
          onClick={() => {
            setPage(page + 1);
          }}
          className={prevNextstyle}
        >
          next
        </button>
      </div>
    </div>
  );
}
