import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddEmployeePage from './pages/AddEmployeePage';
import EditEmployeePage from './pages/EditEmployeePage';
import ViewEmployeePage from './pages/ViewEmployeePage';
import './App.css'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/add" element={<AddEmployeePage />} />
        <Route path="/edit/:id" element={<EditEmployeePage />}  />
        <Route path="/view" element={<ViewEmployeePage />} />
        <Route path="/" element={<ViewEmployeePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
