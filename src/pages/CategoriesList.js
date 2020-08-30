import React, {useState, useEffect} from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Container } from '@material-ui/core';
import * as firebase from "firebase/app";
import  'firebase/database';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export function CategoriesList(){

    const [Categories, setCategories] = useState([]);
    const [keys, setKeys] = useState([]);

    useEffect(()=>{
        async function initFetch(){

            let tempArr = []
            await firebase.database().ref('categories').once('value',(snapshot)=>{
                Object.keys(snapshot.val()).map((item)=>tempArr.push(snapshot.val()[item]))
                setKeys(Object.keys(snapshot.val()))
            })
            setCategories(tempArr)
        }

        initFetch()

    }, [])

    const handleDelete = async (id) =>{
        firebase.database().ref('wallpapers').child(id).remove()
        window.location.reload();
    }

    return(
        <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1>Categorias</h1>
            <Container>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell ><strong>Nombre</strong></TableCell>
                            <TableCell ><strong>Acciones</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Categories.map((item, i)=>{
                                return(
                                    <TableRow key={i} >
                                        <TableCell >{item.name}</TableCell>
                                        <TableCell >
                                            <DeleteForeverIcon onClick={()=>handleDelete(keys[i])} style={{cursor: "pointer"}} color="error" />
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </Container>
        </div>
    )
}