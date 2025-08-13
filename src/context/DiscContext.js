import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadDiscsFromStorage, saveDiscsToStorage } from '../utils/storage';

//Creates the disc context
const DiscContext = createContext();

//hook to access the disc context
export function useDiscs() {
  return useContext(DiscContext);
}

export function DiscProvider({ children }) {
  const [discs, setDiscs] = useState([]);

  //load discs from storage
  useEffect(() => {
    (async () => {
      const storedDiscs = await loadDiscsFromStorage();
      if (storedDiscs) setDiscs(storedDiscs);
    })();
  }, []);

  //save a new disc
  useEffect(() => {
    saveDiscsToStorage(discs);
  }, [discs]);

  function addDisc(disc) {
    setDiscs(prev => [disc, ...prev]);
  }

  function updateDisc(id, patch) {
    setDiscs(prev => prev.map(d => (disc.id === id ? { ...disc, ...patch } : disc)));
  }

  function removeDisc(id) {
    setDiscs(prev => prev.filter(disc => disc.id !== id));
  }

  return (
    <DiscContext.Provider value={{ discs, addDisc, updateDisc, removeDisc }}>
      {children}
    </DiscContext.Provider>
  );
}
