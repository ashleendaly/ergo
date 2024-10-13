import Map, { MapRef, ScaleControl, Marker } from "react-map-gl";
import { type LngLatBoundsLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useState } from "react";
import fetchDrones from '../hooks/fetchDrones.ts';
import useGetUncollectedPackages from '../hooks/useGetUncollectedPackages.ts';
import { Drone } from '../models/drone';
import { Package } from '../models/package';
import Loader from "./Loader.tsx";
import redDroneIcon from '../assets/red-drone.svg';
import greenDroneIcon from '../assets/green-drone.svg';

import { useLocation } from "../context/clickedLatLong.tsx";

const DroneMap = () => {
  const { updateLocation } = useLocation();
  const mapRef = useRef<MapRef>(null);

  const defaultMapBounds: LngLatBoundsLike = [
    [-4.43, 55.77], // Southwest corner of Glasgow
    [-4.05, 55.97], // Move further east
  ];

  const [mapBounds] = useState<LngLatBoundsLike>(defaultMapBounds);

  const { packages, loading: packagesLoading, error: packagesError } = useGetUncollectedPackages();

  console.log("Current uncollected packages:", packages); // Log the current state of packages

  // Use the fetchDrones hook to get the drones
  const { drones, loading: dronesLoading, error: dronesError } = fetchDrones();

  if (dronesLoading || packagesLoading) {
    return <Loader />;
  }

  if (dronesError) {
    return <div>Error fetching drones: {dronesError}</div>; // Error handling for drones
  }

  if (packagesError) {
    return <div>Error fetching packages: {packagesError}</div>; // Error handling for packages
  }

  const handleMapClick = (event: any) => {
    const { lngLat } = event;
    updateLocation(lngLat.lat, lngLat.lng)
    console.log(`Longitude: ${lngLat.lng}, Latitude: ${lngLat.lat}`);
  };

  console.log("Current packages:", packages); // Log the current state of drones

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

          {packages.map((pkg: Package) => (
            <Marker
              key={pkg.id}
              longitude={pkg.longitude_start}
              latitude={pkg.latitude_start}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  backgroundColor: pkg.status === 'awaiting_assignment' ? 'red' : 'yellow',
                  borderRadius: '2px', // Optional: to give it a slight rounded corner
                }}
                title={`Package: ${pkg.name}, Status: ${pkg.status}`} // Optional: Tooltip with package details
              />
            </Marker>
          ))}
        </Map>
      </div>
    </div>
  );
};

export default DroneMap;
