import { Ability, PokemonAbility, PokemonClient } from "pokenode-ts";
import { useEffect, useState } from "react";

export default function PopUp({
  setPopUpHidden,
  ability,
  popUpHidden,
}: {
  popUpHidden: boolean;
  setPopUpHidden: React.Dispatch<React.SetStateAction<boolean>>;
  ability: PokemonAbility | null;
}) {
  const [a, setA] = useState<Ability | null>(null);
  useEffect(() => {
    (async () => {
      if (!ability) return;
      const api = new PokemonClient();
      const res = await api.getAbilityByName(ability!.ability.name);
      setA(res);
    })();
  }, [ability]);
  const styles =
    "bg-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 p-8 rounded-md";
  return (
    <div className={popUpHidden ? "hidden" : styles}>
      <div
        className="absolute top-0 right-0 text-2xl hover:cursor-pointer"
        onClick={() => {
          setPopUpHidden(true);
        }}
      >
        &#10006;
      </div>
      <h1>{ability?.ability.name}: </h1>
      <p>
        {a?.effect_entries.map((x) => {
          if (x.language.name === "en") return x.effect;
        })}
      </p>
    </div>
  );
}
