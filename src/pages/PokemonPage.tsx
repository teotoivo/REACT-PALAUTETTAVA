import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Pokemon,
  PokemonClient,
  Characteristic,
  Ability,
  PokemonAbility,
} from "pokenode-ts";
import PopUp from "../components/PopUp";

export default function PokemonPage() {
  const params = useParams();
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<Pokemon | null>(null);
  const [characteristicts, setCharacteristics] =
    useState<Characteristic | null>(null);
  useEffect(() => {
    (async () => {
      const api = new PokemonClient();
      const res = await api.getPokemonByName(params.id!);
      const char = await api.getCharacteristicById(res.id);

      setCharacteristics(char);
      setData(res);
      setLoaded(true);
    })();
  }, [params.id]);
  const [dots, setDots] = useState(0);

  const [popUpHidden, setPopUpHidden] = useState(true);
  const [popUpData, setPopUpData] = useState<PokemonAbility | null>(null);

  if (!loaded) {
    setTimeout(() => {
      setDots((dots) => (dots + 1) % 4);
    }, 350);
    return (
      <div className="">
        <h1 className="text-red-600 text-2xl">Loading {".".repeat(dots)}</h1>
      </div>
    );
  }

  return (
    <div className="w-full h-full items-center justify-center flex p-24 max-[700px]:p-4">
      <div className="w-full bg-slate-600 rounded-md p-2 flex flex-col">
        <div className="w-full flex justify-center items-center">
          <h1>
            {data?.name} #{data?.id}
          </h1>
        </div>

        <div className="flex flex-row max-my:flex-col">
          <div className="w-1/2 flex items-center justify-center max-my:w-full">
            <img
              src={data?.sprites.front_default!}
              alt={data?.name}
              className="w-1/2 max-w-pImg"
            />
          </div>
          <div className="w-1/2 items-center flex flex-col max-my:w-full">
            <p className="text-3xl flex justify-center">
              {JSON.stringify(
                characteristicts?.descriptions.filter(
                  (x) => x.language.name === "en"
                )[0].description
              )}
            </p>
            <div className="flex bg-slate-700 w-fit gap-6 rounded-md p-6 max-[400px]:flex-col">
              <div>
                <p className="flex text-2xl">
                  Height: {Number(data?.height) / 10}m
                </p>
                <p className="flex text-2xl">
                  Weight: {Number(data?.weight) / 10}kg
                </p>
              </div>
              <div>
                <p className="flex text-2xl ">Species: {data?.species.name}</p>
                <div className="flex text-2xl flex-col">
                  Ablilities:&nbsp;
                  <div className="flex gap-3">
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
