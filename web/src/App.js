import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Vehicle from './pages/Vehicle';
import Carsitter from './pages/Carsitter';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicle" element={<Vehicle />} />
          <Route path="/carsitter" element={<Carsitter />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
