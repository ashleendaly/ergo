// src/components/FormComponent.tsx
import React, { useState } from 'react';
import StyledInput from './StyledInput'; // Ensure this is the correct path for your input component
import { Button } from './Button';
import DroneMap from './drone-map';

interface FormComponentProps {
  onSubmit: (packageDetails: {
    packageName: string;
    currentLat: number | '';
    currentLng: number | '';
    destLat: number | '';
    destLng: number | '';
  }) => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ onSubmit }) => {
  const [packageName, setPackageName] = useState<string>('');
  const [currentLat, setCurrentLat] = useState<number | ''>('');
  const [currentLng, setCurrentLng] = useState<number | ''>('');
  const [destLat, setDestLat] = useState<number | ''>('');
  const [destLng, setDestLng] = useState<number | ''>('');
  const [isMapVisible, setIsMapVisible] = useState<boolean>(false);
  const [selectedCoordinates, setSelectedCoordinates] = useState<{ lat: number; lng: number } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
    onSubmit({
      packageName,
      currentLat,
      currentLng,
      destLat,
      destLng,
    });
    };
    
  const handleChooseCoordinates = (lat: number, lng: number, isDestination: boolean) => {
    if (isDestination) {
      setDestLat(lat);
      setDestLng(lng);
    } else {
      setCurrentLat(lat);
      setCurrentLng(lng);
    }
    setIsMapVisible(false); // Close the map after choosing coordinates
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <StyledInput
        label="Package Name:"
        type="text"
        value={packageName}
        onChange={(value) => setPackageName(value as string)} // Correctly handle input change
        required
      />
      <StyledInput
        label="Current Longitude:"
        type="number"
        value={currentLng}
        onChange={(value) => setCurrentLng(value as number)} // Correctly handle input change
        required
      />
      <Button handleClick={() => setIsMapVisible(true)}>Choose on Map</Button>
      <StyledInput
        label="Current Latitude:"
        type="number"
        value={currentLat}
        onChange={(value) => setCurrentLat(value as number)} // Correctly handle input change
        required
      />
      <StyledInput
        label="Destination Longitude:"
        type="number"
        value={destLng}
        onChange={(value) => setDestLng(value as number)} // Correctly handle input change
        required
      />
      <Button handleClick={() => setIsMapVisible(true)}>Choose on Map</Button>    
      <StyledInput
        label="Destination Latitude:"
        type="number"
        value={destLat}
        onChange={(value) => setDestLat(value as number)} // Correctly handle input change
        required
      />      
      <Button handleClick={handleSubmit}>Submit Package</Button> {/* Handle click by calling the submit handler */}
    </form>
  );
};

export default FormComponent;
