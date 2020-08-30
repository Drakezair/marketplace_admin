import React, { useState } from 'react';
import { TextField, Container, Button } from '@material-ui/core';

import * as firebase from "firebase/app";
import  'firebase/database';
import 'firebase/storage';

export function AddNewWallpaper(){

    const [ state, setState] = useState({});

    const handleState = (stateName, value)=>{
        setState({
            ...state,
            [stateName]: value
        })
    }

    const handleForm = (e) => {
        e.preventDefault();
        firebase.database().ref('wallpapers').push({name: state.name, photo: state.photo})
    }

    const uploadFoto = async (e) => {
        let file =e.target.files[0]
        const storageRef = firebase.storage().ref(`wallpapers/${file.name}`);
        await storageRef.put(file)
        const url = await storageRef.getDownloadURL();
        handleState("photo", url)
    }

    return(
        <Container>
            <h1 style={{textAlign:"center"}} > Crear un anucio</h1>
            <form onSubmit={handleForm} >
                <TextField onChange={(e)=>handleState('name', e.target.value)} placeholder='Nombre' variant="outlined" fullWidth style={{margin: 10}} />
                <input
                    accept="image/*"
                    id="contained-button-file"
                    style={{visibility:'hidden'}}
                    multiple
                    onChange={uploadFoto}
                    type="file"
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" style={{margin: 10}} fullWidth component="span">
                        Foto
                    </Button>
                </label>
                <Button variant="contained" color="primary" style={{margin: 10}} fullWidth type="submit">Crear</Button>
            </form>
        </Container>
    )
}