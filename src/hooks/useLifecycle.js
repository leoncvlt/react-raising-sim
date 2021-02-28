import { useEffect } from "react";

export const useLifecycle = ({ onMount, onUnmount }) => {
  useEffect(() => {
    onMount && onMount();
    return onUnmount;
  }, []);
};
