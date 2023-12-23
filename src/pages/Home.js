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
  FormHelperText,
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
import { Form, Formik } from "formik/dist";

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
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

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
      setData([]);
    };
  }, []);

  // const formik = useFormik({
  //   initialValues: {
  //     eventName: "",
  //     description: "",
  //     location: "",
  //     submit: null,
  //   },
  //   validationSchema: Yup.object({
  //     eventName: Yup.string().max(255).required("Event Name is required"),
  //     description: Yup.string()
  //       .max(255)
  //       .required("Event description is required"),
  //     location: Yup.string().max(255).required("Event location is required"),
  //     // role: Yup.string().required("Role is required"),
  //   }),
  //   onSubmit: async (values, helpers) => {
  //     // console.log(values.email)
  //     setIsLoading(true);
  //     const userId = reactLocalStorage.get("userId");
  //     const authenticated = reactLocalStorage.get("authenticated");

  //     try {
  //       // if (formData.role === "") {
  //       //   // setOpen(false);
  //       //   setAlert({
  //       //     alertMsg: "Admin Role is Required",
  //       //     alertStatus: true,
  //       //     alertType: "error",
  //       //   });
  //       //   clearErrorsAfterTimeout();
  //       //   setIsLoading(false);
  //       //   // throw new Error('Please check your email and password');
  //       // }

  //       const response = [];

  //       const responsea = axios({
  //         method: "post",
  //         url: baseUrl + "/events",
  //         data: {
  //           eventName: values.eventName,
  //           location: values.location,
  //           description: values.description,
  //           user_id: userId,
  //         },
  //         config: {
  //           headers: { "Content-Type": "multipart/form-data" },
  //         },
  //       })
  //         .then(function (response) {
  //           console.log(response);

  //           console.log(response.data.statusCode);
  //           if (response.data.statusCode === 200) {
  //             window.location.reload();
  //             // navigate("/");
  //             setIsLoading(false);
  //           } else {
  //           }

  //           return response;
  //         })
  //         .catch(function (error) {
  //           // console.log(error.response.data.message);
  //           // setStatus({ success: false });
  //           // setErrors({ submit: error.response.data.message });
  //           // setSubmitting(false);
  //           setIsLoading(false);
  //           // console.log(error);
  //         });

  //       // const response = await auth.signIn(values.email, "values.password");
  //       console.log(responsea);
  //       // if (responsea.data.statusCode === 200) {
  //       //   // router.reload();
  //       // } else {
  //       //   setAlert({
  //       //     alertMsg: responsea.data.message,
  //       //     alertStatus: true,
  //       //     alertType: "error",
  //       //   });
  //       //   clearErrorsAfterTimeout();
  //       //   setIsLoading(false);
  //       // }
  //       // router.push("/auth/otp");
  //     } catch (err) {
  //       helpers.setStatus({ success: false });
  //       helpers.setErrors({ submit: err.message });
  //       helpers.setSubmitting(false);
  //     }
  //   },
  // });

  const [modalKey, setModalKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubLoading, setSubIsLoading] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [userData, setUserData] = useState([]);

  const optionsevents = {
    filterType: "checkbox",
    onRowSelectionChange: (rowsSelected, allRows) => {
      // console.log(data);
      if (allRows.length === 1) {
        console.log(data);
        // setUseremail(data[allRows[0].dataIndex]);
        setUserData(data[allRows[0].dataIndex]);
        console.log(
          rowsSelected,
          allRows.length ? data[allRows[0].dataIndex] : allRows.length
        );
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
                  setOpenEdit(true);
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
                  const responsea = axios({
                    method: "delete",
                    url: baseUrl + "/events/" + userData._id,
                   
                    config: {
                      headers: { "Content-Type": "multipart/form-data" },
                    },
                  })
                    .then(function (response) {
                      console.log(response);
          
                      console.log(response.data.statusCode);
                      window.location.reload();
                      if (response.data.statusCode === 200) {
                        window.location.reload();
                        // navigate("/");
                        setIsLoading(false);
                      } else {
                      }
          
                      return response;
                    })
                    .catch(function (error) {
                      // console.log(error.response.data.message);
                      // setStatus({ success: false });
                      // setErrors({ submit: error.response.data.message });
                      // setSubmitting(false);
                      window.location.reload();
                      setIsLoading(false);
                      // console.log(error);
                    });
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
                        <Formik
                          initialValues={{
                            eventName: "",
                            description: "",
                            location: "",
                            submit: null,

                            // othername: '',
                            // submit: null
                          }}
                          validationSchema={Yup.object().shape({
                            //   // title: Yup.string().max(255).required('Title is required'),
                            eventName: Yup.string()
                              .max(255)
                              .required("Eventtt Name is required"),
                            description: Yup.string()
                              .max(255)
                              .required("Event description is required"),
                            location: Yup.string()
                              .max(255)
                              .required("Event location is required"),
                            // role: Yup.string().required("Role is required"),
                          })}
                          onSubmit={async (values) => {
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
          url: baseUrl + "/events",
          data: {
            eventName: values.eventName,
            location: values.location,
            description: values.description,
            user_id: userId,
          },
          config: {
            headers: { "Content-Type": "multipart/form-data" },
          },
        })
          .then(function (response) {
            console.log(response);

            console.log(response.data.statusCode);
            if (response.data.statusCode === 200) {
              window.location.reload();
              // navigate("/");
              setIsLoading(false);
            } else {
            }

            return response;
          })
          .catch(function (error) {
            // console.log(error.response.data.message);
            // setStatus({ success: false });
            // setErrors({ submit: error.response.data.message });
            // setSubmitting(false);
            setIsLoading(false);
            // console.log(error);
          });

        // const response = await auth.signIn(values.email, "values.password");
        console.log(responsea);
        // if (responsea.data.statusCode === 200) {
        //   // router.reload();
        // } else {
        //   setAlert({
        //     alertMsg: responsea.data.message,
        //     alertStatus: true,
        //     alertType: "error",
        //   });
        //   clearErrorsAfterTimeout();
        //   setIsLoading(false);
        // }
        // router.push("/auth/otp");
      } catch (err) {
        // helpers.setStatus({ success: false });
        // helpers.setErrors({ submit: err.message });
        // helpers.setSubmitting(false);
      }
                          }}
                        >
                          {({
                            errors,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting,
                            touched,
                            values,
                            setFieldValue,
                          }) => (
                            <Form noValidate autoComplete="off">
                              <Grid xs={12} md={12} lg={12}>
                                {/* eventName, date, location, description, user_id  */}
                                <CardActions>
                                  {/* <form noValidate onSubmit={formik.handleSubmit}> */}
                                  <Card>
                                    <CardHeader
                                      subheader=""
                                      title="Add Events"
                                    />
                                    <CardContent sx={{ pt: 0 }}>
                                      <Box sx={{ m: -1.5 }}>
                                        <Grid container spacing={0}>
                                          <TextField
                                            fullWidth
                                            error={Boolean(
                                              touched._id && errors._id
                                            )}
                                            type="text"
                                            value={values._id}
                                            name="_id"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            inputProps={{}}
                                            id="outlined-basic"
                                            variant="outlined"
                                            hidden
                                          />
                                          <Grid
                                            sx={{ marginBottom: 3 }}
                                            xs={12}
                                            md={12}
                                          >
                                            <TextField
                                              fullWidth
                                              error={Boolean(
                                                touched.eventName &&
                                                  errors.eventName
                                              )}
                                              type="text"
                                              value={values.eventName}
                                              name="eventName"
                                              onBlur={handleBlur}
                                              onChange={handleChange}
                                              label="eventName"
                                              inputProps={{}}
                                              id="outlined-basic"
                                              variant="outlined"
                                            />
                                            {touched.eventName &&
                                              errors.eventName && (
                                                <FormHelperText
                                                  error
                                                  id="standard-weight-helper-text-email-login"
                                                >
                                                  {errors.eventName}
                                                </FormHelperText>
                                              )}
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
                                              error={Boolean(
                                                touched.titleCode &&
                                                  errors.titleCode
                                              )}
                                              fullWidth
                                              label="Description"
                                              name="description"
                                              value={values.description}
                                              onBlur={handleBlur}
                                              onChange={handleChange}
                                              // type="text"
                                              autoComplete={"off"}
                                            />
                                            {touched.description &&
                                              errors.description && (
                                                <FormHelperText
                                                  error
                                                  id="standard-weight-helper-text-email-login"
                                                >
                                                  {errors.description}
                                                </FormHelperText>
                                              )}
                                          </Grid>
                                          <Grid
                                            sx={{ marginBottom: 3 }}
                                            xs={12}
                                            md={12}
                                          >
                                            <TextField
                                              fullWidth
                                              error={Boolean(
                                                touched.location &&
                                                  errors.location
                                              )}
                                              type="text"
                                              value={values.location}
                                              name="location"
                                              onBlur={handleBlur}
                                              onChange={handleChange}
                                              label="location"
                                              inputProps={{}}
                                              id="outlined-basic"
                                              variant="outlined"
                                            />
                                            {touched.location &&
                                              errors.location && (
                                                <FormHelperText
                                                  error
                                                  id="standard-weight-helper-text-email-login"
                                                >
                                                  {errors.location}
                                                </FormHelperText>
                                              )}
                                            {touched.location &&
                                              errors.location && (
                                                <FormHelperText
                                                  error
                                                  id="standard-weight-helper-text-email-login"
                                                >
                                                  {errors.location}
                                                </FormHelperText>
                                              )}
                                          </Grid>
                                        </Grid>
                                      </Box>
                                    </CardContent>
                                    <Divider />
                                    <CardActions
                                      sx={{ justifyContent: "flex-end" }}
                                    >
                                      {/* <Button
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                type="submit"
                                variant="contained"
                                disabled={isLoading}
                              >
                                {isLoading ? "Loading..." : "Update event"}
                              </Button> */}
                                    </CardActions>
                                  </Card>
                                  {/* </form> */}
                                </CardActions>
                              </Grid>
                              <Box sx={{ width: "43%", mt: 2, float: "right" }}>
                                <Button
                                  disableElevation
                                  disabled={isLoading}
                                  fullWidth
                                  size="large"
                                  type="submit"
                                  variant="contained"
                                  color="secondary"
                                >
                                  {isLoading ? "Loading..." : "Update event"}
                                </Button>
                              </Box>
                            </Form>
                          )}
                        </Formik>
                      </CardActions>
                    </Grid>
                  </Box>
                </Modal>
              </div>
              <Modal
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <CardActions>
                    {/* <form noValidate> */}
                    <Card>
                      <CardHeader subheader="" title="Edit Event" />
                      <CardContent sx={{ pt: 0 }}>
                        <Box sx={{ m: -1.5 }}>
                          <Formik
                            initialValues={{
                              _id: userData._id,
                              eventName: userData.eventName,
                              description: userData.description,
                              location: userData.location,

                              // othername: '',
                              // submit: null
                            }}
                            validationSchema={Yup.object().shape({
                              //   // title: Yup.string().max(255).required('Title is required'),
                              _id: Yup.string()
                                .max(255)
                                .required("_id is required"),
                              eventName: Yup.string()
                                .max(255)
                                .required("eventName is required"),
                              description: Yup.string()
                                .max(255)
                                .required("description is required"),
                              location: Yup.string()
                                .max(255)
                                .required("location is required"),
                            })}
                            onSubmit={async (values) => {
                              setIsLoading(true);
                              console.log(values);

                              // setTimeout(() => {
                              //   console.log(values);
                              //   console.log(values.password);
                              //   setIsLoading(false);
                              // }, 10000);

                              reactLocalStorage.set("login", true);
                              const login = reactLocalStorage.get("login");

                              const responsea = axios({
                                method: "put",
                                url: baseUrl + "/events/" + values._id,
                                data: {
                                  eventName: values.eventName,
                                  location: values.location,
                                  description: values.description,
                                },
                                config: {
                                  headers: { "Content-Type": "multipart/form-data" },
                                },
                              })
                                .then(function (response) {
                                  console.log(response);
                      
                                  console.log(response.data.statusCode);
                                  if (response.data.statusCode === 200) {
                                    setIsLoading(false)
                                    window.location.reload();
                                    // navigate("/");
                                    setIsLoading(false);
                                  } else {
                                  }
                      
                                  return response;
                                })
                                .catch(function (error) {
                                  // console.log(error.response.data.message);
                                  // setStatus({ success: false });
                                  // setErrors({ submit: error.response.data.message });
                                  // setSubmitting(false);
                                  setIsLoading(false);
                                  // console.log(error);
                                });

                              // try {
                              //   setSubmitting(false);

                              //   if (scriptedRef.current && login) {
                              //     console.log('Login', login);
                              //     navigate('/sdfsdfsd');
                              //     setStatus({ success: true });
                              //     setSubmitting(false);
                              //   }
                              // } catch (err) {
                              //   console.error(err);
                              //   if (scriptedRef.current) {
                              //     setStatus({ success: false });
                              //     setErrors({ submit: err.message });
                              //     setSubmitting(false);
                              //   }
                              // }
                            }}
                          >
                            {({
                              errors,
                              handleBlur,
                              handleChange,
                              handleSubmit,
                              isSubmitting,
                              touched,
                              values,
                              setFieldValue,
                            }) => (
                              <Form noValidate autoComplete="off">
                                <Grid xs={12} md={12} lg={12}>
                                  {/* eventName, date, location, description, user_id  */}
                                  <CardActions>
                                    {/* <form noValidate onSubmit={formik.handleSubmit}> */}
                                    <Card>
                                      <CardHeader
                                        subheader=""
                                        title="Add Events"
                                      />
                                      <CardContent sx={{ pt: 0 }}>
                                        <Box sx={{ m: -1.5 }}>
                                          <Grid container spacing={0}>
                                            <TextField
                                              fullWidth
                                              error={Boolean(
                                                touched._id && errors._id
                                              )}
                                              type="text"
                                              value={values._id}
                                              name="_id"
                                              onBlur={handleBlur}
                                              onChange={handleChange}
                                              inputProps={{}}
                                              id="outlined-basic"
                                              variant="outlined"
                                              hidden
                                            />
                                            <Grid
                                              sx={{ marginBottom: 3 }}
                                              xs={12}
                                              md={12}
                                            >
                                              <TextField
                                                fullWidth
                                                error={Boolean(
                                                  touched.eventName &&
                                                    errors.eventName
                                                )}
                                                type="text"
                                                value={values.eventName}
                                                name="eventName"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="eventName"
                                                inputProps={{}}
                                                id="outlined-basic"
                                                variant="outlined"
                                              />
                                              {touched.eventName &&
                                                errors.eventName && (
                                                  <FormHelperText
                                                    error
                                                    id="standard-weight-helper-text-email-login"
                                                  >
                                                    {errors.eventName}
                                                  </FormHelperText>
                                                )}
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
                                                error={Boolean(
                                                  touched.titleCode &&
                                                    errors.titleCode
                                                )}
                                                fullWidth
                                                label="Description"
                                                name="description"
                                                value={values.description}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                // type="text"
                                                autoComplete={"off"}
                                              />
                                              {touched.description &&
                                                errors.description && (
                                                  <FormHelperText
                                                    error
                                                    id="standard-weight-helper-text-email-login"
                                                  >
                                                    {errors.description}
                                                  </FormHelperText>
                                                )}
                                            </Grid>
                                            <Grid
                                              sx={{ marginBottom: 3 }}
                                              xs={12}
                                              md={12}
                                            >
                                              <TextField
                                                fullWidth
                                                error={Boolean(
                                                  touched.location &&
                                                    errors.location
                                                )}
                                                type="text"
                                                value={values.location}
                                                name="location"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                label="location"
                                                inputProps={{}}
                                                id="outlined-basic"
                                                variant="outlined"
                                              />
                                              {touched.location &&
                                                errors.location && (
                                                  <FormHelperText
                                                    error
                                                    id="standard-weight-helper-text-email-login"
                                                  >
                                                    {errors.location}
                                                  </FormHelperText>
                                                )}
                                              {touched.location &&
                                                errors.location && (
                                                  <FormHelperText
                                                    error
                                                    id="standard-weight-helper-text-email-login"
                                                  >
                                                    {errors.location}
                                                  </FormHelperText>
                                                )}
                                            </Grid>
                                          </Grid>
                                        </Box>
                                      </CardContent>
                                      <Divider />
                                      <CardActions
                                        sx={{ justifyContent: "flex-end" }}
                                      >
                                        {/* <Button
                                fullWidth
                                size="large"
                                sx={{ mt: 3 }}
                                type="submit"
                                variant="contained"
                                disabled={isLoading}
                              >
                                {isLoading ? "Loading..." : "Update event"}
                              </Button> */}
                                      </CardActions>
                                    </Card>
                                    {/* </form> */}
                                  </CardActions>
                                </Grid>
                                <Box
                                  sx={{ width: "43%", mt: 2, float: "right" }}
                                >
                                  <Button
                                    disableElevation
                                    disabled={isLoading}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                  >
                                    {isLoading ? "Loading..." : "Update event"}
                                  </Button>
                                </Box>
                              </Form>
                            )}
                          </Formik>
                        </Box>
                      </CardContent>
                      <Divider />
                      <CardActions
                        fullWidth
                        sx={{ justifyContent: "flex-end" }}
                      >
                        {/* <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained" disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Continue'}
                              </Button> */}
                      </CardActions>
                    </Card>
                    {/* </form> */}
                  </CardActions>
                </Box>
              </Modal>
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
