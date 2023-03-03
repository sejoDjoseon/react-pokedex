import * as React from "react";
import { IPokemonType } from "../../interfaces/pokemon";
import { capitalizeFirstLetter } from "../../utils/utils";

export interface IPokemonTypesProps {
    types: IPokemonType[];
}

export function PokemonTypes({ types }: IPokemonTypesProps) {
    const lenght = types.length;
    return (
        <>
            {types.map(({ type }, index) => (
                <span
                    key={index}
                    className="pokemon-type"
                    style={index !== lenght ? { marginRight: 10 } : undefined}
                >
                    {capitalizeFirstLetter(type.name)}
                </span>
            ))}
        </>
    );
}
