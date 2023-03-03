import React, { useEffect } from "react";
import { fetchPokemons } from "../../api";
import ListCard from "./ListCard/ListCard";
import { debounce } from "lodash";
import { ActionKind, useAppContext } from "../../context/context";

const PokemonList: React.FunctionComponent = () => {
    const { state: appState, dispatch: appDispatch } = useAppContext();

    const { nextUrl, loading, error, pokemons } = appState;

    useEffect(() => {
        appDispatch({ type: ActionKind.SET_LOADING_LIST, loading: true });
        fetchPokemons()
            .then((data) => {
                appDispatch({
                    type: ActionKind.SET_POKEMON_LIST,
                    pokemons: data.results,
                    nextUrl: data.next,
                });
            })
            .catch((error) => {
                appDispatch({
                    type: ActionKind.SET_ERROR_LOADING,
                    error: error,
                });
            });
    }, []);

    const handleScroll = () => {
        if (
            window.innerHeight + window.scrollY >=
                document.body.offsetHeight -
                    Math.max(window.innerWidth * 0.5, 100) &&
            nextUrl &&
            !loading
        ) {
            appDispatch({ type: ActionKind.SET_LOADING_LIST, loading: true });
            fetchPokemons(nextUrl)
                .then((data) => {
                    appDispatch({
                        type: ActionKind.SET_POKEMON_LIST,
                        pokemons: [...pokemons, ...data.results],
                        nextUrl: data.next,
                    });
                })
                .catch((error) => {
                    appDispatch({
                        type: ActionKind.SET_ERROR_LOADING,
                        error: error,
                    });
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
        <div className="page-container">
            <h2>POKÉMONS</h2>
            <div className="pokemon-list">
                {pokemons.map((pokemon) => (
                    <div key={pokemon.id} className="card-container">
                        <ListCard pokemon={pokemon} />
                    </div>
                ))}
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
            </div>
        </div>
    );
};

export default PokemonList;
