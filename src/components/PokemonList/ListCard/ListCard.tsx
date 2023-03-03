import React from "react";
import { IPokemon } from "../../../interfaces/pokemon";
import { PokemonTypes } from "../../PokemonTypes/PokemonTypes";

export interface IListCardProps {
    pokemon: IPokemon;
    onClick?: () => void;
}

export default function ListCard({ pokemon, onClick }: IListCardProps) {
    return (
        <div onClick={onClick} className="pokemon-card-list">
            <div className="card-image">
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    alt={pokemon.name}
                />
            </div>
            <h3>{pokemon.name.toUpperCase()}</h3>
            <PokemonTypes types={pokemon.types} />
        </div>
    );
}
