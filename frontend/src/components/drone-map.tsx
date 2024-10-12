import Map, {
    MapRef,
    ScaleControl,
    Marker,
  } from "react-map-gl";
import { type LngLatBoundsLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useState } from "react";
import redDroneIcon from '../assets/red-drone.svg';
import { Drone } from '../models/drone.ts';
import greenDroneIcon from '../assets/green-drone.svg';
  
const DroneMap = () => {
  
  
    const mapRef = useRef<MapRef>(null);
  
    const defaultMapBounds: LngLatBoundsLike = [
      [-4.43, 55.77], // Southwest corner of Glasgow
      [-4.05, 55.97], // Move further east
    ];
  
    const [mapBounds] = useState<LngLatBoundsLike>(defaultMapBounds);
      
    const markerCoordinates = { longitude: -4.25, latitude: 55.85 };

    const drones: Drone[] = [
        { id: 1, address: "Location A", longitude: -4.25, latitude: 55.85, status: 'flying' },
        { id: 2, address: "Location B", longitude: -4.20, latitude: 55.90, status: 'waiting' },
        // Add more drones as needed
    ];
    
  
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
            //dragPan={false} // If this is uncommented the map will be frozen (you can still zoom)
          >
            <ScaleControl unit="metric" />
                    
            {drones.map((drone) => (
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