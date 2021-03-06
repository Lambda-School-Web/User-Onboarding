import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: 800,
    margin: "20px auto",
    padding: "40px"
  },
  pname: {
    fontSize: "36px",
    margin: "0 0"
  },
  pemail: {
    fontSize: "24px",
    color: "darkslategray",
    marginTop: "5",
    marginBottom: "0"
  },
  ppassword: {
    fontSize: "24px",
    color: "darkslategray",
    margin: "0 0"
  },
  prole: {
    fontSize: "24px",
    color: "grey",
    margin: "0 0"
  }
}));

const UserList = ({ users }) => {
  const classes = useStyles();
  const [showPassword, setShowPassWord] = useState({});

  const handleClick = e => {
    e.persist();
    console.log(e.target.name);
    if (showPassword[`${e.target.name}`] === true) {
      setShowPassWord(values => {
        return {
          ...values,
          [e.target.name]: false
        };
      });
    } else {
      setShowPassWord(values => {
        return {
          ...values,
          [e.target.name]: true
        };
      });
    }
  };
  return (
    <div>
      {users.map((el, index) => (
        <Card className={classes.container}>
          <p className={classes.pname}>{el.name}</p>
          <p className={classes.pemail}>{el.email}</p>
          <div>
            {showPassword[`show${index}`] ? (
              <p className={classes.ppassword}>{el.password}</p>
            ) : (
              <p className={classes.ppassword}>
                {"*".repeat(el.password.length)}
              </p>
            )}
            <button
              key={index}
              name={`show${index}`}
              value="show"
              onClick={handleClick}
            >
              {showPassword[`show${index}`] ? "Hide Password" : "Show Password"}
            </button>
          </div>

          <p className={classes.prole}>{el.role}</p>
        </Card>
      ))}
    </div>
  );
};

export default UserList;
