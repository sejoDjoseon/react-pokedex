import React from "react";
import { Pokemon } from "../../../interfaces/pokemon";

export interface IListCardProps {
    pokemon: Pokemon;
}

export default function ListCard({ pokemon }: IListCardProps) {
    return (
        <div className="pokemonCardList">
            <h2>{pokemon.name}</h2>
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
            />
        </div>
    );
}
