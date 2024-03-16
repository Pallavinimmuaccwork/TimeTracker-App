import { AppBar, Toolbar, Typography } from "@mui/material";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import React from "react";

const Navigationbar = ({ totalTaskTime }) => {

    console.log('totalTaskTime', totalTaskTime)

    return (
        <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', height: '70px' }}>
            <Toolbar>
                <AccessTimeFilledIcon sx={{ fontSize: 40, marginLeft: '90px' }} />
                <Typography component="div" sx={{ flexGrow: 1, marginRight: "1000px",fontSize:'20px' }}>
                    Time Tracker
                </Typography>
                <Typography component="div" sx={{ flexGrow: 1, marginRight: "50px",fontSize:'20px' }}>
                    Total Time Spent: {totalTaskTime}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Navigationbar;
