import { ICharacter, IEpisode } from '../interface/index.interface';
import { EpisodesInfo } from './EpisodesInfo';

interface EpisodesContainerProps {
    characterOneEpisodes: IEpisode[];
    characterTwoEpisodes: IEpisode[];
    characterOneSelected: Pick<ICharacter, "episode" | "id"> | null;
    characterTwoSelected: Pick<ICharacter, "episode" | "id"> | null;
    sharedEpisodes: IEpisode[];
}

export default function EpisodesContainer({ characterOneEpisodes, characterTwoEpisodes, characterOneSelected, characterTwoSelected, sharedEpisodes }: EpisodesContainerProps) {

    return (
        <div className='c-episodes-container d-flex justify-content-around'>
            <div className='c-episodes-container__list w-100'>
                <h5 className='c-episodes-container__title text-center py-4'>Character #1 - Only episodes</h5>
                {characterOneSelected === null ? <div className='c-episodes-container__empty-state text-center mt-2'>not selected yet</div> :
                    <EpisodesInfo episodes={characterOneEpisodes} />
                }
            </div>
            <div className='c-episodes-container__list w-100'>
                <h5 className='c-episodes-container__title text-center py-4'>Character #1 & #2 - Shared episodes</h5>
                {(characterOneSelected === null || characterTwoSelected === null) ? <div className='c-episodes-container__empty-state text-center mt-2'>not selected yet</div> :
                    <EpisodesInfo episodes={sharedEpisodes} />
                }
            </div>
            <div className='c-episodes-container__list w-100'>
                <h5 className='c-episodes-container__title text-center py-4'>Character #2 - Only episodes</h5>
                {characterTwoSelected === null ? <div className='c-episodes-container__empty-state text-center mt-2'>not selected yet</div> :
                    <EpisodesInfo episodes={characterTwoEpisodes} />
                }
            </div>
        </div>
    )
}
