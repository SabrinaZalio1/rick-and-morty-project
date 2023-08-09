import { IEpisode } from '../interface/index.interface';

interface EpisodesContainerProps {
    characterOneEpisodes: IEpisode[] | IEpisode;
}

export default function EpisodesContainer({ characterOneEpisodes }: EpisodesContainerProps) {
    console.log('character one episodes', characterOneEpisodes)
    const episodesArray = Array.isArray(characterOneEpisodes) ? characterOneEpisodes : [characterOneEpisodes];
    return (
        <div className='c-episode-container d-flex justify-content-around'>
            <div className='border border-dark w-100'>
                <h5 className='text-center py-4'>Character #1 - Only episodes</h5>

                {
                    episodesArray.map(({ air_date, name, episode }: IEpisode) => (
                        <div className='px-3 mb-2'>
                            <span className='fw-bold'>{episode}: </span>
                            <span>{name} - </span>
                            <span>{air_date}</span>
                        </div>
                    ))
                }
            </div>
            <div className='border border-dark w-100'>
                <h5 className='text-center py-4'>Character #1 & #2 - Shared episodes</h5>
            </div>
            <div className='border border-dark w-100'>
                <h5 className='text-center py-4'>Character #2 - Only episodes</h5>
            </div>
        </div>
    )
}
