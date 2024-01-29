import React, {useEffect, useState} from 'react';
import { MapContainer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import ChinaProvinces from './ChinaProvinces';
import "leaflet-boundary-canvas";


const ChinaMap = () => {

  const position = [51.505, -0.09];
  const mapStyle = { height: "100vh" };

  
  return (
      <MapContainer
        center={position}
        zoom={4}
        style={mapStyle}
      >
        <ChinaProvinces/>
      </MapContainer>
    );
};

export default ChinaMap;
