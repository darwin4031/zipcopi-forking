import { useState } from "react";

const useObjectState = (initialState) => {
  const [state, setStateRaw] = useState(initialState);
  const setState = (partialState) =>
    setStateRaw({
      ...state,
      ...(typeof partialState === "function" ? partialState(state) : partialState),
    });

  return [state, setState];
};

export default useObjectState;
