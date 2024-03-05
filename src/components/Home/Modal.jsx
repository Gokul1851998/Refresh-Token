import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { Button, Stack, Box, Zoom } from "@mui/material";
import { MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import AutoComplete from "../AutoComplete/AutoComplete";
import { getCity } from "../../api/apicall";

const buttonStyle = {
    textTransform: "none",
    color: `#fff`,
    backgroundColor: `#1976d2`,
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
  };

export default function Modal({
  isOpen,
  handleCloseModal,
}) {
  const [open, setOpen] = React.useState(false);
  const [warning, setWarning] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = useState(0)
  const [name, setName] = useState("")
  const [dob, setDob] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [pincode, setPincode] = useState("")
  const [join, setJoin] = useState("")
  const [department, setDepartment] = useState("")
  const [prev, setPrev] = useState("")
  const [current, setCurrent] = useState("")

  const modalStyle = {
    display: isOpen ? "block" : "none",
    zIndex: 9999,
  };

  const handleClear = () => {
    // Clear state variables
  };

  const handleAllClear = () => {
    handleCloseModal();
    handleClear();
  };

  const handleSave = () => {
    // Handle save logic
    handleAllClear();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenAlert = () => {
    setWarning(true);
  };

  const handleCloseAlert = () => {
    setWarning(false);
  };

  return (
    <div>
      <div
        className={`modal-backdrop fade ${isOpen ? "show" : ""}`}
        style={{
          display: isOpen ? "block" : "none",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      ></div>

      <Zoom in={isOpen} timeout={isOpen ? 400 : 300}>
        <div
          className={`modal ${isOpen ? "modal-open" : ""}`}
          style={modalStyle}
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
            <div className="modal-content">
              <form>
                <Stack
                  direction="row"
                  spacing={1}
                  padding={2}
                  justifyContent="flex-end"
                >
                  
                  <Button
        
                    variant="contained"
                    startIcon={<AddIcon />}
                    style={buttonStyle}
                  >
                    New
                  </Button>
                  <Button
          
                    variant="contained"
                    startIcon={<SaveIcon />}
                    style={buttonStyle}
                  >
                    Save
                  </Button>
                  <Button
                    onClick={handleAllClear}
                    variant="contained"
                    startIcon={<CloseIcon />}
                    style={buttonStyle}
                  >
                    Close
                  </Button>
                </Stack>
                <Box
                  sx={{
                    width: "auto",
                    marginTop: 1,
                    padding: 3,
                    zIndex: 1,
                    backgroundColor: "#ffff",
                    borderRadius: 2,
                  }}
                >
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <MDBInput
                        required
                        value={name}
                        id="form6Example1"
                        autoComplete="off"
                        maxLength={500}
                        label="Name"
                        onChange={(e)=>setName(e.target.value)}
                        labelStyle={{
                          fontSize: "15px",
                        }}
                      />
                    </MDBCol>
                    <MDBCol>
                    <MDBInput
                        required
                        value={dob}
                        id="form6Example3"
                        maxLength={500}
                        label="Date of birth"
                        onChange={(e)=>setDob(e.target.value)}
                        labelStyle={{
                          fontSize: "15px",
                        }}
                        autoComplete="off"
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-4">
                    <MDBCol>
                    <MDBInput
                        required
                        value={address}
                        id="form6Example3"
                        maxLength={500}
                        label="Address"
                        onChange={(e)=>setAddress(e.target.value)}
                        labelStyle={{
                          fontSize: "15px",
                        }}
                        autoComplete="off"
                      />
                    </MDBCol>
                    <MDBCol>
                     <AutoComplete value={city} apiName={getCity} onChangeName={setCity} />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <MDBInput
                        required
                      
                        id="form6Example3"
                        label="Employee Code"
                   
                        labelStyle={{
                          fontSize: "15px",
                        }}
                        autoComplete="off"
                      />
                    </MDBCol>
                    <MDBCol>
                      <MDBInput
                        required
                  
                        id="form6Example6"
                        type="date"
                        label="Target Date *"
                    
                        labelStyle={{
                          fontSize: "15px",
                        }}
                        autoComplete="off"
                      />
                    </MDBCol>
                  </MDBRow>

              
                </Box>
              </form>
            </div>
          </div>
        </div>
      </Zoom>
     

      <Loader open={open} handleClose={handleClose} />
      <ErrorMessage
        open={warning}
        handleClose={handleCloseAlert}
        message={message}
      />
    </div>
  );
}
