import React, { useEffect } from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { TextField, Select, Checkbox } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    width: 800,
    margin: "20px auto",
    padding: "40px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
    width: 400
  },
  select: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    padding: theme.spacing(1),
    width: 400
  }
}));

const UserForm = ({ values, errors, touched, status, setUsers }) => {
  useEffect(() => {
    if (status) {
      setUsers(users => [...users, status]);
    }
  }, [status]);

  const classes = useStyles();

  return (
    <Card className={classes.container}>
      <Form className={classes.form}>
        <Field
          type="text"
          name="name"
          component={TextField}
          margin="normal"
          label="Name"
          className={classes.textField}
        />

        <Field
          type="text"
          name="email"
          component={TextField}
          margin="normal"
          label="E-Mail"
          className={classes.textField}
        />

        <Field
          type="password"
          name="password"
          component={TextField}
          margin="normal"
          label="Password"
          className={classes.textField}
        />
        <Field
          type="password"
          name="confirmPassword"
          component={TextField}
          margin="normal"
          label="Confirm Password"
          className={classes.textField}
        />
        <Field component={Select} name="role" className={classes.select}>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="moderator">Moderator</MenuItem>
          <MenuItem value="Admin">Admin</MenuItem>
        </Field>

        <FormControlLabel
          control={
            <Field
              type="checkbox"
              name="tos"
              checked={values.tos}
              component={Checkbox}
              color="primary"
            />
          }
          className={classes.textField}
          label="I accept the Terms of Service"
        />
        {touched.tos && errors.tos && (
          <p className="error" style={{ color: "red" }}>
            {errors.tos}
          </p>
        )}
        <Button
          className={classes.textField}
          variant="contained"
          color="primary"
          type="submit"
        >
          Add
        </Button>
      </Form>
    </Card>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues({ name, email, password, confirmPassword, tos, role }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false,
      role: role || "user"
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is required."),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(9, "Password must be at least 9 characters long.")
      .required("Password is required."),
    confirmPassword: Yup.string().when("password", {
      is: val => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      )
    }),
    tos: Yup.bool()
      .test(
        "Terms of Services",
        "You have to agree with our Terms of Services!",
        value => value === true
      )
      .required("You have to agree with our Terms of Services!")
  }),
  handleSubmit(values, { setStatus, resetForm }) {
    axios
      .post("https://reqres.in/api/users", values)
      .then(res => {
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.error(err));
  }
})(UserForm);

export default FormikUserForm;
