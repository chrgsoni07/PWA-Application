import { useState } from "react";

const useToggle = (defState: boolean): [boolean, () => void] => {
  const [state, setState] = useState(defState);
  const toggleState = () => setState((s) => !s);

  return [state, toggleState];
};

export default useToggle;
