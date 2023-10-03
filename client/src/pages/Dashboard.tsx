import React from "react";
import { Box } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

interface Props {
    handleClick: () => void;
    menuOpen: boolean;
}

export default function Dashboard({handleClick, menuOpen}: Props){
    return(
        <Box sx={{ paddingLeft: { xs: 5, md: 12 }, paddingRight: { xs: 5, md: 12 } }}>
            <NavBar handleClick={handleClick} menuOpen={menuOpen}/>
            <Outlet/>
        </Box>
    )
}