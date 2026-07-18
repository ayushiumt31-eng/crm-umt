import { useEffect } from "react";

export function useMount(callback: () => void | (() => void)) {
  useEffect(() => {
    return callback();
  }, [callback]);
}

export function useUnmount(callback: () => void) {
  useEffect(() => {
    return () => {
      callback();
    };
  }, [callback]);
}
