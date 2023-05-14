import './App.css';
import { BrowserRouter, Route, Routes  } from "react-router-dom";

import Hotel from './components/Customer/pages/hotel/Hotel';
import Link from './components/Customer/pages/list/List';
import Home from './components/Customer/pages/home/Home';
import Login from './components/Login';
import Booking from './components/Customer/pages/booking/Booking';
import CustomerSignup from './components/CustomerSignup';
import EmployeeSignup from './components/EmployeeSignup';
import EmployeeDashboard from './components/Employee/Dashboard';
import AddPlace from './components/Employee/AddPlace';

//App Component
export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/customer/home" element={<Home />}/>
          <Route path="/admin" element={<EmployeeDashboard/>}/>
          <Route path="/admin/addplace" element={<AddPlace/>}/>
          <Route path="/customer" element={<Home/>}/>
          <Route path="/hotels" element={<Link/>}/>
          <Route path="/hotels/:id" element={<Hotel/>}/>
          <Route path="/booking" element={<Booking/>}/>
          <Route path="/customer/signup" element={<CustomerSignup />}/>
          <Route path="/employee/signup" element={<EmployeeSignup />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}