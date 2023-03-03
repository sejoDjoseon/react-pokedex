import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { IPokemon } from "../interfaces/pokemon";

export enum ActionKind {
    SET_LOADING_LIST,
    SET_ERROR_LOADING,
    SET_POKEMON_LIST,
    SET_SELECTED_POKEMON,
}

interface SetLoadingListAction {
    type: ActionKind.SET_LOADING_LIST;
    loading: boolean;
}

interface SetErrorLoadingListAction {
    type: ActionKind.SET_ERROR_LOADING;
    error: Error;
}

interface SetPokemonListAction {
    type: ActionKind.SET_POKEMON_LIST;
    pokemons: IPokemon[];
    nextUrl: string | null;
}

interface SetSelectedPokemonAction {
    type: ActionKind.SET_SELECTED_POKEMON;
    pokemon: IPokemon | null;
}

type Action =
    | SetLoadingListAction
    | SetErrorLoadingListAction
    | SetPokemonListAction
    | SetSelectedPokemonAction;

interface AppState {
    pokemons: IPokemon[];
    loading: boolean;
    error: Error | null;
    nextUrl: string | null;
    selectedPokemon: IPokemon | null;
}

const initialAppState: AppState = {
    pokemons: [],
    loading: false,
    error: null,
    nextUrl: null,
    selectedPokemon: null,
};

function appReducer(state: AppState, action: Action): AppState {
    const { type } = action;
    switch (type) {
        case ActionKind.SET_LOADING_LIST:
            return {
                ...state,
                loading: action.loading,
            };
        case ActionKind.SET_ERROR_LOADING:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case ActionKind.SET_POKEMON_LIST:
            return {
                ...state,
                loading: false,
                pokemons: action.pokemons,
                nextUrl: action.nextUrl,
            };
        case ActionKind.SET_SELECTED_POKEMON:
            return {
                ...state,
                selectedPokemon: action.pokemon,
            };
    }
}

interface IAppContext {
    state: AppState;
    dispatch: React.Dispatch<Action>;
}

const AppContext = createContext<IAppContext>({} as IAppContext);

export function AppContextProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(appReducer, initialAppState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
