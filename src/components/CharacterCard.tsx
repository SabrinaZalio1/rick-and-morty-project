import React from 'react'
import { ICharacter } from '../App'

interface ICharacterCard extends ICharacter {
    setCharacter: (id: ICharacter['id']) => void;
    isSelected: boolean;
}


export default function CharacterCard({ id, name, status, species, image, setCharacter, isSelected }: ICharacterCard) {

    const handleOnClick = () => {
        setCharacter(id)
    }

    return (
        <div className={`c-character-card d-flex border border-dark rounded ${isSelected && 'bg-success'}`} onClick={handleOnClick}>
            <img src={image} alt="character profile picture" className='rounded-left' />
            <div className='c-character-card__container'>
                <p className='c-character-card__name'>{name}</p>
                <div>
                    <span className='c-character-card__info'>{status} - {species}</span>
                </div>
            </div>
        </div>
    )
}
