import { createContext, useState, useContext } from 'react';

interface Location {
  latitude: number | null;
  longitude: number | null;
}

interface LocationContextType {
  location: Location;
  updateLocation: (latitude: number, longitude: number) => void;
}

const LocationContext = createContext<LocationContextType>({
  location: { latitude: null, longitude: null },
  updateLocation: () =>  {},
});

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<{latitude: number|null, longitude:number|null}>({
    latitude: null,
    longitude: null,
  });

  const updateLocation = (latitude: number, longitude: number) => {
    setLocation({ latitude, longitude });
  };

  return (
    <LocationContext.Provider value={{ location, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  return useContext(LocationContext);
};
