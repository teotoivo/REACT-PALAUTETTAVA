import React, { Suspense, useEffect, useState } from "react";

async function onMount() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=10");
  const json = await response.json();
  console.log(json);
}

export default function Pokemons() {
  const prevNextstyle = "bg-slate-500 rounded-md p-0.5 ";
  const [page, setPage] = useState(1);
  useEffect(() => {
    onMount();
  }, [page]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div></div>
      <div>
        <button
          onClick={() => {
            setPage(page - 1);
          }}
          className={
            prevNextstyle +
            (() => {
              if (page === 1) {
                return "";
              }
            })()
          }
        >
          previous
        </button>
        <button className={prevNextstyle}>next</button>
      </div>
    </Suspense>
  );
}
