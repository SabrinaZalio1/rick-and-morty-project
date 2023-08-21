import axios from "axios";
import { ICharacter, IEpisode } from "../interface/index.interface";

export function getEpisodesService(episodes: string[]) {
    const url = `https://rickandmortyapi.com/api/episode/${episodes}`;
    return axios.get<IEpisode[]>(url)
}


export function getCharactersService() {
    const url = 'https://rickandmortyapi.com/api/character';
    return axios.get(url);
}

