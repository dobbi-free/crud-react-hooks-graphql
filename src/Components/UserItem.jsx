import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import useStyles from "../style";
import {DELETE_USER, EDIT_USER, GET_USERS} from "../query";
import {useMutation} from "@apollo/client";

const UserItem = (props) => {
    const classes = useStyles();

    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState(props.userItem);
    const [deleteUserQuery] = useMutation(DELETE_USER);
    const [editUserQuery] = useMutation(EDIT_USER);
    const saveForm = () => {
        editUserQuery({
            variables: {id: form.id, name: form.name, rocket: form.rocket, twitter: form.twitted},
            update: (cache, res) => {
                const modifiersData = cache.readQuery({query: GET_USERS});
                const newData = JSON.parse(JSON.stringify(modifiersData));
                // const updateData = updateData.users.map(o => {
                //   if (o.id === form.id) {
                //     return form;
                //   }
                //   return o;
                //
                // });
                const i = newData.users.findIndex(o => o.id === form.id);
                if (newData.users[i]) {
                    newData.users[i] = form
                } else {
                    newData.users.push(form)
                }
                ;
                cache.writeQuery({query: GET_USERS, data: newData});

            },
        })

        // props.setState(form);
        setEditMode(false);
    };
    const editRocket = (e) => {
        setForm(
            {...form, rocket: e.target.value}
        );
    };

    const editName = (e) => {
        setForm({...form, name: e.target.value});
    };

    const editTwitted = (e) => {
        setForm({...form, twitter: e.target.value});
    };

    const deleteUser = () => {
        deleteUserQuery({
            variables: {id: props.id},
            update: (cache, res) => {
                const modifiersData = cache.readQuery({query: GET_USERS});
                const newData = JSON.parse(JSON.stringify(modifiersData));
                const index = newData.users.findIndex((n) => n.id === props.id);
                newData.users.splice(index, 1);
                cache.writeQuery({query: GET_USERS, data: newData});
            },
            // const index = props.state.findIndex((n) => n.id === props.id);
            // if (index !== -1) {
            //   props.state.splice(index, 1);
            // }
            // props.setState([...props.state]);
        });
    };

    return (
        <Grid xs={12}>
            {!editMode && (
                <Grid container xs={12}>
                    <Grid xs={3}>
                        <h4>{props.name}</h4>
                    </Grid>
                    <Grid xs={3}>
                        <h4>{props.rocket}</h4>
                    </Grid>
                    <Grid xs={3}>
                        <h4>{props.twitted}</h4>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                        xs={3}
                    >
                        <Grid xs={8}>
                            <Button
                                className={classes.myButton}
                                onClick={(e) => {
                                    setEditMode(true);
                                }}
                                variant="contained"
                                color="primary"
                            >
                                Edit
                            </Button>
                        </Grid>
                        <Grid xs={4} spacing={3}>
                            <Button
                                onClick={deleteUser}
                                startIcon={<DeleteIcon/>}
                                variant="contained"
                                color="secondary"
                            >
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            )}
            {editMode && (
                <Grid className={classes.inputBlock} container xs={12}>
                    <Grid xs={3}>
                        <TextField
                            value={form.name}
                            name={"name"}
                            placeholder={"name"}
                            onChange={editName}
                        />
                    </Grid>
                    <Grid xs={3}>
                        <TextField
                            value={form.rocket}
                            name={"rocket"}
                            placeholder={"rocket"}
                            onChange={editRocket}
                        />
                    </Grid>
                    <Grid xs={3}>
                        <TextField
                            value={form.twitted}
                            name={"twitted"}
                            placeholder={"twitted"}
                            onChange={editTwitted}
                        />
                    </Grid>
                    <Grid xs={3}>
                        <Button
                            className={classes.myButton}
                            onClick={saveForm}
                            variant="contained"
                            color="primary"
                        >
                            save
                        </Button>
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};

export default UserItem;
