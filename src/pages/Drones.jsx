import { Alert, CircularProgress, Grid, Typography } from '@mui/material'
import axios from 'axios';
import Card from 'components/Card'
import React, { useEffect, useState } from 'react'
import Dron from '../images/dron1.jpg';

const Drones = () => {

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [drones, setDrones] = useState([]);


    // useEffect(() => {
    //     const interval = setInterval(() => getDrones(), 5000);
    //     return () => clearInterval(interval);
    // }, []);

    const getDrones = async () => {
        try {
            var d = new Date();
            d.setDate(d.getDate() - 5);
            const response = await axios.get(`${process.env.REACT_APP_CONTROL_URL}/control/api/changes`, {
                params: {
                    timeFrom: d
                }
            });
            setDrones(filterDrones(response.data));
        } catch {
            setError(true);
            setSuccess(false);
        }
    }

    useEffect(() => {
        getDrones()
    }, [getDrones])

    const filterDrones = (data) => {
        if (data && data.length > 0) {
            const drones = data.filter(value => value.type === 'DRON').map(data => data.data.dron).reverse();
            const filteredDrones = [];
            filteredDrones.push(drones.find(dron => dron.name ? dron.name === "A" : dron = 1));
            filteredDrones.push(drones.find(dron => dron.name ? dron.name === "B" : dron = 1));
            filteredDrones.push(drones.find(dron => dron.name ? dron.name === "C" : dron = 1));
            return filteredDrones;
        } else return [];
    };

    return (
        <Grid container spacing={2} flexDirection="row" style={{
            width: '100%',
            margin: '2%',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Grid item sm={12}>
                <Typography variant="h3" gutterBottom>
                    Drones
                </Typography>
            </Grid>
            <>
                {
                    drones.length > 0 ?
                        drones.map(dron => <Grid item sm={3}>
                            <Card img={Dron} name={dron.name} state={dron.state} id={dron.id} />
                        </Grid>) : <div>cargando...</div>
                }
            </>
            <Grid item sm={3} style={{
                display: success ? 'flex' : 'none'
            }}>
                <Alert severity="success">Información enviada!</Alert>
            </Grid>
            <Grid item sm={3} style={{
                display: error ? 'flex' : 'none'
            }}>
                <Alert severity="error">Ha ocurrido un error</Alert>
            </Grid>
        </Grid>
    )
}

export default Drones