import { Autocomplete, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function AutoComplete({ value, apiName, setValue, field }) {
  const [suggestion, setSuggestion] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    const response = await apiName();
    if (response?.status === "Success") {
      const myObject = JSON.parse(response?.result);
      setSuggestion(myObject);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Autocomplete
        id={`size-small-filled-assetType`}
        size="small"
        value={value || null}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setSearch(newInputValue);
        }}
        options={suggestion.map((data) => ({
          Name: data?.sName,
          Id: data?.iId,
        }))}
        filterOptions={(options, { inputValue }) => {
          return options.filter((option) =>
            option && option.Name && option.Name.toLowerCase().includes(inputValue.toLowerCase())
          );
        }}
        autoHighlight
        getOptionLabel={(option) => (option && option.Name ? option.Name : "")}
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
            label={field}
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
        style={{ width: `auto`, zIndex: 1000 }}
      />
    </>
  );
}
