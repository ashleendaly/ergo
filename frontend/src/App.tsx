import DroneMap from "./components/drone-map";
import Sidebar from './components/Sidebar';
import { LocationProvider } from "./context/clickedLatLong";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <LocationProvider>
        <Sidebar />
        <DroneMap />
      </LocationProvider>
    </>
  );
}

export default App;