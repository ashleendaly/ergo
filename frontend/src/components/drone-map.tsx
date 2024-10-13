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
  const [tooltipInfo, setTooltipInfo] = useState<{ x: number, y: number, content: string } | null>(null);

  const { packages, loading: packagesLoading, error: packagesError } = useGetUncollectedPackages();
  const { drones, loading: dronesLoading, error: dronesError } = fetchDrones();

  if (dronesLoading || packagesLoading) {
    return <Loader />;
  }

  if (dronesError) {
    return <div>Error fetching drones: {dronesError}</div>;
  }

  if (packagesError) {
    return <div>Error fetching packages: {packagesError}</div>;
  }

  const handleMapClick = (event: any) => {
    const { lngLat } = event;
    updateLocation(lngLat.lat, lngLat.lng);
  };

  const handlePackageClick = (pkg: Package) => {
    const path: [number, number][] = [
      [pkg.longitude_start, pkg.latitude_start],
      [pkg.longitude_dest, pkg.latitude_dest],
    ];

    if (selectedPath && selectedPath.coordinates[0][0] === pkg.longitude_start && selectedPath.coordinates[0][1] === pkg.latitude_start) {
      setSelectedPath(null);
    } else {
      setSelectedPath({ coordinates: path });
    }
  };

  const handleMouseEnter = (drone: Drone, event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    setTooltipInfo({
      x: clientX,
      y: clientY,
      content: `Drone ID: ${drone.id}, Status: ${drone.status}, Longitude: ${drone.longitude}, Latitude: ${drone.latitude}`
    });
  };

  const handleMouseLeave = () => {
    setTooltipInfo(null);
  };

  return (
    <div className="h-[100dvh] relative">
      <div className="h-full w-[100%]">
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
                src={drone.status === 'Waiting' ? redDroneIcon : greenDroneIcon}
                alt="Drone"
                style={{
                  width: '20px',
                  height: '20px',
                }}
                onMouseEnter={(event) => handleMouseEnter(drone, event)}
                onMouseLeave={handleMouseLeave}
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
                  backgroundColor: pkg.status === 'Awaiting Assignment' ? '#FA8128' : 'yellow',
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
                  "line-color": "#FF5733",
                  "line-width": 3,
                  "line-opacity": 0.8,
                  "line-dasharray": [2, 2],
                }}
                layout={{
                  "line-cap": "round",
                  "line-join": "round",
                }}
              />
            </Source>
          )}
        </Map>

        {tooltipInfo && (
          <div
            className="absolute bg-white text-black p-2 rounded shadow-lg"
            style={{
              left: tooltipInfo.x + 10,
              top: tooltipInfo.y - 30,
              pointerEvents: 'none'
            }}
          >
            {tooltipInfo.content}
          </div>
        )}
      </div>
    </div>
  );
};

export default DroneMap;
