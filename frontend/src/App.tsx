import DroneMap from "./components/drone-map";
import Sidebar from './components/Sidebar';
import { LocationProvider } from "./context/clickedLatLong";

function App() {
  return (
    <>
      <LocationProvider>
        <Sidebar />
        <DroneMap />
      </LocationProvider>
    </>
  );
}

export default App;