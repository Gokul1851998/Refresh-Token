import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import { getLogin, getLoginCompany } from "../../api/apicall";
import { Autocomplete } from "@mui/material";

const idleTime = 10 * 60 * 1000;

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const [sLoginName, setLoginName] = React.useState();
  const [sPassword, setSPassword] = React.useState();
  const [email, setEmail] = React.useState(false);
  const [password, setPassword] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState();
  const [loader, setLoader] = useState(false);
  const [suggestionCompany, setSuggestionCompany] = useState([]);
  const [company, setCompany] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await getLoginCompany();
      if (response.statusCode === 200) {
        const myObject = JSON.parse(response.result);
        setSuggestionCompany(myObject);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!sLoginName) {
      setEmail(true);
    } else {
      setEmail(false);
    }

    if (!sPassword) {
      setPassword(true);
    } else {
      setPassword(false);
    }
    toString;
    if (sPassword && sLoginName) {
      handleLoaderOpen();
      const response = await getLogin({
        username: sLoginName,
        password: sPassword,
        database: `${company?.Id}`,
      });
      if (response?.tokens) {
        localStorage.setItem("accessToken", response?.tokens?.accessToken);
        localStorage.setItem("refreshToken", response?.tokens?.refreshToken);
        navigate("/home")
      }
      handleLoaderClose();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const handleLoaderClose = () => {
    setLoader(false);
  };

  const handleLoaderOpen = () => {
    setLoader(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        sx={{ backgroundColor: "#053fc7" }}
        container
        component="main"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          borderRadius={2}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              LOGIN
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                error={email}
                onChange={(e) => setLoginName(e.target.value)}
                margin="normal"
                required
                fullWidth
                id="email"
                label="UserName"
                autoComplete="email"
                helperText=""
                autoFocus
              />
              <TextField
                error={password}
                onChange={(e) => setSPassword(e.target.value)}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onKeyDown={handleKeyPress}
              />

              <Autocomplete
                id={`size-small-filled-assetType`}
                size="small"
                value={company}
                onChange={(event, newValue) => {
                  setCompany(newValue);
                }}
                options={suggestionCompany.map((data) => ({
                  Company: data.Company,
                  Id: data?.Id,
                }))}
                filterOptions={(options, { inputValue }) => {
                  return options.filter((option) =>
                    option.Company.toLowerCase().includes(
                      inputValue.toLowerCase()
                    )
                  );
                }}
                autoHighlight
                getOptionLabel={(option) =>
                  option && option.Company ? option.Company : ""
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
                        {option.Company}
                      </Typography>
                    </div>
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    margin="normal"
                    required
                    label="Company"
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "off",
                      style: {
                        borderWidth: "1px",
                        borderColor: "#ddd",
                        borderRadius: "10px",
                        fontSize: "15px",
                        height: "35px",
                        paddingLeft: "6px",
                        paddingTop: "6px",
                      },
                    }}
                  />
                )}
                style={{ width: `auto` }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                LOGIN
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Loader open={loader} handleClose={handleLoaderClose} />
      <ErrorMessage open={open} handleClose={handleClose} message={message} />
    </ThemeProvider>
  );
}
