import { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import { getEpisodesService } from '../service/index.service';
import EpisodesContainer from './EpisodesContainer';
import { ICharacter, ICharacterSection, ICharacterSelected, IEpisode } from '../interface/index.interface';
import Paginator from './Paginator';

interface ICharactersContainerProps {
    characters: ICharacter[];
}

export default function CharactersContainer({ characters }: ICharactersContainerProps) {

    const [characterSection, setCharacterSection] = useState<ICharacterSection>({
        sectionOne: [],
        sectionTwo: [],
    });

    const [selectedCharacter, setSelectedCharacter] = useState<ICharacterSelected>({
        characterOne: null,
        characterTwo: null,
    });

    const [characterOneEpisodes, setCharacterOneEpisodes] = useState<IEpisode[]>([]);
    const [characterTwoEpisodes, setCharacterTwoEpisodes] = useState<IEpisode[]>([]);

    const [sharedEpisodes, setSharedEpisodes] = useState<IEpisode[]>([]);

    //for paginator
    const [currentPage, setCurrentPage] = useState(1);
    const charactersPerPage = 12;
    const totalPages = Math.ceil(characters.length / charactersPerPage);
    //

    useEffect(() => {
        splitArray(characters);
    }, [characters, currentPage]);

    const splitArray = (characters: ICharacter[]) => {
        const startIndex = (currentPage - 1) * charactersPerPage;
        const endIndex = startIndex + charactersPerPage;
        const charactersToDisplay = characters.slice(startIndex, endIndex);

        setCharacterSection({
            sectionOne: charactersToDisplay.slice(0, Math.ceil(charactersToDisplay.length / 2)),
            sectionTwo: charactersToDisplay.slice(Math.ceil(charactersToDisplay.length / 2)),
        });
    };

    //for paginator
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };
    //

    const selectCharacter = (key: 'characterOne' | 'characterTwo', character: Pick<ICharacter, 'id' | 'episode'>) => {
        const value = selectedCharacter[key]?.id === character.id ? null : character;
        return setSelectedCharacter({ ...selectedCharacter, [key]: value });
    }

    useEffect(() => {
        if (selectedCharacter.characterOne) {
            getEpisodesService(selectedCharacter.characterOne.episode)
                .then(res => {
                    const data = Array.isArray(res.data) ? res.data : [res.data]
                    setCharacterOneEpisodes(data);
                })
                .catch(error => {
                    console.error('Error fetching episodes:', error);
                    setCharacterOneEpisodes([]);
                });
        }
    }, [selectedCharacter.characterOne]);

    useEffect(() => {
        if (selectedCharacter.characterTwo) {
            getEpisodesService(selectedCharacter.characterTwo.episode)
                .then(res => {
                    const data = Array.isArray(res.data) ? res.data : [res.data]
                    setCharacterTwoEpisodes(data);
                })
                .catch(error => {
                    console.error('Error fetching episodes:', error);
                    setCharacterTwoEpisodes([]);
                });
        }
    }, [selectedCharacter.characterTwo]);

    useEffect(() => {

        const shared = characterOneEpisodes.filter((characterOneEpisode) => {
            return characterTwoEpisodes.find((characterTwoEpisode) => {
                return characterOneEpisode.id === characterTwoEpisode.id;
            })
        })
        setSharedEpisodes(shared)
    }, [selectedCharacter.characterOne, selectedCharacter.characterTwo])

    return (
        <div className='d-flex flex-column h-100'>
            <div className='c-characters-container d-flex '>
                <div>
                    <h2>Character #1</h2>
                    <div className=' d-flex flex-wrap justify-content-center gap-3 mt-4'>
                        {characterSection.sectionOne.map(({ id, name, status, species, image, episode }) => (
                            <CharacterCard
                                key={id}
                                {...{
                                    id,
                                    name,
                                    status,
                                    species,
                                    image,
                                    setCharacter: (character: Pick<ICharacter, 'id' | 'episode'>) => selectCharacter('characterOne', character),
                                    isSelected: id === selectedCharacter.characterOne?.id,
                                    episode
                                }} />
                        ))}
                    </div>
                </div>

                <div >
                    <h2>Character #2</h2>
                    <div className=' d-flex flex-wrap justify-content-center gap-3 mt-4'>
                        {characterSection.sectionTwo.map(({ id, name, status, species, image, episode }) => (
                            <CharacterCard
                                key={id}
                                {...{
                                    id,
                                    name,
                                    status,
                                    species,
                                    image,
                                    setCharacter: (character: Pick<ICharacter, 'id' | 'episode'>) => selectCharacter('characterTwo', character),
                                    isSelected: id === selectedCharacter.characterTwo?.id,
                                    episode
                                }} />
                        ))}
                    </div>

                </div>

            </div>
            <Paginator
                currentPage={currentPage}
                totalPages={totalPages}
                onPrevPage={handlePrevPage}
                onNextPage={handleNextPage}
            />
            <EpisodesContainer
                characterOneSelected={selectedCharacter.characterOne}
                characterTwoSelected={selectedCharacter.characterTwo}
                characterOneEpisodes={characterOneEpisodes}
                characterTwoEpisodes={characterTwoEpisodes}
                sharedEpisodes={sharedEpisodes}
            />
        </div>
    );
}
