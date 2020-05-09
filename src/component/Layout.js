import React from "react";
import styled from "styled-components";
import dimensions from "../styles/dimensions";

const Body = styled.div`
  max-width: ${dimensions.maxwidthDesktop}px;
  margin: 0 auto;
  margin-top: 2em;
`;

const Layout = ({ children }) => {
  return <Body>{children}</Body>;
};

export default Layout;
