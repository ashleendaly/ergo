import Map, { MapRef, ScaleControl, Marker } from "react-map-gl";
import { type LngLatBoundsLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useState } from "react";
import fetchDrones from '../hooks/fetchDrones.ts';
import { Drone } from '../models/drone';

import redDroneIcon from '../assets/red-drone.svg';
import greenDroneIcon from '../assets/green-drone.svg';

const DroneMap = () => {
  const mapRef = useRef<MapRef>(null);

  const defaultMapBounds: LngLatBoundsLike = [
    [-4.43, 55.77], // Southwest corner of Glasgow
    [-4.05, 55.97], // Move further east
  ];

  const [mapBounds] = useState<LngLatBoundsLike>(defaultMapBounds);

  // Use the fetchDrones hook to get the drones
  const { drones, loading, error } = fetchDrones();

  if (loading) {
    return <div>Loading drones...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Error handling
  }

  const handleMapClick = (event: any) => {
    const { lngLat } = event;
    console.log(`Longitude: ${lngLat.lng}, Latitude: ${lngLat.lat}`);
  };

  return (
    <div className="h-[100dvh]">
      <div className="h-full w-[75%]">
        <Map
          ref={mapRef}
          mapboxAccessToken={import.meta.env.VITE_REACT_APP_MAPBOX_ACCESS_TOKEN}
          initialViewState={{
            bounds: mapBounds,
            fitBoundsOptions: {
              padding: 120,
            },
          }}
          mapStyle={"mapbox://styles/mapbox/dark-v9"}
          renderWorldCopies={false}
          maxBounds={defaultMapBounds}
          onClick={handleMapClick}
        >
          <ScaleControl unit="metric" />

          {drones.map((drone: Drone) => (
            <Marker key={drone.id} longitude={drone.longitude} latitude={drone.latitude}>
              <img
                src={drone.status === 'flying' ? redDroneIcon : greenDroneIcon}
                alt="Drone"
                style={{
                  width: '20px',
                  height: '20px',
                }}
              />
            </Marker>
          ))}
        </Map>
      </div>
    </div>
  );
};

export default DroneMap;
