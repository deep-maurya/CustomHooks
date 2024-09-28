import { useState } from 'react';

export const useLocalStorage = (key, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : defaultValue;
    } catch (err) {
      return defaultValue;
    }
  });

  const setValue = (value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (err) {
      console.error(err);
    }
  };

  return [storedValue, setValue];
};
