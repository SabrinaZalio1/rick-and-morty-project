import React from 'react';
import './App.css';
import CharacterCard from './components/CharacterCard';
import { useState, useEffect } from 'react';
import CharactersContainer from './components/CharactersContainer';
import axios from 'axios';
import { getCharactersService } from './service/index.service';
import EpisodesContainer from './components/EpisodesContainer';

export interface ICharacter {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  image: string;
  episode: string[]
}

function App() {
  const [data, setData] = useState<ICharacter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [charactersSelect, setCharacterSelected] = useState<{ characterOne: ICharacter | null, characterTwo: ICharacter | null }>({
    characterOne: null, characterTwo: null
  })
  const [showLoadingForFewSeconds, setShowLoadingForFewSeconds] = useState(true);


  useEffect(() => {
    getCharactersService()
      .then((response) => {
        setData(response.data.results);
        setTimeout(() => {
          setIsLoading(false);
          setShowLoadingForFewSeconds(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  // console.log('data', data)
  return (
    <div className="App ">
      {(isLoading || (showLoadingForFewSeconds && !data)) ?
        <div className='loading-container'>
          <p className='loading-container__text'>Loading...</p>
        </div>
        :
        <>
          <CharactersContainer characters={data} />
        </>
      }
    </div>
  );
}

export default App;
