import React, { createContext } from 'react';
import { useImmerReducer } from 'use-immer';
import polls from 'data/polls.json';

export const PollStateContext = createContext();
export const PollDispatchContext = createContext();

const initialState = {
  polls,
  results: null,
  isSubmit: false,
};

const reducer = (draft, action) => {
  switch (action.type) {
    case 'SET_SUBMIT':
      draft.isSubmit = action.payload;
      return;
    case 'SET_RESULT':
      draft.results = action.payload;
      draft.isSubmit = false;
      return;
    default:
      throw new Error();
  }
};

export default function PollContextProvider({ children }) {
  const [state, dispatch] = useImmerReducer(reducer, {
    ...initialState,
  });

  return (
    <PollDispatchContext.Provider value={dispatch}>
      <PollStateContext.Provider value={state}>
        {children}
      </PollStateContext.Provider>
    </PollDispatchContext.Provider>
  );
}
