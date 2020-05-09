import React, { useState } from "react";
import styled from "styled-components";
import Autosearch from "./Autosearch";

const Submit = styled.input`
  width: 100%;
  height: 30px;
  background-color: #ccc;
`;
const GetPath = styled.button`
  margin-top: 1em;
  width: 100%;
  height: 30px;
  background-color: #ccc;
`;

const InputPanel = ({
  handleLocation,
  handleSubmit,
  handleDisplayPath,
  loading,
  location,
  order,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Autosearch
          placeholder="Type Home address"
          handleLocation={handleLocation}
          id="dest0"
        />
        <Autosearch
          placeholder="Destination address #1"
          id="dest1"
          handleLocation={handleLocation}
        />
        <Autosearch
          placeholder="Destination address #2"
          id="dest2"
          handleLocation={handleLocation}
        />
        <Autosearch
          placeholder="Destination address #3"
          id="dest3"
          handleLocation={handleLocation}
        />
        <Submit type="submit" value="Show in Map"></Submit>
      </form>
      <GetPath onClick={handleDisplayPath}>
        {loading ? "Calculating..." : "Optimise Path"}
      </GetPath>

      <div>
        <h4>Optimised Path: </h4>
        {order.map((index, i) => {
          return (
            <p key={i}>
              {i + 1}: {location[`dest${index}`].title}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default InputPanel;

/**
 * Input panel takes in the following parameters
 * - Home point
 * - Destination(s)
 *
 * Task 1: Create the UI for input of home point & destination
 * Task 2: Implement geocoding to locate the home point & destinations on a map
 * Task 3: Place markers on the identified locations
 * Task 4: Find the path from each locations to one another
 * Task 5: Create the optimisation algorithm that produce the optimal path for a round trip
 *
 * END
 *
 */
