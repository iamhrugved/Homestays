import React from "react";
import { Routes, Route } from "react-router-dom";
// import Layout from "../components/Layout";
import Dashboard from "../components/AdminDashboard/Dashboard"
import AdminBookings from "../components/AdminBookings/AdminBookings"

const OrganizerRoutes = () => {
  return (
    <Routes>
      {/* <Layout> */}
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
          {/* <AdminDashboard /> */}

        <Route path="/admin/bookings" element={<AdminBookings/>}/>

      {/* </Layout> */}
    </Routes>
  );
};

export default OrganizerRoutes;