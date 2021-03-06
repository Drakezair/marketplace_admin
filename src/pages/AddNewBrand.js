import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, FormControlLabel, Checkbox, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import * as firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import  'firebase/database';

export function AddNewBrand({navigation}){

    const [state, setState] =  useState({onDiscount: false, category: null, photos: []});
    const [photos, setPhotos] =  useState([]);
    const [image, setImage] =  useState(false);
    const [categories, setCategories] =  useState([]);

    let history = useHistory();

    useEffect(()=>{
        const initFetch = async () =>{
            const tempArr = []
            await firebase.database().ref('categories').once("value",(snapshot)=>{
                Object.keys(snapshot.val()).map((item, i)=>{
                    tempArr.push({id: item, ...snapshot.val()[item]})
                    return 0;
                })
            })
            setCategories(tempArr)
        }

        initFetch()
    },[])

    const handleState = (stateName, value)=>{
        setState({
            ...state,
            [stateName]: value
        })
    }

    const uploadFoto = async (e) => {
        let file = e.target.files[0]
        let tempArr = state.photos
        const storageRef = await firebase.storage().ref(`brand/${file.name}`);
        await storageRef.put(file)
        const url = await firebase.storage().ref(`brand/${file.name}`).getDownloadURL().then(data=>tempArr.push(data))
        handleState("photos", tempArr )
        setPhotos(tempArr)
        setImage(true)
    }

    const handleForm = (e) => {
        e.preventDefault();
        firebase.database().ref('brands').push(state)
        history.push('/')
    }

    return(
        <Container>
            <h1 style={{textAlign:"center"}} > Crear una marca</h1>
            <form onSubmit={handleForm} >
                <TextField onChange={(e)=>handleState('name', e.target.value)} placeholder='Nombre' variant="outlined" fullWidth style={{margin: 10}} />
                <TextField onChange={(e)=>handleState('desc', e.target.value)} placeholder='Descripción' variant="outlined" fullWidth style={{margin: 10}} />
                <TextField onChange={(e)=>handleState('address', e.target.value)} placeholder='Dirección' variant="outlined" fullWidth style={{margin: 10}} />
                <TextField onChange={(e)=>handleState('phone', e.target.value)} placeholder='Telefono' type='number' variant="outlined" fullWidth style={{margin: 10}} />
                <TextField onChange={(e)=>handleState('was', e.target.value)} placeholder='WhatsApp' type='number' variant="outlined" fullWidth style={{margin: 10}} />
                <TextField onChange={(e)=>handleState('instagram', e.target.value)} placeholder='Instagram' variant="outlined" fullWidth style={{margin: 10}} />
                <TextField onChange={(e)=>handleState('region', e.target.value)} placeholder='Region' variant="outlined" fullWidth style={{margin: 10}} />
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state.category}
                    onChange={(e)=>handleState("category", e.target.value)}
                    >
                    {
                        categories.map((item,i)=><MenuItem value={item.id} key={i} >{item.name}</MenuItem>)
                    }
                    
                </Select>
                </FormControl>
                <input
                    accept="image/*"
                    id="contained-button-file"
                    style={{visibility:'hidden'}}
                    multiple
                    onChange={uploadFoto}
                    type="file"
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" fullWidth component="span">
                        Fotos
                    </Button>
                </label>
                {
                    photos.map((item,i)=>{
                        return <img height={200} style={{margin: 20}} src={item} key={i} />
                    })
                }
                {
                    image ? <p>Imagenes Cargadas</p> : null
                }
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={state.onDiscount}
                        onChange={()=>handleState("onDiscount", !state.onDiscount)}
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Descuento activo"
                />

                <Button variant="contained" color="primary" fullWidth type="submit">Crear</Button>
            </form>
        </Container>
    );
}