import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadDiscsFromStorage, saveDiscsToStorage } from '../utils/storage';

const DiscContext = createContext();

export function useDiscs() {
  return useContext(DiscContext);
}

export function DiscProvider({ children }) {
  const [discs, setDiscs] = useState([]);
  useEffect(() => {
    (async () => {
      const stored = await loadDiscsFromStorage();
      if (stored) setDiscs(stored);
    })();
  }, []);

  useEffect(() => {
    saveDiscsToStorage(discs);
  }, [discs]);

  function addDisc(disc) {
    setDiscs(prev => [disc, ...prev]);
  }

  function updateDisc(id, patch) {
    setDiscs(prev => prev.map(d => (d.id === id ? { ...d, ...patch } : d)));
  }

  function removeDisc(id) {
    setDiscs(prev => prev.filter(d => d.id !== id));
  }

  return (
    <DiscContext.Provider value={{ discs, addDisc, updateDisc, removeDisc }}>
      {children}
    </DiscContext.Provider>
  );
}
