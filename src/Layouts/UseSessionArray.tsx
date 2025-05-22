import React, { useState, useEffect } from "react";

export const useSessionArray = <T,>(key: string, initialValue: T[]) => {
  // Retrieve initial value from sessionStorage
  const [data, setData] = useState<T[]>(() => {
    const storedData = sessionStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : initialValue;
  });

  // Update sessionStorage whenever the data changes
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  return [data, setData] as const;
};

export const useSessionStorage = (key: string, initialValue: string | null) => {
  const [value, setValue] = useState(() => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue !== null ? storedValue : initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, value ?? "");
  }, [key, value]);

  return [value, setValue] as const;
};

export const useSessionObject = (key: string, initialValue: any) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  const setValue = (value: any) => {
    sessionStorage.setItem(key, JSON.stringify(value));
    setStoredValue(value);
  };

  return [storedValue, setValue] as const;
};
