import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import { ICharacter } from '../App';

interface ICharactersContainerProps {
    characters: ICharacter[];
}


interface ICharacterSection {
    sectionOne: ICharacter[];
    sectionTwo: ICharacter[];
}

export default function CharactersContainer({ characters }: ICharactersContainerProps) {
    // const [characterSection, setCharacterSection] = useState<{ sectionOne: ICharacter[], sectionTwo: ICharacter[] }>({
    //     sectionOne: [],
    //     sectionTwo: [],
    // });

    const [characterSection, setCharacterSection] = useState<ICharacterSection>({
        sectionOne: [],
        sectionTwo: [],
    });

    const [selectedCharacter, setSelectedCharacter] = useState<{ characterOne: ICharacter['id'] | null, characterTwo: ICharacter['id'] | null }>({
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

    const selectCharacter = (key: 'characterOne' | 'characterTwo', id: ICharacter['id'] | null) => {
        const value = selectedCharacter[key] === id ? null : id;
        return setSelectedCharacter({ ...selectedCharacter, [key]: value });
    }

    return (
        <div className='c-characters-container d-flex'>
            <div>
                <span>Character #1</span>
                {characterSection.sectionOne.map(({ id, name, status, species, image }) => (
                    <CharacterCard
                        key={id}
                        {...{
                            id,
                            name,
                            status,
                            species,
                            image,
                            setCharacter: (id: ICharacter['id']) => selectCharacter('characterOne', id),
                            isSelected: id === selectedCharacter.characterOne
                        }} />
                ))}
            </div>
            <div>
                <span>Character #2</span>
                {characterSection.sectionTwo.map(({ id, name, status, species, image }) => (
                    <CharacterCard
                        key={id}
                        {...{
                            id,
                            name,
                            status,
                            species,
                            image,
                            setCharacter: (id: ICharacter['id']) => selectCharacter('characterTwo', id),
                            isSelected: id === selectedCharacter.characterTwo
                        }} />
                ))}
            </div>

        </div>
    );
}
