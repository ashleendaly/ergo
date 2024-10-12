export interface Package {
    id: number;
    name: string;
    longitude_start: number;
    latitude_start: number;
    longitude_dest: number;
    latitude_dest: number;
    status: 'flying' | 'waiting';
  }
  