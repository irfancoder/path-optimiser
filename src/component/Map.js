// src/DisplayMapClass.js
import * as React from "react";
import { useState, useRef, useEffect } from "react";

const DisplayMapClass = ({ setMap, group, platform }) => {
  const mapRef = useRef();

  useEffect(() => {
    const H = window.H;

    const defaultLayers = platform.createDefaultLayers();

    const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 4.4255, lng: 114.01 },
      zoom: 12,
      pixelRatio: window.devicePixelRatio || 1,
    });

    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    // This variable is unused and is present for explanatory purposes
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components to allow the user to interact with them
    // This variable is unused
    const ui = H.ui.UI.createDefault(map, defaultLayers);
    setMap(map);

    map.addObject(group);
  }, []);

  return <div ref={mapRef} style={{ height: "500px" }} />;
};

export default DisplayMapClass;
