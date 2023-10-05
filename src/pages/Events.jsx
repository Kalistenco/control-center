import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Events() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => getDrones(), 3000);
        return () => clearInterval(interval);
      }, []);

    useEffect(() => {
        getDrones()
    }, [])

    const getDrones = async () => {
        try {
            // const timeFrom = sessionStorage.getItem("timeFrom");
            var d = new Date();
            d.setDate(d.getDate() - 5);
            const response = await axios.get(`${process.env.REACT_APP_CONTROL_URL}/control/api/changes`, {
                params: {
                    timeFrom: d
                }
            });
            setData(response.data.reverse());
        } catch {
        }
    }

    const mapState = (state) => {
        switch (state) {
            case 'IN_BASE':
                return "En base";
            case 'IN_LOCATION':
                return "En locación";
            case 'GOING_BACK_TO_BASE':
                return "Volviendo a base";
            case 'SPRAYING':
                return "Rociando";
            case 'GOING_TO_LOCATION':
                return "Yendo a locación";
            case 'FINISHED':
                return "Terminado";
            case 'GO_BACK_TO_BASE':
                return "Volviendo a base";
            case 'GO_TO_LOCATION':
                return "Ir a locación";
            case 'SPRAY':
                return "Rociar";
            default: 
                return "";
        }

    }

    const mapDron = (dron) => {
        return `Drone:  ${dron.name} - Estado: ${mapState(dron.state)}`;
    }

    const mapTwitter = (tweet) => {
        return `Mensaje: ${tweet.message}`
    }

    const mapSatelital = (data) => {
        return `Mensaje: ${data.message} - Coordenadas: X: ${data.coordinates.x}, Y: ${data.coordinates.y} - Nivel: ${data.level}`
    }

    const mapRow = (row) => {
        switch(row.type) {
            case "DRON":
                return mapDron(row.data.dron);
            case "SATELITAL":
                return mapSatelital(row.data.alert)
            case "TWITTER":
                return mapTwitter(row.data)
            default: 
                return null
        }
    }

    return (
        <TableContainer component={Paper} sx={{
            margin: '2%',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Table sx={{ maxWidth: 1200 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Tipo de evento</TableCell>
                        <TableCell align="right">Timestamp</TableCell>
                        <TableCell align="right">Datos</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.type}
                            </TableCell>
                            <TableCell align="right">{row.timestamp}</TableCell>
                            <TableCell align="right">{mapRow(row)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}