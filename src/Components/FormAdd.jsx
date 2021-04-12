import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, { useState } from "react";
import useStyles from "../style";
import {useMutation} from "@apollo/client";
import {ADD_USER, GET_USERS} from "../query";

const FormAdd = (props) => {
  const classes = useStyles();
  const [form, setForm] = useState({
    id: "",
    name: "",
    rocket: "",
    twitted: "",
  });
  const [addUser, { data }] = useMutation(ADD_USER);

  const saveForm = () => {
    if(form.name && form.rocket && form.twitted){

    addUser({
      variables:{name: form.name,rocket: form.rocket, twitter: form.twitted},
        update: (cache, res) => {
          const modifiersData = cache.readQuery({ query: GET_USERS });
          const newData = JSON.parse(JSON.stringify(modifiersData))
          newData.users.unshift(res.data.insert_users.returning[0]);
        cache.writeQuery({ query: GET_USERS, data: newData  });
      }},
      )

      // props.state.unshift(form);
      // props.setState([...props.state]);
      props.setAddMode(false);
    }

  };

  const addTwitted = (e) => {
    setForm({ ...form, twitted: e.target.value });
  };
  const addName = (e) => {
    setForm({ ...form, name: e.target.value });
  };
  const addRocket = (e) => {
    setForm({ ...form, rocket: e.target.value });
  };
  return (
    <Container>
      <Grid
        className={classes.addBlock}
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
        <Grid container xs={3}>
          <TextField
            value={form.twitted}
            name={"twitted"}
            placeholder={"twitted"}
            onChange={addTwitted}
          />
        </Grid>
        <Grid container xs={3}>
          <TextField
            value={form.name}
            name={"name"}
            placeholder={"name"}
            onChange={addName}
          />
        </Grid>
        <Grid container xs={3}>
          <TextField
            value={form.rocket}
            name={"rocket"}
            placeholder={"rocket"}
            onChange={addRocket}
          />
        </Grid>
        <Grid container xs={3}>
          <Button
            className={classes.myButton}
            onClick={saveForm}
            variant="contained"
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FormAdd;
