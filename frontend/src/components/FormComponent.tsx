// src/components/FormComponent.tsx
import React, { useEffect, useState } from 'react';
import StyledInput from './StyledInput'; // Ensure this is the correct path for your input component
import { Button } from './Button';
import { useLocation } from '../context/clickedLatLong';

interface FormComponentProps {
  onSubmit: (packageDetails: {
    name: string;
    longitude_start: number | '';
    latitude_start: number | '';
    longitude_dest: number | '';
    latitude_dest: number | '';
  }) => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ onSubmit }) => {
  const {location} = useLocation()
  const [name, setPackageName] = useState<string>('');
  const [longitude_start, setCurrentLat] = useState<number | ''>('');
  const [latitude_start, setCurrentLng] = useState<number | ''>('');
  const [longitude_dest, setDestLat] = useState<number | ''>('');
  const [latitude_dest, setDestLng] = useState<number | ''>('');
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
      name,
      longitude_start,
      latitude_start,
      longitude_dest,
      latitude_dest,
    });
    };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <StyledInput
        label="Package Name:"
        type="text"
        value={name}
        onChange={(value) => setPackageName(value as string)} // Correctly handle input change
        required
      />
      <StyledInput
        label="Current Longitude:"
        type="number"
        value={longitude_start}
        onChange={(value) => setCurrentLng(value as number)} // Correctly handle input change
        required
      />
      <br></br>
      <br></br>
      <StyledInput
        label="Current Latitude:"
        type="number"
        value={latitude_start}
        onChange={(value) => setCurrentLat(value as number)} // Correctly handle input change
        required
      />
      <Button handleClick={() => setFormState(1)}>Confirm</Button>
      <br></br>
      <br></br> 
      <StyledInput
        label="Destination Longitude:"
        type="number"
        value={longitude_dest}
        onChange={(value) => setDestLng(value as number)} // Correctly handle input change
        required
      />
      <StyledInput
        label="Destination Latitude:"
        type="number"
        value={latitude_dest}
        onChange={(value) => setDestLat(value as number)} // Correctly handle input change
        required
      />
      <Button handleClick={() => setFormState(0)}>Confirm</Button>       
      <Button handleClick={handleSubmit}>Submit Package</Button> {/* Handle click by calling the submit handler */}
      <br></br>
      <br></br>
    </form>
  );
};

export default FormComponent;
