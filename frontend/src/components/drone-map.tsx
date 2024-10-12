import Map, {
    MapRef,
    ScaleControl,
  } from "react-map-gl";
  import { type LngLatBoundsLike } from "mapbox-gl";
  import "mapbox-gl/dist/mapbox-gl.css";
  import { useRef, useState } from "react";
  
  const DroneMap = () => {
  
  
    const mapRef = useRef<MapRef>(null);
  
    const defaultMapBounds: LngLatBoundsLike = [
      [-4.43, 55.77], // Southwest corner of Glasgow
      [-4.05, 55.97], // Move further east
    ];
  
    const [mapBounds] = useState<LngLatBoundsLike>(defaultMapBounds);
    
  
    return (
      <div className="h-[100dvh]">
        <div className="h-full">
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
          >
            <ScaleControl unit="metric" />
          </Map>
        </div>
      </div>
    );
  };
  
  export default DroneMap;