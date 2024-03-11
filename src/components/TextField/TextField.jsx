import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Box, Paper, TextField, Button } from "@mui/material";
import { getFields } from "../../api/apicall";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";

export default function TextFields() {
  const [formFields, setFormFields] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await getFields({ master: "Customer" });
    if (response.status === "Success") {
      const myObject = JSON.parse(response.result);
      console.log(myObject);
      setFormFields(myObject);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // You can access form data from the state (formFields)
    console.log("Form submitted!");
  };

  return (
    <>
      <MDBCard
        className="text-center"
        style={{ boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", zIndex: 1, }}
      >
        <MDBCardBody>
          <form onSubmit={handleSubmit}>
            <MDBRow className="g-2">
              {formFields.map((field) => (
                <MDBCol key={field.iFieldId} lg="3" md="4" sm="6" xs="12">
                  <div className="mb-3">
                    <MDBInput
                      required={field.bIsMandatory}
                      readOnly={!field.bIsDisplayed}
                      id={`form${field.iFieldId}Example`}
                      type={
                        field.sDatatype === "int" ||
                        field.sDatatype === "double"
                          ? "number"
                          : "text"
                      }
                      maxLength={field.iMaxLength}
                      size="small"
                      name={field.sFieldName}
                      autoComplete="off"
                      label={field.sFieldCaption}
                      labelStyle={{
                        fontSize: "15px",
                      }}
                    />
                  </div>
                </MDBCol>
              ))}
            </MDBRow>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </form>
        </MDBCardBody>
      </MDBCard>
    </>
  );
}
