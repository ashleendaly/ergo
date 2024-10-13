import DroneMap from "./components/drone-map";
import Loader from "./components/Loader";
import Sidebar from './components/Sidebar';
import { LocationProvider } from "./context/clickedLatLong";
import Header from "./components/Header";
import Footer from "./components/Footer";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages";
import About from "./pages/about";
import Launch from "./pages/launch";

function App() {
  // return (
  //   <>
  //     <Header />
  //     <LocationProvider>
  //       <Sidebar />
  //       <DroneMap />
  //     </LocationProvider>
  //   </>
  // );

  return (
    <Router>
        <Header />
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/launch" element={<Launch />} />
        </Routes>
        {/* <Footer /> */}
    </Router>
  );
}

export default App;