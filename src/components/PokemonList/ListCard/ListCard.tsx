import React from "react";
import { IPokemon } from "../../../interfaces/pokemon";

export interface IListCardProps {
    pokemon: IPokemon;
    onClick?: () => void;
}

export default function ListCard({ pokemon, onClick }: IListCardProps) {
    return (
        <div onClick={onClick} className="pokemon-card-list">
            <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name}
            />
            <h3>{pokemon.name}</h3>
            {pokemon.types.map(({ type }) => (
                <div key={type.name}>{type.name}</div>
            ))}
        </div>
    );
}
