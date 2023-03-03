import React, { useEffect, useState } from "react";
import { fetchPokemons } from "../../api";
import { Pokemon } from "../../interfaces/pokemon";
import ListCard from "./ListCard/ListCard";
import { debounce } from "lodash";

const PokemonList: React.FunctionComponent = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [nextUrl, setNextUrl] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchPokemons()
            .then((data) => {
                setPokemons(data.results);
                setLoading(false);
                setNextUrl(data.next);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 200 &&
            nextUrl &&
            !loading
        ) {
            setLoading(true);
            fetchPokemons(nextUrl)
                .then((data) => {
                    setPokemons([...pokemons, ...data.results]);
                    setNextUrl(data.next);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                });
        }
    };

    const debouncedHandleScroll = debounce(handleScroll, 200);

    useEffect(() => {
        window.addEventListener("scroll", debouncedHandleScroll);
        return () => {
            window.removeEventListener("scroll", debouncedHandleScroll);
        };
    }, [pokemons]);

    return (
        <>
            <h2>POKÉMONS</h2>
            <div className="pokemon-list">
                {pokemons.map((pokemon) => (
                    <ListCard key={pokemon.id} pokemon={pokemon} />
                ))}
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
            </div>
        </>
    );
};

export default PokemonList;
