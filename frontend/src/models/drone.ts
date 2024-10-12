export interface Drone {
    id: number;
    address: string;
    longitude: number;
    latitude: number;
    status: 'flying' | 'waiting';
  }
  