import "./App.css";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import { AppBar, Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import UserItem from "./Components/UserItem";
import FormAdd from "./Components/FormAdd";
import {GET_USERS} from "./query";
import {useQuery} from "@apollo/client";

function App() {
  const [user, setUser] = useState([
    { id: 0, name: "ss", rocket: "rocket1", twitted: "wwww" },
    { id: 1, name: "aa", rocket: "rocket2", twitted: "sdd" },
    { id: 2, name: "dd", rocket: "rocket3", twitted: "sda" },
  ]);
  const [addMode, setAddMode] = useState(false);
  const { data, loading } = useQuery(GET_USERS);


  let userItem = data?.users?.map((userItem) => (
    <UserItem
      id={userItem.id}
      userItem={userItem}
      state={data.users}
      setState={setUser}
      key={userItem.id}
      name={userItem.name}
      rocket={userItem.rocket}
      twitted={userItem.twitted}
    />
  ));

  return (
    <div>
      <AppBar position={"static"}>
        <Container>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <h1>Cosmonauts</h1>
            <Button onClick={(e) => setAddMode(true)} variant="contained">
              Add new
            </Button>
          </Grid>
        </Container>
      </AppBar>
      <Container>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid container xs={3}>
            <h2>Name</h2>
          </Grid>
          <Grid container xs={3}>
            <h2>Rocket</h2>
          </Grid>
          <Grid container xs={3}>
            <h2>Twitted</h2>
          </Grid>
          <Grid
              container xs={3}
              justify="center"
              alignItems="center">
            <h2>Actions</h2>
          </Grid>
        </Grid>
      </Container>
      {addMode && (
        <FormAdd setState={setUser} state={user} setAddMode={setAddMode} />
      )}
      <Container>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          xs={12}
        >
          {userItem}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
