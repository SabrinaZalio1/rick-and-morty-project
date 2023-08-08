import axios from "axios";
import { IEpisode } from "../interface/index.interface";
import { ICharacter } from "../App";

export function getEpisodesService(episodes: string[]) {
    const url = `https://rickandmortyapi.com/api/episode/${episodes}`;
    return axios.get<IEpisode[]>(url)
}

// service (la request entera) =/= endpoint (url)

export function getCharactersService() {
    return axios.get('https://rickandmortyapi.com/api/character');
}

