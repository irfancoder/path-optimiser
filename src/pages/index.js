import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Layout from "../component/Layout";
import Map from "../component/Map";
import InputPanel from "../component/InputPanel";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1em;
`;
const H = window.H;
const platform = new H.service.Platform({
  apikey: process.env.REACT_APP_HERE_API_KEY,
});
let group = new H.map.Group();
let router = platform.getRoutingService(null, 8);

const Home = () => {
  const [location, setLocation] = useState({
    dest0: {},
    dest1: {},
    dest2: {},
    dest3: {},
  });
  const [order, setOrder] = useState([0]);
  const [loading, setLoading] = useState(false);

  var distance = [[], [], [], []];
  var route = [[], [], [], []];
  let copy;
  let counter = 0;

  let i = 0;
  let j = 0;
  const [map, setMap] = useState(null);

  /*Stores the searched location */
  const handleLocation = (id, value) => {
    setLocation({ ...location, [id]: value });
    console.log(value);
  };

  /* To show markers on the map */
  const handleSubmit = (e) => {
    e.preventDefault();
    group.removeAll();
    Object.keys(location).forEach((key) => {
      if (Object.keys(location[key]).length > 0) {
        let tempMarker = new H.map.Marker(location[key].position);
        group.addObject(tempMarker);
      }
    });
  };

  /* Routing parameters*/
  const pathingRequest = (orig, dest) => {
    return {
      routingMode: "fast",
      transportMode: "car",
      // The start point of the route:
      origin: `${orig.position.lat},${orig.position.lng}`,
      // The end point of the route:
      destination: `${dest.position.lat},${dest.position.lng}`,
      // Include the route shape in the response
      return: ["polyline", "summary"],
    };
  };

  const findRoute = (from, to) => {
    router.calculateRoute(pathingRequest(from, to), onResult, function (error) {
      alert(error.message);
    });
  };

  // Define a callback function to process the routing response:
  let onResult = async (result) => {
    // ensure that at least one route was found

    if (result.routes.length) {
      let response = result.routes[0].sections[0];

      let calcDistance = response.summary.length;

      /* Draw the route */
      let linestring = H.geo.LineString.fromFlexiblePolyline(response.polyline);
      let routeLine = new H.map.Polyline(linestring, {
        style: { strokeColor: "blue", lineWidth: 3 },
      });

      /* Draw the markers */
      let startMarker = new H.map.Marker(response.departure.place.location);
      let endMarker = new H.map.Marker(response.arrival.place.location);
      /* Uncomment below to add to map */
      group.addObjects([routeLine, startMarker, endMarker]);

      distance[i][j] = calcDistance;
      route[i][j] = [routeLine, startMarker, endMarker];

      if (j >= 3) {
        i++;
        j = 0;
      } else {
        j++;
      }
      counter++;

      if (counter === 16) {
        copy = JSON.parse(JSON.stringify(distance));
        pickShortestDistance(distance[0]);
      }
    }
  };

  const getAllDistances = () => {
    Object.keys(location).forEach((element, key) => {
      Object.keys(location).forEach((insideEle, insideKey) => {
        delayed(
          1000,
          (function (key, insideKey) {
            return function () {
              findRoute(location[element], location[insideEle]);
            };
          })(key, insideKey)
        );
      });
    });
  };

  var delayed = (function () {
    var queue = [];

    function processQueue() {
      if (queue.length > 0) {
        setTimeout(function () {
          queue.shift().cb();
          processQueue();
        }, queue[0].delay);
      }
    }

    return function delayed(delay, cb) {
      queue.push({ delay: delay, cb: cb });

      if (queue.length === 1) {
        processQueue();
      }
    };
  })();

  const pickShortestDistance = (dist) => {
    let minNumber = 50000; // extreme large number for comparison
    let minIndex = 50000; // extreme large number for comparison

    let sum = dist.reduce((a, b) => {
      return a + b;
    }, 0);

    if (sum > 0) {
      dist.forEach((km, i) => {
        if (km !== 0) {
          if (km < minNumber) {
            minNumber = km;
            minIndex = i;
          }
        }
      });
      console.log(minNumber, minIndex);

      copy.forEach((arg, i) => {
        copy[i][0] = 0;
        copy[i][minIndex] = 0;
      });

      setOrder((order) => [...order, minIndex]);
      pickShortestDistance(copy[minIndex]);
    } else {
      console.log("end");
      console.log(distance);
      showRoutes();
    }
  };

  const showRoutes = () => {
    setLoading(false);
    group.removeAll();
    order.forEach((num, i) => {
      group.addObjects(route[i][num]);
    });
  };

  const handleDisplayPath = () => {
    getAllDistances();
    setOrder(() => []);
    group.removeAll();

    setLoading(true);
  };

  return (
    <Layout>
      <Grid>
        <Map setMap={setMap} group={group} platform={platform} />
        <InputPanel
          handleLocation={handleLocation}
          handleSubmit={handleSubmit}
          handleDisplayPath={handleDisplayPath}
          loading={loading}
          location={location}
          order={order}
        />
      </Grid>
    </Layout>
  );
};

export default Home;
