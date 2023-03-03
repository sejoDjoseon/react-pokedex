import { Pokemon } from "./interfaces/pokemon";

interface PokemonAPIRes {
    name: string;
    url: string;
}

interface IPokemonList<T> {
    count: number;
    next: string;
    results: T[];
}

function getPokemonId(url: string): string {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 2];
}

const INITIAL_URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`;

const fetchPokemons = (url = INITIAL_URL): Promise<IPokemonList<Pokemon>> => {
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response.json();
        })
        .then((data: IPokemonList<PokemonAPIRes>) => {
            const { results } = data;

            return {
                ...data,
                results: results.map(({ name, url }) => ({
                    name,
                    id: getPokemonId(url),
                })),
            };
        });
};

export { fetchPokemons };
