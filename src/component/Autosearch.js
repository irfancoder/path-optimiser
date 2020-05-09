import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  padding: 12px 20px;
  height: 60px;
  margin: 8px 0;
  display: inline-block;
  background-color: #ffffff;
  border-radius: 5px;
  border-width: 0px;
  box-sizing: border-box;
  font-size: 16px;
  background-color: #f1f1f1;
`;

const SuggestionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Option = styled.div`
  width: 100%;
  display: flex;
  box-sizing: border-box;

  padding: 5px;
`;

const Autosearch = ({ placeholder, id, handleLocation }) => {
  const [display, setDisplay] = useState(false);
  const [input, setInput] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const wrapperRef = useRef(null);

  const H = window.H;
  const platform = new H.service.Platform({
    apikey: process.env.REACT_APP_HERE_API_KEY,
  });
  var service = platform.getSearchService();

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };
  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleSearch = (event) => {
    event.preventDefault();
    setDisplay(true);
    setInput(event.target.value);
    if (event.target.value.length > 0) {
      service.autosuggest(
        {
          // Search query
          q: event.target.value,
          // Center of the search context
          at: "4.4255,114.01",
        },
        (result) => {
          // Assumption: ui is instantiated
          // Create an InfoBubble at the returned location
          // ui.addBubble(new H.ui.InfoBubble(position, {
          //   content: title
          // }));

          setSuggestion(result.items);
        }
        //alert
      );
    }
  };

  const handleSelect = (value) => {
    setInput(value.title);
    handleLocation(id, value);
    setDisplay(false);
  };

  return (
    <div ref={wrapperRef}>
      <Input
        id={id}
        onClick={() => setDisplay(!display)}
        onChange={(event) => handleSearch(event)}
        value={input}
        placeholder={placeholder}
        type="text"
      />
      {display && (
        <SuggestionContainer>
          {suggestion.map((value, index) => {
            return (
              <Option onClick={() => handleSelect(value)} key={index}>
                <p>{value.title}</p>
              </Option>
            );
          })}
        </SuggestionContainer>
      )}
    </div>
  );
};

export default Autosearch;
