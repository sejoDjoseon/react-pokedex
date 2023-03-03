import * as React from "react";
import { IPokemonType } from "../../interfaces/pokemon";

export interface IPokemonTypesProps {
    types: IPokemonType[];
}

function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function PokemonTypes({ types }: IPokemonTypesProps) {
    const lenght = types.length;
    return (
        <>
            {types.map(({ type }, index) => (
                <text
                    className="pokemon-type"
                    style={index !== lenght ? { marginRight: 10 } : undefined}
                >
                    {capitalizeFirstLetter(type.name)}
                </text>
            ))}
        </>
    );
}
