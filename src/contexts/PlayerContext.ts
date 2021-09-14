import { createContext } from 'react';

type Episode = {
    title: string;
    members: string; 
    duration: string;
    url:string;
}

type PlayerContextData = {
    episodeList: Array<Episode>;
    currentEpisodeIndex: number;
}

export const PlayerContext = createContext({}  as PlayerContextData);