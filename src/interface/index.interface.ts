export interface IEpisode {
    id: number;
    name: string;
    air_date: string;
    episode: string; // S01E10
    character: string[];
    url: string;
    created: string;
}
export interface ICharacter {
    id: number;
    name: string;
    status: 'Alive' | 'Dead' | 'unknown';
    species: string;
    image: string;
    gender?: string;
    episode: string[];
}
export interface ICharacterSection {
    sectionOne: ICharacter[];
    sectionTwo: ICharacter[];
}
export interface ICharacterSelected {
    characterOne: Pick<ICharacter, 'id' | 'episode'> | null;
    characterTwo: Pick<ICharacter, 'id' | 'episode'> | null;
}