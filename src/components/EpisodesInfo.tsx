import React from 'react';
import { IEpisode } from '../interface/index.interface';

interface EpisodesInfoProps {
  episodes: IEpisode[];
}

export function EpisodesInfo({ episodes }: EpisodesInfoProps) {
  return (
    <div className='c-episode-info'>
      {episodes.map(({ air_date, episode, name }: IEpisode) => (
        <div className='px-3 mb-2' key={episode}>
          <span className='fw-bold'>{episode}: </span>
          <span>{name} - </span>
          <span>{air_date}</span>
        </div>
      ))}
    </div>
  );
}