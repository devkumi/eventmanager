import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { baseUrl, events } from "../global/variables";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardHeader,
  Collapse,
  Container,
  Divider,
  Grid,
  Modal,
  Tooltip,
} from "@mui/material";
import { DeleteOutline, Edit } from "@mui/icons-material";
import MUIDataTable from "mui-datatables";
import { useFormik } from "formik";
import * as Yup from "yup";
import { reactLocalStorage } from "reactjs-localstorage";
import { CardContent } from "@mui/material";
import { TextField } from "@mui/material";
import { Textarea } from "@mui/joy";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const Home = () => {
 
  
  const navigate = useNavigate();
  const [modalexpanded, setModalExpanded] = useState(false);
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const clearErrorsAfterTimeout = () => {
    setTimeout(() => {
      setAlert({
        alertMsg: "",
        alertStatus: false,
        alertType: "",
      });
      setErrors({
        fname: "",
        lname: "",
        email: "",
        phonenumber: "",
        role: "",
      });
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  const [isAlert, setAlert] = useState({
    alertMsg: "",
    alertStatus: false,
    alertType: "success",
  });

  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    phonenumber: "",
    role: "",
  });

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phonenumber: "",
    role: "",
  });

  

  useEffect(() => {

    axios
      .get(baseUrl + "/events")
      .then(function (response) {
        console.log(response.data);
        if (response.data.statusCode === 200) {
          setData(response.data.response);
        } else {
          setData([]);
        }
      })
      .catch(function (error) {
        // console.log(error);
      });
  
    // console.log(responsea);
    return () => {
      setData([])
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      eventName: "",
      description: "",
      location: "",
      submit: null,
    },
    validationSchema: Yup.object({
      eventName: Yup.string().max(255).required("Event Name is required"),
      description: Yup.string().max(255).required("Event description is required"),
      location: Yup.string().max(255).required("Event location is required"),
      // role: Yup.string().required("Role is required"),
    }),
    onSubmit: async (values, helpers) => {
      // console.log(values.email)
      setIsLoading(true);
      const userId = reactLocalStorage.get("userId");
      const authenticated = reactLocalStorage.get("authenticated");



      try {
        // if (formData.role === "") {
        //   // setOpen(false);
        //   setAlert({
        //     alertMsg: "Admin Role is Required",
        //     alertStatus: true,
        //     alertType: "error",
        //   });
        //   clearErrorsAfterTimeout();
        //   setIsLoading(false);
        //   // throw new Error('Please check your email and password');
        // }

        const response = [];

        const responsea = axios({
          method: "post",
          url: baseUrl + "/login",
          data: {
            email: values.email,
            password: values.password,
          },
          config: {
            headers: { "Content-Type": "multipart/form-data" },
          },
        })
        
          .then(function (response) {
            console.log(response);

            reactLocalStorage.set("login", true);
            const login = reactLocalStorage.get("login");
            console.log(response.data.response);
            if (response.data.statusCode === 200) {
              
              // navigate('/');
            } else {
            }

            return response;
          })
          .catch(function (error) {
            // console.log(error.response.data.message);
            // setStatus({ success: false });
            // setErrors({ submit: error.response.data.message });
            // setSubmitting(false);
            // console.log(error);
          });

      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  const [modalKey, setModalKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubLoading, setSubIsLoading] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [userData, setUserData] = useState([]);

  const optionsevents = {
    filterType: "checkbox",
    onRowSelectionChange: (rowsSelected, allRows) => {
      // console.log(consumerdetails.data.ConsumerName);
      if (allRows.length === 1) {
        // setUseremail(consumerdetails.data.ConsumerName[allRows[0].dataIndex]);
        // setUserData(consumerdetails.data.ConsumerName[allRows[0].dataIndex]);
        // console.log(rowsSelected, allRows.length ? consumerdetails.data.ConsumerName[allRows[0].dataIndex] : allRows.length);
      } else {
        setOpen(false);
      }
    },
    customToolbarSelect: (selectedRows) => {
      // console.log(displayData[selectedRows.data[0].index])

      if (selectedRows.data.length === 1) {
        // setOpen(true);
        // console.log(openDel);

        return (
          <div>
            <Tooltip
              sx={{ margin: "10px" }}
              title={"Edit"}
              cursor="pointer"
              className="mr-6"
            >
              <Edit
                onClick={() => {
                  setModalKey("consumerName");
                  // setOpen(true);
                }}
                color="success"
              />
            </Tooltip>
            <Tooltip
              sx={{ margin: "10px", marginRight: "20px" }}
              title={"Delete"}
              cursor="pointer"
              className="mr-6"
            >
              <DeleteOutline
                onClick={() => {
                  setOpenDel(true);
                }}
                color="error"
              />
            </Tooltip>
          </div>
        );
      }
    },
    onRowsDelete: (rowsDeleted) => {
      console.log(rowsDeleted, "were deleted!");
    },
    onChangePage: (numberRows) => {
      console.log(numberRows);
    },
    onSearchChange: (searchText) => {
      console.log(searchText);
    },
    onColumnSortChange: (column, direction) => {
      console.log(column, direction);
    },
    onColumnViewChange: (column, action) => {
      console.log(column, action);
    },
    onFilterChange: (column, filters) => {
      console.log(column, filters);
    },
    onCellClick: (cellIndex, rowIndex) => {
      console.log(cellIndex, rowIndex);
    },
  };



  return (
    <>
      <Box>
        <title>Home | Event App</title>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        ></Box>
        <Container maxWidth="xl">
          <Grid container spacing={1}>
            <Grid xs={12} md={12} lg={12}>
              <div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Grid xs={12} md={12} lg={12}>
                      <Box sx={{ width: "100%" }}>
                        <Collapse in={isAlert.alertStatus}>
                          <Alert
                            severity={isAlert.alertType}
                            onClose={() => {
                              setAlert({
                                alertStatus: false,
                              });
                            }}
                            sx={{ mb: 2 }}
                          >
                            {isAlert.alertMsg}
                          </Alert>
                        </Collapse>
                      </Box>
                    </Grid>
                    <Grid xs={12} md={12} lg={12}>
                      {/* eventName, date, location, description, user_id  */}
                      <CardActions>
                        <form noValidate onSubmit={formik.handleSubmit}>
                          <Card>
                            <CardHeader subheader="" title="Add Events" />
                            <CardContent sx={{ pt: 0 }}>
                              <Box sx={{ m: -1.5 }}>
                                <Grid container spacing={0}>
                                  <Grid
                                    sx={{ marginBottom: 3 }}
                                    xs={12}
                                    md={12}
                                  >
                                    <TextField
                                      size="small"
                                      error={
                                        !!(
                                          formik.touched.eventName &&
                                          formik.errors.eventName
                                        )
                                      }
                                      fullWidth
                                      helpertext={
                                        formik.touched.eventName &&
                                        formik.errors.eventName
                                      }
                                      label="Event Name"
                                      name="eventName"
                                      onBlur={formik.handleBlur}
                                      onChange={formik.handleChange}
                                      type="text"
                                      autoComplete={"off"}
                                    />
                                  </Grid>
                                  <Grid
                                    sx={{ marginBottom: 3 }}
                                    xs={12}
                                    md={12}
                                  >
                                    <Textarea
                                      placeholder="Event Description..."
                                      required
                                      sx={{ mb: 1 }}
                                      error={
                                        !!(
                                          formik.touched.description &&
                                          formik.errors.description
                                        )
                                      }
                                      fullWidth
                                      helpertext={
                                        formik.touched.description &&
                                        formik.errors.description
                                      }
                                      label="Description"
                                      name="description"
                                      onBlur={formik.handleBlur}
                                      onChange={formik.handleChange}
                                      // type="text"
                                      autoComplete={"off"}
                                    />
                                  </Grid>
                                  <Grid
                                    sx={{ marginBottom: 3 }}
                                    xs={12}
                                    md={12}
                                  >
                                    <TextField
                                      size="small"
                                      error={
                                        !!(
                                          formik.touched.location &&
                                          formik.errors.location
                                        )
                                      }
                                      fullWidth
                                      helpertext={
                                        formik.touched.location &&
                                        formik.errors.location
                                      }
                                      label="Location"
                                      name="location"
                                      onBlur={formik.handleBlur}
                                      onChange={formik.handleChange}
                                      type="text"
                                      autoComplete={"off"}
                                    />
                                  </Grid>
                                </Grid>
                              </Box>
                            </CardContent>
                            <Divider />
                            <CardActions sx={{ justifyContent: "flex-end" }}>
                              <Button
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                type="submit"
                                variant="contained"
                                disabled={isLoading}
                              >
                                {isLoading ? "Loading..." : "Add event"}
                              </Button>
                            </CardActions>
                          </Card>
                        </form>
                      </CardActions>
                    </Grid>
                  </Box>
                </Modal>
              </div>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <Grid xs={2} sm={2} lg={2}>
                  <CardActions>
                    <Button
                      color="primary"
                      onClick={handleOpen}
                      variant="contained"
                    >
                      Add Event
                    </Button>
                  </CardActions>
                </Grid>
              </CardActions>
              <MUIDataTable
                title={"Events"}
                data={data}
                columns={events}
                options={optionsevents}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
