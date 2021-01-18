import React, { useState } from 'react';
import { TextField, Container, Button } from '@material-ui/core';
import { SketchPicker } from 'react-color';


import * as firebase from "firebase/app";
import  'firebase/database';
import 'firebase/storage';

export function AddNewRegion(){

    
    const [ state, setState] = useState({});
    const [ image, setimage] = useState(false);
    const handleState = (stateName, value)=>{
        setState({
            ...state,
            [stateName]: value
        })
    }

    const handleForm = (e) => {
        e.preventDefault();
        firebase.database().ref('regiones').push({name: state.name, code: state.code})
    }

    return(
        <Container>
            <h1 style={{textAlign:"center"}} > Crear una Region</h1>
            <form onSubmit={handleForm} >
                <TextField onChange={(e)=>handleState('name', e.target.value)} placeholder='Nombre' variant="outlined" fullWidth style={{margin: 10}} />
                <TextField onChange={(e)=>handleState('code', e.target.value)} placeholder='Codigo' variant="outlined" fullWidth style={{margin: 10}} />
                
                
                <Button variant="contained" color="primary" style={{margin: 10}} fullWidth type="submit">Crear</Button>
            </form>
        </Container>
    )
}