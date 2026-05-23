import { useState, useEffect } from 'react';

export function usePersonalization() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recents, setRecents] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const favs = localStorage.getItem('wtk_favorites');
      const recs = localStorage.getItem('wtk_recents');
      if (favs) setFavorites(JSON.parse(favs));
      if (recs) setRecents(JSON.parse(recs));
      setIsLoaded(true);
    }
  }, []);

  const toggleFavorite = (slug: string) => {
    setFavorites(prev => {
      const isFav = prev.includes(slug);
      const newFavs = isFav ? prev.filter(id => id !== slug) : [...prev, slug];
      if (typeof window !== 'undefined') {
        localStorage.setItem('wtk_favorites', JSON.stringify(newFavs));
      }
      return newFavs;
    });
  };

  const addRecent = (slug: string) => {
    setRecents(prev => {
      const newRecents = [slug, ...prev.filter(id => id !== slug)].slice(0, 5);
      if (typeof window !== 'undefined') {
        localStorage.setItem('wtk_recents', JSON.stringify(newRecents));
      }
      return newRecents;
    });
  };

  return { favorites, recents, toggleFavorite, addRecent, isLoaded };
}

export function usePersistentState<T>(key: string, initialValue: T): [T, (val: T) => void] {
  const [state, setState] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(`wtk_input_${key}`);
      if (cached) {
        try {
          return JSON.parse(cached) as T;
        } catch(e) {}
      }
    }
    return initialValue;
  });

  const setPersistentState = (val: T) => {
    setState(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`wtk_input_${key}`, JSON.stringify(val));
    }
  };

  return [state, setPersistentState];
}
