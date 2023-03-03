import * as React from "react";
import { useAppContext } from "../../context/context";
import { capitalizeFirstLetter } from "../../utils/utils";
import { PokemonTypes } from "../PokemonTypes/PokemonTypes";
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
                        <div className="image-container">
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                                alt={pokemon.name}
                                width="50%"
                                height="auto"
                            />
                        </div>
                    </div>
                    <div className="details-info">
                        <h2>{pokemon.name.toUpperCase()}</h2>
                        <h4>
                            <PokemonTypes types={pokemon.types}></PokemonTypes>
                        </h4>
                        <div className="info-card">
                            <h3>More Stats</h3>
                            <p>
                                Base experience:{" "}
                                <span>{pokemon.base_experience}</span>
                            </p>
                            <p>
                                Height: <span>{pokemon.height}</span>
                            </p>
                            <p>
                                Order: <span>{pokemon.order}</span>
                            </p>
                            <p>
                                Weight: <span>{pokemon.weight}</span>
                            </p>
                            <p>
                                Abilities:{" "}
                                {pokemon.abilities.map(({ ability }) => (
                                    <span>
                                        {capitalizeFirstLetter(ability.name)}
                                    </span>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PokemonDetails;
