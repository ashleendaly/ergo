// src/components/FormComponent.tsx
import React, { useEffect, useState } from 'react';
import StyledInput from './StyledInput'; // Ensure this is the correct path for your input component
import { Button } from './Button';
import { useLocation } from '../context/clickedLatLong';

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
  const {location} = useLocation()
  const [packageName, setPackageName] = useState<string>('');
  const [currentLat, setCurrentLat] = useState<number | ''>('');
  const [currentLng, setCurrentLng] = useState<number | ''>('');
  const [destLat, setDestLat] = useState<number | ''>('');
  const [destLng, setDestLng] = useState<number | ''>('');
  const [formState, setFormState] = useState<number>(0)

  useEffect(() => {
    if (formState == 0) {
      setCurrentLat(location.latitude!);
      setCurrentLng(location.longitude!);
    } else if (formState == 1) {
      setDestLat(location.latitude!);
      setDestLng(location.longitude!);
    }
  }, [location])

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
      <StyledInput
        label="Current Latitude:"
        type="number"
        value={currentLat}
        onChange={(value) => setCurrentLat(value as number)} // Correctly handle input change
        required
      />
      <Button handleClick={() => setFormState(1)}>Confirm</Button>
      <StyledInput
        label="Destination Longitude:"
        type="number"
        value={destLng}
        onChange={(value) => setDestLng(value as number)} // Correctly handle input change
        required
      />
      <StyledInput
        label="Destination Latitude:"
        type="number"
        value={destLat}
        onChange={(value) => setDestLat(value as number)} // Correctly handle input change
        required
      />
      <Button handleClick={() => setFormState(0)}>Confirm</Button>       
      <Button handleClick={handleSubmit}>Submit Package</Button> {/* Handle click by calling the submit handler */}
    </form>
  );
};

export default FormComponent;
