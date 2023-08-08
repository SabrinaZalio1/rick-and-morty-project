import { ICharacter } from '../App'
interface ICharacterCard extends ICharacter {
    setCharacter: (character: Pick<ICharacter, 'id' | 'episode'>) => void;
    isSelected: boolean;
}


export default function CharacterCard({ id, name, status, species, image, setCharacter, isSelected, episode }: ICharacterCard) {

    const getEpisodeId = (urls: string[]) => {
        return urls.map((url) => {
            const segments = url.split('/');
            const lastSegment = segments[segments.length - 1];

            return lastSegment
        })
    }
    const handleOnClick = () => {
        setCharacter({ id, episode: getEpisodeId(episode) })
    }

    let statusClass = '';

    switch (status) {
        case 'Alive':
            statusClass = 'green';
            break;
        case 'Dead':
            statusClass = 'red';
            break;
        case 'unknown':
            statusClass = 'grey';
            break;
        default:
            break;
    }

    return (
        <div className={`c-character-card d-flex rounded ${isSelected && 'c-character-card__isSelected'}`} onClick={handleOnClick}>
            <img src={image} alt="character profile picture" className='c-character-card__picture rounded-left' />
            <div className='c-character-card__container'>
                <p className='c-character-card__name'>{name}</p>
                <div className='d-flex align-items-center flex-wrap'>
                    <div className='c-character-card__info d-flex align-items-center'>
                        <div className={`c-character-card__status-bubble ${statusClass === 'green' && 'twinkling'} me-2 ${statusClass}`}></div>
                        {status}
                    </div >

                    <span className='c-character-card__info'> - {species}</span>
                </div>
            </div>
        </div>
    )
}
