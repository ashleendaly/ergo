import React from "react";
import DroneMap from "../components/drone-map";
import Sidebar from '../components/Sidebar';
import { LocationProvider } from "../context/clickedLatLong";
import Header from "../components/Header";

const Launch = () => {
  return (
    <>
        <LocationProvider>
        <Sidebar />
        <DroneMap />
        </LocationProvider>
    </>
  );
};

export default Launch;
