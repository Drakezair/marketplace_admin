import React,{useEffect} from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { ListItem, ListItemIcon, ListItemText, List } from '@material-ui/core';

import StoreIcon from '@material-ui/icons/Store';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddBoxIcon from '@material-ui/icons/AddBox';
import GridOnIcon from '@material-ui/icons/GridOn';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ImageIcon from '@material-ui/icons/Image';

import { BrandList, AddNewBrand, AddNewCategory, CategoriesList, AddNewWallpaper, WallpapersList } from '../pages';
import { AddNewRegion } from '../pages/AddNewRegion';
import { RegionList } from '../pages/RegionList';
import { EditNewBrand } from '../pages/EditNewBrand';
import { EditNewCategory } from '../pages/EditNewCategory';

export default function AppRouter(){

    useEffect(()=>{
        var person = prompt("Contraseña", "");

        if( person !== "VtN68q3sUj7BOPwpASt5oelcz6xvX2mFmgZneo9") {
            window.location.reload()
        } 
    },[])

    const draweWidth = 200

    return(
        <Router>
            <div >
                <div variant="permanent" style={{width:draweWidth, borderRightWidth: 1, borderRightStyle:'solid', borderRightColor: "#cbcbcb", height: "100vh", position: "fixed", top: 0}} >
                    <List>
                        <Link to='/' style={{textDecoration: 'none', color: "black"}} >
                            <ListItem button >
                                <ListItemIcon><StoreIcon/></ListItemIcon>
                                <ListItemText primary={"Marcas"} />
                            </ListItem>
                        </Link>
                        <Link to='/add-brand' style={{textDecoration: 'none', color: "black"}} >
                            <ListItem button >
                                <ListItemIcon><AddCircleIcon/></ListItemIcon>
                                <ListItemText primary={"Crear marca"} />
                            </ListItem>
                        </Link>
                        <Link to='/categories' style={{textDecoration: 'none', color: "black"}} >
                            <ListItem button >
                                <ListItemIcon><GridOnIcon /></ListItemIcon>
                                <ListItemText primary={"Categorias"} />
                            </ListItem>
                        </Link>
                        <Link to='/add-category' style={{textDecoration: 'none', color: "black"}} >
                            <ListItem button >
                                <ListItemIcon><AddBoxIcon/></ListItemIcon>
                                <ListItemText primary={"Crear categoria"} />
                            </ListItem>
                        </Link>
                        <Link to='/wallpaper' style={{textDecoration: 'none', color: "black"}} >
                            <ListItem button >
                                <ListItemIcon><ImageIcon/></ListItemIcon>
                                <ListItemText primary={"Anuncios"} />
                            </ListItem>
                        </Link>
                        <Link to='/add-wallpaper' style={{textDecoration: 'none', color: "black"}} >
                            <ListItem button >
                                <ListItemIcon><AddAPhotoIcon/></ListItemIcon>
                                <ListItemText primary={"Crear anuncio"} />
                            </ListItem>
                        </Link>
                        <Link to='/regions' style={{textDecoration: 'none', color: "black"}} >
                            <ListItem button >
                                <ListItemIcon><AddAPhotoIcon/></ListItemIcon>
                                <ListItemText primary={"Region"} />
                            </ListItem>
                        </Link>
                        <Link to='/add-regions' style={{textDecoration: 'none', color: "black"}} >
                            <ListItem button >
                                <ListItemIcon><AddAPhotoIcon/></ListItemIcon>
                                <ListItemText primary={"Crear Regiones"} />
                            </ListItem>
                        </Link>
                    </List>
                </div>
                <div style={{marginLeft: draweWidth}} >
                    <Switch>
                        <Route exact path="/" ><BrandList/></Route>
                        <Route path="/add-brand" ><AddNewBrand/></Route>
                        <Route path="/brand/:id" component={EditNewBrand}/>
                        <Route path="/categories/:id" component={EditNewCategory} />
                        <Route path="/categories" ><CategoriesList/></Route>
                        <Route path="/add-category" ><AddNewCategory/></Route>
                        <Route path="/wallpaper" ><WallpapersList/></Route>
                        <Route path="/add-wallpaper" ><AddNewWallpaper/></Route>
                        <Route path="/regions" ><RegionList/></Route>
                        <Route path="/add-regions" ><AddNewRegion/></Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}