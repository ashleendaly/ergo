import DroneMap from "./components/drone-map";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/sidebar'

function App() {
  return (
    <>
      <DroneMap />
    <Sidebar />
    </>
  );
}

export default App;