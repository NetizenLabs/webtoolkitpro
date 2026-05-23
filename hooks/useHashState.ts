import { useState, useCallback } from 'react';

export function useHashState<T>(initialState: T): [T, (newState: T) => void] {
  const [state, setState] = useState<T>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      try {
        const hashStr = window.location.hash.replace('#', '');
        if (hashStr) {
          const decoded = atob(decodeURIComponent(hashStr));
          return JSON.parse(decoded) as T;
        }
      } catch (e) {
        console.error('Failed to parse state from URL hash', e);
      }
    }
    return initialState;
  });

  const setHashState = useCallback((newState: T) => {
    setState(newState);
    if (typeof window !== 'undefined') {
      try {
        const jsonStr = JSON.stringify(newState);
        const encoded = encodeURIComponent(btoa(jsonStr));
        // Use replaceState to avoid cluttering history
        window.history.replaceState(null, '', `#${encoded}`);
      } catch (e) {
        console.error('Failed to serialize state to URL hash', e);
      }
    }
  }, []);

  return [state, setHashState];
}
