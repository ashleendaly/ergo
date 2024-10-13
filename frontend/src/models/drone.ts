export interface Drone {
    id: number;
    address: string;
    longitude: number;
    latitude: number;
    status: 'Flying' | 'Waiting';
  }
  