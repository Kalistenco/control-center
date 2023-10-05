import { Button, Grid, Typography } from '@mui/material'
import axios from 'axios';
import React, { useCallback, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <Grid container spacing={2} flexDirection="column" style={{
            width: '100%',
            marginTop: '10%',
            alignItems: 'center',
        }}>
            <Grid item sm={6}>
                <Typography variant="h3" gutterBottom>
                    HailStopper
                </Typography>
            </Grid>
            <Grid item sm={6}>
                <Button variant="contained" onClick={() => navigate("/drones")}>Drones</Button>
            </Grid>
            <Grid item sm={6}>
                <Button variant="contained" onClick={() => navigate("/events")}>Eventos</Button>
            </Grid>

        </Grid>
    )
}

export default Dashboard