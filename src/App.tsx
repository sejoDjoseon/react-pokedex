import React, { useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";

import PokemonList from "./components/PokemonList/PokemonList";
import { ActionKind, useAppContext } from "./context/context";

function App() {
    const { state, dispatch } = useAppContext();
    const { selectedPokemon } = state;

    useEffect(() => {
        if (selectedPokemon) {
            window.history.pushState({ page: "pokemon-details" }, "", `/`);
            window.addEventListener("popstate", handlePopstate);
            return () => {
                window.removeEventListener("popstate", handlePopstate);
            };
        }
    }, [selectedPokemon]);

    function handlePopstate() {
        dispatch({ type: ActionKind.SET_SELECTED_POKEMON, pokemon: null });
    }

    return (
        <>
            <Header title={"Pokedex"}></Header>
            {!selectedPokemon ? (
                <PokemonList></PokemonList>
            ) : (
                <PokemonDetails></PokemonDetails>
            )}
        </>
    );
}

export default App;
