import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import { ICharacter } from '../App';
import { getEpisodesService } from '../service/index.service';

interface ICharactersContainerProps {
    characters: ICharacter[];
}

interface ICharacterSection {
    sectionOne: ICharacter[];
    sectionTwo: ICharacter[];
}

interface ICharacterSelected {
    // characterOne: { id: number, episodes: string[] },
    characterOne: Pick<ICharacter, 'id' | 'episode'> | null;
    characterTwo: Pick<ICharacter, 'id' | 'episode'> | null
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

    useEffect(() => {
        splitArray(characters);
    }, [characters]);

    const splitArray = (characters: ICharacter[]) => {
        const midIndex = Math.ceil(characters.length / 2);
        const sectionOneArray = characters.slice(0, midIndex);
        const sectionTwoArray = characters.slice(midIndex);

        setCharacterSection({
            sectionOne: sectionOneArray,
            sectionTwo: sectionTwoArray,
        });
    };

    const selectCharacter = (key: 'characterOne' | 'characterTwo', character: Pick<ICharacter, 'id' | 'episode'>) => {
        const value = selectedCharacter[key]?.id === character.id ? null : character;
        return setSelectedCharacter({ ...selectedCharacter, [key]: value });
    }

    console.log('selected character', selectedCharacter.characterOne)
    if (selectedCharacter.characterOne) {
        getEpisodesService(selectedCharacter.characterOne.episode)
            .then(
                res => console.log('res de episode', res.data)
            )
    }

    return (
        <>
            <div className='c-characters-container d-flex p-4'>
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
            {/* <div>
                <div>
                    <p>Character #1 - Only episodes</p>
                    <div>

                    </div>
                </div>
            </div> */}
        </>
    );
}
