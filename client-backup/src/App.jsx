import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./Components/Navbar/Navbar";
import Display from "./Pages/Display/Display";
import PetForm from "./Pages/PetForm/PetForm";
import ShowPet from "./Pages/ShowPet/ShowPet";
import Update from "./Pages/Update/Update";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />

        <main className="main-container">
          <Routes>
            <Route path="/" element={<Display />} />
            <Route path="/new" element={<PetForm />} />
            <Route path="/show/:id" element={<ShowPet />} />
            <Route path="/edit/:id" element={<Update />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;