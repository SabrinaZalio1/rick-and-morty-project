import React from 'react';
import './App.css';
import CharacterCard from './components/CharacterCard';
import { useState, useEffect } from 'react';
import CharactersContainer from './components/CharactersContainer';

export interface ICharacter {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  image: string;
  episode: string[]
}

function App() {
  const [data, setData] = useState<ICharacter[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [charactersSelect, setCharacterSelected] = useState<{ characterOne: ICharacter | null, characterTwo: ICharacter | null }>({
    characterOne: null, characterTwo: null
  })

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => response.json())
      .then((data) => {
        setData(data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  // console.log(data)
  return (
    <div className="App">
      {(isLoading || !data) ? (
        <p>Loading...</p>
      ) : (
        <CharactersContainer characters={data} />
      )}
    </div>
  );
}

export default App;
