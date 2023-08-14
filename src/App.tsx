import { useState, useEffect } from 'react';
import CharactersContainer from './components/CharactersContainer';
import { getCharactersService } from './service/index.service';
import { ICharacter } from './interface/index.interface';

function App() {

  const [data, setData] = useState<ICharacter[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCharactersService()
      .then((response) => {
        setData(response.data.results);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="App">
      {isLoading ?
        <div className='loading-container'>
          <p className='loading-container__text'>Loading...</p>
        </div>
        :
        <CharactersContainer characters={data} />
      }
    </div>
  );
}

export default App;
