import DroneMap from "./components/drone-map";
import Loader from "./components/Loader";
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