import * as React from "react";
import { useAppContext } from "../../context/context";
import "./styles.css";

interface IPokemonDetailsProps {}

const PokemonDetails: React.FunctionComponent<IPokemonDetailsProps> = (
    props
) => {
    const { state: appState } = useAppContext();
    const { selectedPokemon: pokemon } = appState;

    return (
        <div className="details-container">
            {pokemon && (
                <div className="details-content">
                    <div className="details-image">
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                            alt={pokemon.name}
                            width="100%"
                            height="auto"
                        />
                    </div>
                    <div className="details-info">
                        <h1>{pokemon.name}</h1>
                        <div>
                            {pokemon.types.map(({ type }) => `${type.name} `)}
                        </div>
                        <div className="info-card">
                            <h3>More Stats</h3>
                            <p>base_experience: {pokemon.base_experience}</p>
                            <p>height: {pokemon.height}</p>
                            <p>order: {pokemon.order}</p>
                            <p>weight: {pokemon.weight}</p>
                            <p>
                                abilities:{" "}
                                {pokemon.abilities.map(
                                    ({ ability }) => `${ability.name} `
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokemonDetails;
