import React, {useState, useEffect} from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Container } from '@material-ui/core';
import * as firebase from "firebase/app";
import  'firebase/database';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export function RegionList(){

    const [brands, setBrands] = useState([]);
    const [keys, setKeys] = useState([]);
    useEffect(()=>{
        async function initFetch(){

            let tempArr = []
            await firebase.database().ref('regiones').once('value',(snapshot)=>{
                Object.keys(snapshot.val()).map((item)=>tempArr.push(snapshot.val()[item]))
                setKeys(Object.keys(snapshot.val()))
            })
            setBrands(tempArr)
        }

        initFetch()

    },[])

    const handleDelete = async (id) =>{
        firebase.database().ref('regiones').child(id).remove()
        window.location.reload();
    }

    return(
        <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1>Marcas</h1>
            <Container>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell ><strong>Nombre</strong></TableCell>
                            <TableCell ><strong>codigo</strong></TableCell>
                            <TableCell ><strong>Acciones</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            brands.map((item, i)=>{
                                return(
                                    <TableRow key={i} >
                                        <TableCell >{item.name}</TableCell>
                                        <TableCell >{item.code}</TableCell>
                                        <TableCell >
                                            <DeleteForeverIcon onClick={()=>{handleDelete(keys[i])}} style={{cursor: "pointer"}} color="error" />
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