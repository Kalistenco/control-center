import './App.css';
import React, { useCallback, useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Drones from 'pages/Drones';
import Events from 'pages/Events';
import Dashboard from 'pages/Dashboard';
import axios from 'axios';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/events",
    element: <Events />,
  },

  {
    path: "/drones",
    element: <Drones />,
  }
]);


function App() {

  useEffect(() => {
    getSync();
  }, []);

  const getSync = useCallback(async () => {
    try {
      await axios.get(`${process.env.REACT_APP_CONTROL_URL}/control/api/syncronize`);
      sessionStorage.setItem("timeFrom", new Date().toISOString());
    } catch {
    }
  }, [])


  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
