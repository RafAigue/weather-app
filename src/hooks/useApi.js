import { useState } from "react";

export const useApi = () => {
  const [apiState, setApiState] = useState({
    loading: false,
    error: false,
    data: null,
  });

  const updateApiState = (updates) => {
    setApiState((prev) => ({ ...prev, ...updates }));
  };

  return { apiState, updateApiState };
};
