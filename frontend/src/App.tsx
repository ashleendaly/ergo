import DroneMap from "./components/drone-map";
import Loader from "./components/Loader";
import Sidebar from './components/Sidebar';
import { LocationProvider } from "./context/clickedLatLong";
import Header from "./components/Header";
import Footer from "./components/Footer";

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