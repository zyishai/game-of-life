import { useState } from 'react';

type PlayingState = {
  playing: boolean;
  startPlaying: () => void;
  stopPlaying: () => void;
};

export const usePlayingState = (initialState = false): PlayingState => {
  const [playing, setPlaying] = useState(initialState);

  return {
    playing,
    startPlaying: () => setPlaying(true),
    stopPlaying: () => setPlaying(false),
  };
};
