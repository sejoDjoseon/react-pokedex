import React from "react";
import "./App.css";
import Header from "./components/Header/Header";

import PokemonList from "./components/PokemonList/PokemonList";
import { AppContextProvider } from "./context/context";

function App() {
    return (
        <AppContextProvider>
            <Header title={"Pokedex"}></Header>
            <PokemonList></PokemonList>
        </AppContextProvider>
    );
}

export default App;
