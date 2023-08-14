import { IEpisode } from '../interface/index.interface';

interface EpisodesContainerProps {
    characterOneEpisodes: IEpisode[];
    characterTwoEpisodes: IEpisode[];
    characterOneSelected: any;
    characterTwoSelected: any;
    sharedEpisodes: any;
}

export default function EpisodesContainer({ characterOneEpisodes, characterTwoEpisodes, characterOneSelected, characterTwoSelected, sharedEpisodes }: EpisodesContainerProps) {

    return (
        <div className='c-episodes-container d-flex justify-content-around'>
            <div className='c-episodes-container__list w-100'>
                <h5 className='text-center py-4'>Character #1 - Only episodes</h5>

                {characterOneSelected === null ? <div className='text-center mt-2'>not selected yet</div> :
                    characterOneEpisodes.map(({ air_date, name, episode }: IEpisode) => (
                        <div className='px-3 mb-2'>
                            <span className='fw-bold'>{episode}: </span>
                            <span>{name} - </span>
                            <span>{air_date}</span>
                        </div>
                    ))
                }
            </div>
            <div className='c-episodes-container__list w-100'>

                <h5 className='text-center py-4'>Character #1 & #2 - Shared episodes</h5>
                {(characterOneSelected === null || characterTwoSelected === null) ? <div className='text-center mt-2'>not selected yet</div> :
                    sharedEpisodes.map(({ air_date, episode, name }: IEpisode) => (
                        <div className='px-3 mb-2'>
                            <span className='fw-bold'>{episode}: </span>
                            <span>{name} - </span>
                            <span>{air_date}</span>
                        </div>
                    ))
                }
            </div>
            <div className='c-episodes-container__list w-100'>
                <h5 className='text-center py-4'>Character #2 - Only episodes</h5>
                {characterTwoSelected === null ? <div className='text-center mt-2'>not selected yet</div> :
                    characterTwoEpisodes.map(({ air_date, name, episode }: IEpisode) => (
                        <div className='px-3 mb-2'>
                            <span className='fw-bold'>{episode}: </span>
                            <span>{name} - </span>
                            <span>{air_date}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
