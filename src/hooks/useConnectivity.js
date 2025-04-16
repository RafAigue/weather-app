import { useState } from "react";

export const useConnectivity = () => {
  const [connectivityState, setConnectivityState] = useState({
    network: null,
    airplaneMode: false,
  });

  const updateConnectivityState = (updates) => {
    setConnectivityState((prev) => ({ ...prev, ...updates }));
  };

  return { connectivityState, updateConnectivityState };
};
