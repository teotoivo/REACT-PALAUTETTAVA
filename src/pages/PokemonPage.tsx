import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Pokemon,
  PokemonClient,
  Characteristic,
  Ability,
  PokemonAbility,
  PokemonSpecies,
  Stat,
  PokemonForm,
  EvolutionClient,
  EvolutionChain,
} from "pokenode-ts";
import PopUp from "../components/PopUp";
import { Link } from "react-router-dom";

//create a new type which extednds the EvoultionChain type and adds a new property to it
type EvoultionChainExtended = EvolutionChain["chain"] & {
  //add a pokemon
  pokemon: Pokemon;
  isLast: boolean;
};
export default function PokemonPage() {
  const evApi = new EvolutionClient();
  const api = new PokemonClient();
  const params = useParams();
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<Pokemon | null>(null);
  const [characteristicts, setCharacteristics] =
    useState<Characteristic | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [evoulution, setEvolution] = useState<EvolutionChain | null>(null);
  const [chain, setChain] = useState<Array<EvoultionChainExtended> | null>(
    null
  );

  async function extractEvolutionChains(pokemonData: EvolutionChain) {
    const chainsRes: EvoultionChainExtended[] = [];
    let running = true;
    let p = pokemonData.chain;
    //extract all evolutions of pokemon into an array
    while (running) {
      const res = await api.getPokemonByName(p.species.name);

      if (p.evolves_to.length === 0) {
        chainsRes.push({ ...p, pokemon: res, isLast: true });
        running = false;
      } else {
        chainsRes.push({ ...p, pokemon: res, isLast: false });
        p = p.evolves_to[0];
      }
    }

    return chainsRes;
  }

  useEffect(() => {
    (async () => {
      try {
        const api = new PokemonClient();
        const res = await api.getPokemonByName(params.id!);
        const spec = await api.getPokemonSpeciesByName(res.name);

        const evres = await fetch(spec.evolution_chain.url);
        const ev: EvolutionChain = await evres.json();

        const c = await extractEvolutionChains(ev);

        if (c.length !== 0) {
          setChain(c);
        }
        setEvolution(ev);
        setSpecies(spec);
        setData(res);

        setLoaded(true);
      } catch (e: any) {
        setError(e);
        console.log(e);
      }
    })();
  }, [params.id]);
  const [dots, setDots] = useState(0);

  const [popUpHidden, setPopUpHidden] = useState(true);
  const [popUpData, setPopUpData] = useState<PokemonAbility | null>(null);

  const highestHp = 255;

  if (!loaded) {
    setTimeout(() => {
      setDots((dots) => (dots + 1) % 4);
    }, 350);
    return (
      <div className="">
        <h1 className="text-red-600 text-2xl">Loading {".".repeat(dots)}</h1>
        <h1 className="text-red-600 text-3xl">{error ? error.message : ""}</h1>
      </div>
    );
  }

  return (
    <div className="w-full h-full items-center justify-center flex p-24 max-[700px]:p-4">
      <div className="w-full bg-slate-600 rounded-md p-2 flex flex-col">
        <div className="w-full flex justify-center items-center">
          <h1 className="text-3xl">
            {data?.name} #{data?.id}
          </h1>
          <p></p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row max-my:flex-col">
            <div className="w-1/2 flex items-center justify-center max-my:w-full flex-col">
              <img
                src={data?.sprites.front_default!}
                alt={data?.name}
                className="w-1/2 max-w-pImg"
              />
            </div>

            <div className="w-1/2 items-center flex flex-col max-my:w-full">
              <p className="w-fit text-xl max-w-8/10">
                {species?.flavor_text_entries
                  .filter((x) => {
                    return x.language.name === "en";
                  })[0]
                  .flavor_text.replace(/(\r\n|\n|\r)/gm, " ")}
              </p>
              <div className="flex bg-slate-700 w-4/5 gap-6 rounded-md p-6 max-[400px]:flex-col flex-wrap">
                <div>
                  <p className="flex text-2xl">
                    Height: {Number(data?.height) / 10}m
                  </p>
                  <p className="flex text-2xl">
                    Weight: {Number(data?.weight) / 10}kg
                  </p>
                </div>
                <div>
                  <p className="flex text-2xl ">
                    Species: {data?.species.name}
                  </p>
                  <div className="flex text-2xl flex-col">
                    Ablilities:&nbsp;
                    <div className="flex gap-3 flex-wrap">
                      {data?.abilities.map((x) => {
                        return (
                          <div
                            key={x.ability.name}
                            className="flex flex-row rounded-lg p-1 px-2 bg-slate-800 text-white hover:cursor-pointer"
                            onClick={() => {
                              setPopUpData(x);
                              setPopUpHidden(false);
                            }}
                          >
                            {x.ability.name}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <div>
                    <p className="flex text-2xl">Types:&nbsp;</p>
                    <div className="flex gap-3 flex-wrap">
                      {data?.types.map((x) => {
                        return (
                          <div
                            key={x.type.name}
                            className="flex flex-row rounded-lg p-1 px-2 bg-slate-800 text-white"
                          >
                            <p className="text-2xl">{x.type.name}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="dlex text-2xl">Weaknesses:&nbsp;</p>
                    <div className="flex gap-3">
                      {data?.types.map((x) => {
                        return (
                          <div
                            key={x.type.name}
                            className="flex flex-row rounded-lg p-1 px-2 bg-slate-800 text-white"
                          >
                            <p className="text-2xl">{x.type.name}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center justify-around flex-wrap">
            {data?.stats.map((x) => {
              return (
                <div className="flex flex-col items-center" key={x.stat.name}>
                  <p className="text-2xl break-words">{x.stat.name}</p>
                  <div className="flex flex-col items-center h-64">
                    <div className="border-black border-2 h-full w-4/5 flex">
                      <div
                        className="bg-red-500 w-full mt-auto"
                        style={{
                          height: `${(x.base_stat / highestHp) * 100}%`,
                        }}
                      ></div>
                    </div>

                    <p className="text-2xl">{x.base_stat}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full flex">
            <div className="flex w-full justify-around items-center">
              {(() => {
                function content() {
                  return chain?.map((x) => {
                    return (
                      <>
                        <Link
                          to={"/pokemon/" + x.species.name}
                          className="w-1/6"
                          key={x.species.name}
                        >
                          <div
                            className={(() => {
                              let style = "rounded-full border-2 w-full";

                              if (x.species.name == data?.name) {
                                return style + " bg-slate-700";
                              } else return style;
                            })()}
                          >
                            <img
                              className="w-full"
                              src={x.pokemon.sprites.front_default!}
                              alt="pokemon picture"
                            />
                          </div>
                          <div className="relative flex bg-slate-700 bg-opacity-80 w-min left-1/2 -translate-x-1/2 p-2 rounded-2xl px-4 text-white font-semibold">
                            {x.species.name}
                          </div>
                        </Link>
                        <div>
                          {(() => {
                            if (x.isLast) {
                              return <div className=""></div>;
                            } else {
                              return (
                                <div className="w-1/6 text-9xl">&#8594;</div>
                              );
                            }
                          })()}
                        </div>
                      </>
                    );
                  });
                }

                return content();
              })()}
            </div>
          </div>
        </div>
      </div>
      <PopUp
        popUpHidden={popUpHidden}
        setPopUpHidden={setPopUpHidden}
        ability={popUpData}
      />
    </div>
  );
}
