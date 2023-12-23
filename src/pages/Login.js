import React, { useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";

import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  Checkbox,
  // Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  // useMediaQuery
} from "@mui/material";
import { reactLocalStorage } from "reactjs-localstorage";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const Login = () => {
  const theme = useTheme();
  //   const navigate = useNavigate();
  // const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  // const customization = useSelector((state) => state.customization);
  const [checked, setChecked] = useState(true);

  // const googleHandler = async () => {
  //   console.error('Login');
  // };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="Auth-form-container">
      <Grid item xs={12}>
        <Grid container alignItems="center" justifyContent="center">
          <Grid  item>
            <Stack marginBottom={5} alignItems="center" justifyContent="center" spacing={1}>
              <Typography
                color={theme.palette.secondary.main}
                gutterBottom
                variant={"h2"}
              >
                Hi, Welcome Back
              </Typography>
              <Typography
                variant="caption"
                fontSize="16px"
                textAlign={"center"}
              >
                Enter your credentials to continue
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <Formik
              initialValues={{
                email: "",
                password: "",
                submit: null,
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("Must be a valid email")
                  .max(255)
                  .required("Email is required"),
                password: Yup.string()
                  .max(255)
                  .required("Password is required"),
              })}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
              ) => {
                // setTimeout(() => {

                //   console.log(values.email)
                //   console.log(values.password)
                //   setSubmitting(false);
                // }, 5000);

                reactLocalStorage.set("login", true);
                const login = reactLocalStorage.get("login");

                try {
                  setSubmitting(false);

                  // if (scriptedRef.current && login) {

                  //   console.log("Login", login )
                  //   navigate('/');
                  //   setStatus({ success: true });
                  //   setSubmitting(false);
                  // }
                } catch (err) {
                  console.error(err);
                  // if (scriptedRef.current) {
                  //   setStatus({ success: false });
                  //   setErrors({ submit: err.message });
                  //   setSubmitting(false);
                  // }
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
              }) => (
                <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    sx={{ ...theme.typography.customInput, marginBottom: 3 }}
                  >
                    <InputLabel htmlFor="outlined-adornment-email-login">
                      Email Address
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="email"
                      value={values.email}
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      label="Email Address"
                      inputProps={{}}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-email-login"
                      >
                        {errors.email}
                      </FormHelperText>
                    )}
                  </FormControl>

                  <FormControl
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    sx={{ ...theme.typography.customInput, marginBottom: 3 }}
                  >
                    <InputLabel htmlFor="outlined-adornment-password-login">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password-login"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      inputProps={{}}
                    />
                    {touched.password && errors.password && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-password-login"
                      >
                        {errors.password}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(event) => setChecked(event.target.checked)}
                          name="checked"
                          color="primary"
                        />
                      }
                      label="Remember me"
                    />
                    <Typography
                      variant="subtitle1"
                      color="secondary"
                      sx={{ textDecoration: "none", cursor: "pointer" }}
                    >
                      Forgot Password?
                    </Typography>
                  </Stack>
                  {errors.submit && (
                    <Box sx={{ mt: 3 }}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Box>
                  )}

                  <Box sx={{ mt: 2 }}>
                    <Button
                      disableElevation
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Sign in
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
