import { Pokemon } from "./interfaces/pokemon";

interface PokemonAPIRes {
    name: string;
    url: string;
}

interface PokemonList<T> {
    count: number;
    next: string;
    results: T[];
}

function getPokemonId(url: string): string {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 2];
}

const fetchPokemons = async (offset = 0, limit = 20): Promise<Pokemon[]> => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            return response.json();
        })
        .then((data: PokemonList<PokemonAPIRes>) => {
            return data.results.map(({ name, url }) => ({
                name,
                id: getPokemonId(url),
            }));
        });
};

export { fetchPokemons };
