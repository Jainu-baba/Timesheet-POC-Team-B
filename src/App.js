import "./App.css";
import Home from "./Components/Home/Home";
import Manager from "./Components/Manager/Manager";
import Employee from "./Components/Employee/Employee";
import Details from "./Components/TimesheetDetails/Details";
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/employee" element={<Employee/>} />
        <Route path="/manager" element={<Manager/>} />
        <Route path="/" exact element={<Home/>} />
        <Route path="/details"  element={<Details/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
