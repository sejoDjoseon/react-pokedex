import React from "react";
import { IPokemon } from "../../../interfaces/pokemon";

export interface IListCardProps {
    pokemon: IPokemon;
}

export default function ListCard({ pokemon }: IListCardProps) {
    return (
        <div className="pokemon-card-list">
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
            />
            <h3>{pokemon.name}</h3>
            {pokemon.types.map(({ type }) => (
                <div>{type.name}</div>
            ))}
        </div>
    );
}
