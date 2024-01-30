import React, { useRef, useState, useEffect } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import chinaProvinces from '../data/chinaProvincesL2GeoData.json';

const ChinaProvinces = () => {
  const geoJsonRef = useRef();
  const map = useMap();
  if (map) {
    const osm = new L.TileLayer.boundaryCanvas(
      "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
      {
        boundary: chinaProvinces,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }
    );
    map.addLayer(osm);
    const provincesLayer = L.geoJSON(chinaProvinces);
    map.fitBounds(provincesLayer.getBounds());
  }


  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
      fillColor: 'darkRed', 
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 1
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  }

  function resetHighlight(e) {
    geoJsonRef.current.resetStyle(e.target);
  }

  function zoomToFeature(e) {
    const layer = e.target;
    map.fitBounds(layer.getBounds());
    
    geoJsonRef.current.setStyle({fillColor: 'darkRed', 
    weight: 2,
    opacity: 1,
    color: 'white',
    fillOpacity: 1});

    layer.setSyle( {
      fillColor: 'white', 
      weight: 10,
      opacity: 1,
      color: 'black',
      fillOpacity: 0
    });
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature,
    });
  }

  function mapStyle(feature) {
    return {
      fillColor: 'darkRed', 
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.4
    };
  }

  return (
    <GeoJSON ref={geoJsonRef} data={chinaProvinces} style={mapStyle} onEachFeature={onEachFeature} />
  );
};

export default ChinaProvinces;
