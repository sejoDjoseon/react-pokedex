import { IPokemon } from "./interfaces/pokemon";

interface PokemonAPIRes {
    name: string;
    url: string;
}

interface IPokemonList<T> {
    count: number;
    next: string;
    results: T[];
}

const INITIAL_URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`;

const fetchPokemons = (url = INITIAL_URL): Promise<IPokemonList<IPokemon>> => {
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response.json();
        })
        .then((data: IPokemonList<PokemonAPIRes>) => {
            const promises = data.results.map((pokemon: PokemonAPIRes) =>
                fetch(pokemon.url).then((response) => response.json())
            );

            return Promise.all(promises).then((results: IPokemon[]) => ({
                ...data,
                results: results,
            }));
        });
};

export { fetchPokemons };
