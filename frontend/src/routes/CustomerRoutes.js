import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from '../components/Customer/pages/home/Home';
import Hotel from '../components/Customer/pages/hotel/Hotel';
import Link from '../components/Customer/pages/list/List';

export const CustomerRoutes = () => {

  console.log("inside cust routes");
  return (
    <Routes>
      {/* <Route path="/home" element={<Home />}/> */}
      <Route path="/hotels" element={<Link/>}/>
      <Route path="/customer/hotels/:id" element={<Hotel/>}/>
    </Routes>
  );
};
