import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./view/Home";
import CreateExp from "./view/CreateExp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/Exp" element={<CreateExp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
