import React, {useState, useEffect} from 'react';
import { Table, TableHead, TableCell, TableRow, TableBody, Container } from '@material-ui/core';
import * as firebase from "firebase/app";
import  'firebase/database';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
export function BrandList({navigation}){

    const [brands, setBrands] = useState([]);
    const [keys, setKeys] = useState([]);
    useEffect(()=>{
        async function initFetch(){

            let tempArr = []
            await firebase.database().ref('brands').once('value',(snapshot)=>{
                Object.keys(snapshot.val()).map((item)=>tempArr.push(snapshot.val()[item]))
                setKeys(Object.keys(snapshot.val()))
            })
            setBrands(tempArr)
        }

        initFetch()

    },[])

    const handleDelete = async (id) =>{
        firebase.database().ref('brands').child(id).remove()
        window.location.reload();
    }

    const handleEdit = async (id) =>{
        window.open('/brand/'+id, '_self')
    }

    return(
        <div style={{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
            <h1>Marcas</h1>
            <Container>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell ><strong>Nombre</strong></TableCell>
                            <TableCell ><strong>En promoción</strong></TableCell>
                            <TableCell ><strong>Categoria</strong></TableCell>
                            <TableCell ><strong>Telefono</strong></TableCell>
                            <TableCell ><strong>Instagram</strong></TableCell>
                            <TableCell ><strong>Acciones</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            brands.map((item, i)=>{
                                return(
                                    <TableRow key={i} >
                                        <TableCell >{item.name}</TableCell>
                                        <TableCell >{item.onDiscount ? "activo" : "no activo"}</TableCell>
                                        <TableCell >{item.category}</TableCell>
                                        <TableCell >{item.phone}</TableCell>
                                        <TableCell >{item.instagram}</TableCell>
                                        <TableCell >
                                            <DeleteForeverIcon onClick={()=>{handleDelete(keys[i])}} style={{cursor: "pointer"}} color="error" />
                                            <EditIcon onClick={()=>{handleEdit(keys[i])}} style={{cursor: "pointer"}}  />
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