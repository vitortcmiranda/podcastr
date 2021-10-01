import { createContext, ReactNode, useContext, useState } from 'react';

type Episode = {
    title: string;
    members: string; 
    thumbnail: string;
    duration: number;
    url: string;
}

type PlayerContextData = {
    episodeList : Array<Episode>;
    currentEpisodeIndex : number;
    isPlaying: boolean;
    play: (episode : Episode) => void; 
    playList: (list : Episode[], index: number) => void; 
    setPlayingState: (state : boolean) => void; 
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
}

export const PlayerContext = createContext({}  as PlayerContextData);

type PlayerContextProviderProps = {
    children: ReactNode;
}

export function PlayerContextProvider( { children } : PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [ isPlaying, setIsPlaying ] = useState(false);

  function play(episode : Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay(episode) {
    setIsPlaying(!isPlaying);
  }

  function setPlayingState(state : boolean) {
    setIsPlaying(state);
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = (currentEpisodeIndex + 1) < episodeList.length;

  function playNext() {
      const nextEpisodeIndex = currentEpisodeIndex + 1;
      if ( hasNext ) {
        setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      } 
  }

  function playPrevious() {
     if( hasPrevious ) {
        setCurrentEpisodeIndex(currentEpisodeIndex -1);
     }
  }

  return (
    <PlayerContext.Provider 
        value={{ 
            episodeList,
            currentEpisodeIndex,
            play,
            isPlaying,
            togglePlay,
            setPlayingState,
            playList,
            playNext,
            playPrevious,
            hasNext,
            hasPrevious
            }}
        >
        {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  return useContext(PlayerContext);
}