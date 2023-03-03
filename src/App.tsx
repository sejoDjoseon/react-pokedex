import React from "react";
import "./App.css";
import Header from "./components/Header/Header";

import PokemonList from "./components/PokemonList/PokemonList";

function App() {
    return (
        <>
            <Header title={"Pokedex"}></Header>
            <PokemonList></PokemonList>
        </>
    );
}

export default App;
