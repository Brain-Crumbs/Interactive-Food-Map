import React, { useRef, useEffect } from 'react';
import { GeoJSON, TileLayer, useMap  } from 'react-leaflet';
import L from 'leaflet'
import { useLeafletContext } from '@react-leaflet/core'
import 'leaflet/dist/leaflet.css';
import chinaProvinces from '../data/chinaProvincesL2GeoData.json';

function highlightFeature(e) {
  var layer = e.target;

  layer.setStyle({
    weight: 1,
    color: 'black',
    dashArray: '',
    fillOpacity: 0.7
  });

  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}

const ChinaProvinces = () => {
  const geoJsonRef = useRef();
  const map = useMap();
  if (map) {

    const osm = new L.TileLayer.boundaryCanvas(
      "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
      {
        boundary: chinaProvinces,
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, UK shape <a href="https://github.com/johan/world.geo.json">johan/word.geo.json</a>'
      }
    );
    map.addLayer(osm);
    const ukLayer = L.geoJSON(chinaProvinces);
    map.fitBounds(ukLayer.getBounds());

    // // Define the coordinates for the large rectangle covering the entire globe
    // const outerBounds = [[90, -180], [90, 180], [-90, 180], [-90, -180]];

    // // Assuming chinaProvinces is your GeoJSON data
    
    const chinaProvincesLatLong = L.geoJson(chinaProvinces).getLayers().map(layer => layer.getLatLngs());

    // // Create the inverted polygon using the outer bounds and the GeoJSON-defined areas as holes
    // const invertedPolygon = L.polygon([outerBounds, ...chinaProvincesLatLong], {
    //   color: "#000", // Match the map's background color
    //   fillColor: "#000",
    //   fillOpacity: 0.7,
    //   weight: 0
    // }).addTo(map);
    map.setMaxBounds(chinaProvincesLatLong);
    map.setMinZoom(4);
    map.setMaxZoom(8);
  }

  function resetHighlight(e) {
    const layer = e.target;
    geoJsonRef.current.resetStyle(layer);
  }

  function zoomToFeature(e) {
    const layer = e.target;
    map.fitBounds(layer.getBounds());
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
      fillColor: 'darkred',
      weight: 2,
      opacity: 1,
      color: 'black',
      fillOpacity: 0.2
    };
  }

  return (
    <div>
      
      {chinaProvinces && <GeoJSON ref={geoJsonRef} data={chinaProvinces} style={mapStyle} onEachFeature={onEachFeature} />}
    </div>
  );
};

export default ChinaProvinces;
