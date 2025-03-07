import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Store from "./pages/Store";
import Navbar from "./Components/Navbar";
import Sku from "./pages/Sku";
import Planning from "./pages/Planning";
import Charts from "./pages/Charts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Store />} />

          <Route path="/sku" element={<Sku />} />
          <Route path="/planning" element={<Planning />} />
          <Route path="/charts" element={<Charts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
