import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import AboutUs from "./pages/AboutUs";
import LaborAdjustment from "./pages/LaborAdjustment";
import Team from "./pages/Team";   



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/labor-adjustment" element={<LaborAdjustment />} />
       


        
        <Route path="/team" element={<Team />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
