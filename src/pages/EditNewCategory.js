import React, { useEffect, useState } from 'react';
import { TextField, Container, Button } from '@material-ui/core';
import { SketchPicker } from 'react-color';


import * as firebase from "firebase/app";
import  'firebase/database';
import 'firebase/storage';

export function EditNewCategory({match}){

    
    const [ state, setState] = useState({});
    const [ image, setimage] = useState(false);
    const handleState = (stateName, value)=>{
        setState({
            ...state,
            [stateName]: value
        })
    }

    useEffect(()=>{
        const initFetch = async () =>{
            await firebase.database().ref('categories').child(match.params.id).once('value', (snapshot)=>{
                setState(snapshot.val())
            })
        }
        initFetch();
    })

    const handleForm = (e) => {
        e.preventDefault();
        firebase.database().ref('categories').child(match.params.id).update({name: state.name, photo: state.photo, color: state.color})
    }

    const uploadFoto = async (e) => {
        let file =e.target.files[0]
        const storageRef = firebase.storage().ref(`categories/${file.name}`);
        await storageRef.put(file)
        const url = await storageRef.getDownloadURL();
        setimage(true)
        handleState("photo", url)
    }

    return(
        <Container>
            <h1 style={{textAlign:"center"}} > Crear una Categoria</h1>
            <form onSubmit={handleForm} >
                <TextField value={state.name} onChange={(e)=>handleState('name', e.target.value)} placeholder='Nombre' variant="outlined" fullWidth style={{margin: 10}} />
                <input
                    accept="image/*"
                    id="contained-button-file"
                    style={{visibility:'hidden'}}
                    multiple
                    onChange={uploadFoto}
                    type="file"

                />
                <SketchPicker value={state.color} color={state.color} onChange={(color) => handleState('color', color.hex)} />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" style={{margin: 10}} fullWidth component="span">
                        Icono
                    </Button>
                </label>
                {
                    image? <p>Imagen cargada</p> : null
                }
                <Button variant="contained" color="primary" style={{margin: 10}} fullWidth type="submit">Crear</Button>
            </form>
        </Container>
    )
}