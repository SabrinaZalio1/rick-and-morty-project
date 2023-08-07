import axios from "axios";
import { IEpisode } from "../interface/index.interface";

export function getEpisodesService(episodes: string[]) {
    const url = `https://rickandmortyapi.com/api/episode/${episodes}`;
    return axios.get<IEpisode[]>(url)
}

// service (la request entera) =/= endpoint (url)