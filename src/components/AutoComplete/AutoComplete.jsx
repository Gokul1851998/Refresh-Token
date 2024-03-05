import { Autocomplete, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

export default function AutoComplete({
  value,
  apiName,
  onChangeName,
}) {
  const [suggestion, setSuggestion] = useState([]);

  const fetchTyping = async (typing) => {
    try {
      console.log(typing);
      const response = await apiName({ search: typing });
      if (response?.status === "Success") {
        const myObject = JSON.parse(response?.result);
        setSuggestion(myObject);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  const handleInputChange = async (event, newValue) => {
    await fetchTyping(newValue);
    onChangeName(newValue);
  };


  return (
    <>
     {suggestion.length > 0 ? (
      <Autocomplete
        id={`size-small-filled-assetType`}
        size="small"
        value={value || ""}
        onChange={handleInputChange}
        options={suggestion.map((data) => ({
          Name: data?.Name,
          Id: data?.Id,
        }))}
        filterOptions={(options, { inputValue }) => {
          return options.filter((option) =>
            option.Name.toLowerCase().includes(inputValue.toLowerCase())
          );
        }}
        autoHighlight
        getOptionLabel={(option) =>
          option && option.Name ? option.Name : ""
        }
        renderOption={(props, option) => (
          <li {...props}>
            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography
                style={{
                  marginRight: "auto",
                  fontSize: "12px",
                  fontWeight: "normal",
                }}
              >
                {option.Name}
              </Typography>
            </div>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            required
            label={`Project`}
            {...params}
            inputProps={{
              ...params.inputProps,
              autoComplete: "off", // disable autocomplete and autofill
              style: {
                borderWidth: "1px",
                borderColor: "#ddd",
                borderRadius: "10px",
                fontSize: "15px",
                height: "20px",
                paddingLeft: "6px",
              },
            }}
          />
        )}
        style={{ width: `auto` }}
      />
     ):null}
    </>
  );
}
