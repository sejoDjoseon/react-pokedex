import React, { ReactNode, useEffect, useState } from "react";
import { fetchPokemons } from "../../api";
import { Pokemon } from "../../interfaces/pokemon";
import ListCard from "./ListCard/ListCard";

const PokemonList: React.FunctionComponent = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        setLoading(true);
        console.log("lala");
        fetchPokemons()
            .then((data) => {
                setPokemons(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="pokemon-list">
            {pokemons.map((pokemon) => (
                <ListCard key={pokemon.id} pokemon={pokemon} />
            ))}
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
        </div>
    );
};

export default PokemonList;
