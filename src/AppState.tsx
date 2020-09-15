import React from 'react';

type GlobalState = {
  playing: boolean;
};
export const AppState = React.createContext<GlobalState>({ playing: false });
