import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { Button, Stack, Box, Zoom } from "@mui/material";
import { MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import AutoComplete from "../AutoComplete/AutoComplete";
import {
  getCity,
  getCountry,
  getDepartment,
  getEmployeeDetails,
  postEmployee,
} from "../../api/apicall";
import Swal from "sweetalert2";

const buttonStyle = {
  textTransform: "none",
  color: `#fff`,
  backgroundColor: `#1976d2`,
  boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
};

export default function Modal({ isOpen, handleCloseModal, edit,action }) {
  const [open, setOpen] = React.useState(false);
  const [warning, setWarning] = useState(false);
  const [message, setMessage] = useState("");
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [pincode, setPincode] = useState("");
  const [join, setJoin] = useState("");
  const [department, setDepartment] = useState("");
  const [prev, setPrev] = useState("");
  const [current, setCurrent] = useState("");

  const modalStyle = {
    display: isOpen ? "block" : "none",
  };

  const handleClear = () => {
    setId(0);
    setName("");
    setDob("");
    setAddress("");
    setCity("");
    setCountry("");
    setDepartment("");
    setPincode("");
    setJoin("");
    setPrev("");
    setCurrent("");
  };

  const fetchData = async () => {
    if (edit !== 0) {
      const response = await getEmployeeDetails({ id: edit });
      if (response.status === "Success") {
        const myObject = JSON.parse(response.result);
        setId(myObject[0].iId);
        setName(myObject[0].sName);
        setDob(formatDate(myObject[0].dDob));
        setAddress(myObject[0].sAddress);
        setCity({ Name: myObject[0].City, Id: myObject[0].iCityId });
        setCountry({ Name: myObject[0].Country, Id: myObject[0].iCountryId });
        setDepartment({
          Name: myObject[0].Department,
          id: myObject[0].iDepartmentId,
        });
        setPincode(`${myObject[0].iPinCode}`);
        setJoin(formatDate(myObject[0].dDateofJoining));
        setPrev(`${myObject[0].nPreviousSalary}`);
        setCurrent(`${myObject[0].nCurrentSalary}`);
      }
    } else {
      handleClear();
    }
  };

  useEffect(() => {
    fetchData();
  }, [edit]);

  const handleAllClear = () => {
    handleCloseModal();
    handleClear();
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  const handleSave = async () => {
    const data = {
      id,
      name,
      dob,
      address,
      cityId: city?.Id,
      countryId: country?.Id,
      pinCode: pincode,
      dateofJoining: join,
      departmentId: department?.Id,
      previousSalary: Number(prev),
      currentSalary: Number(current),
    };
 
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Save this!",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.value) {
        handleOpen();
        const response = await postEmployee(data);
        handleClose();
        if (response?.status === "Success") {
          Swal.fire({
            title: "Saved",
            text: "Your file has been Saved!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            handleAllClear();
            action()
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            confirmButtonColor: "#3085d6",
          });
        }
      }
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
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
                    onClick={handleSave}
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
                        onChange={(e) => setName(e.target.value)}
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
                        type="date"
                        maxLength={500}
                        label="Date of birth"
                        onChange={(e) => setDob(e.target.value)}
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
                        onChange={(e) => setAddress(e.target.value)}
                        labelStyle={{
                          fontSize: "15px",
                        }}
                        autoComplete="off"
                      />
                    </MDBCol>
                    <MDBCol>
                      <AutoComplete
                        value={city}
                        apiName={getCity}
                        setValue={setCity}
                        field="City"
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <AutoComplete
                        value={country}
                        apiName={getCountry}
                        setValue={setCountry}
                        field="Country"
                      />
                    </MDBCol>
                    <MDBCol>
                      <AutoComplete
                        value={department}
                        apiName={getDepartment}
                        setValue={setDepartment}
                        field="Department"
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="mb-4">
                    <MDBCol>
                      <MDBInput
                        required
                        value={join}
                        id="form6Example3"
                        type="date"
                        maxLength={500}
                        label="Date of Join"
                        onChange={(e) => setJoin(e.target.value)}
                        labelStyle={{
                          fontSize: "15px",
                        }}
                        autoComplete="off"
                      />
                    </MDBCol>
                    <MDBCol>
                      <MDBInput
                        required
                        value={prev}
                        id="form6Example3"
                        type="number"
                        maxLength={500}
                        label="Previous Salary"
                        onChange={(e) => setPrev(e.target.value)}
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
                        value={current}
                        id="form6Example3"
                        type="number"
                        maxLength={500}
                        label="Current Salary"
                        onChange={(e) => setCurrent(e.target.value)}
                        labelStyle={{
                          fontSize: "15px",
                        }}
                        autoComplete="off"
                      />
                    </MDBCol>
                    <MDBCol>
                      <MDBInput
                        required
                        value={pincode}
                        id="form6Example3"
                        type="number"
                        maxLength={500}
                        label="Pincode"
                        onChange={(e) => setPincode(e.target.value)}
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
