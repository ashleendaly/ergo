import Map, { MapRef, ScaleControl, Marker, Source, Layer } from "react-map-gl";
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
  const [selectedPath, setSelectedPath] = useState<{ coordinates: [number, number][] } | null>(null);

  const { packages, loading: packagesLoading, error: packagesError } = useGetUncollectedPackages();
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

  const handlePackageClick = (pkg: Package) => {
    const path: [number, number][] = [
      [pkg.longitude_start, pkg.latitude_start], // Start position
      [pkg.longitude_dest, pkg.latitude_dest],   // Destination position
    ];

    // Check if the selected path is already the one we want to toggle
    if (selectedPath && selectedPath.coordinates[0][0] === pkg.longitude_start && selectedPath.coordinates[0][1] === pkg.latitude_start) {
      // Deselect the path if it's already selected
      setSelectedPath(null);
    } else {
      // Set the new path if it's not the currently selected one
      setSelectedPath({ coordinates: path });
    }
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

          {packages.map((pkg: Package) => (
            <Marker
              key={pkg.id}
              longitude={pkg.longitude_start}
              latitude={pkg.latitude_start}
              onClick={() => handlePackageClick(pkg)}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  backgroundColor: pkg.status === 'awaiting_assignment' ? '#FA8128' : 'yellow',
                  borderRadius: '2px', 
                }}
                title={`Package: ${pkg.name}, Status: ${pkg.status}`}
              />
            </Marker>
          ))}

          {selectedPath && (
            <Source id="path" type="geojson" data={{
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: selectedPath.coordinates,
              },
              properties: {}
            }}>
              <Layer
                id="lineLayer"
                type="line"
                paint={{
                  "line-color": "#FF5733", // Customize the color of the line
                  "line-width": 3,         // Customize the width of the line
                  "line-opacity": 0.8,
                  "line-dasharray": [2, 2], // Dashed line for better visibility
                }}
                layout={{
                  "line-cap": "round",
                  "line-join": "round",
                  // "line-arrow": "arrow", // Enable arrows on the line
                  // "symbol-placement": "line",
                  // "line-arrow-size": 1.5, // Adjust the size of the arrow
                }}
              />
            </Source>
          )}
        </Map>
      </div>
    </div>
  );
};

export default DroneMap;
