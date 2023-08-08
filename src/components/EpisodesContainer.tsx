import React from 'react'
import { getEpisodesService } from '../service/index.service';


export default function EpisodesContainer() {
    return (
        <div className='c-episode-container d-flex justify-content-around'>
            <div className='border border-dark w-100 pt-3'>
                <p className='text-center'>Character #1 - Only episodes</p>
                <div>
                    <span>episode</span>
                    <span>name</span>
                    <span>airDate</span>
                </div>
            </div>
            <div className='border border-dark w-100'>
                <p>Character #1 & #2 - Shared episodes</p>
            </div>
            <div className='border border-dark w-100'>
                <p>Character #2 - Only episodes</p>
            </div>
        </div>
    )
}
