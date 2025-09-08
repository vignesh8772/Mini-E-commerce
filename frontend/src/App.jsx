import "./App.css";
import Home from "./Home";
import Header from "./components/pages/Header";
import Footer from "./components/pages/Footer";
import Productdetails from "./components/pages/productdetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Cart from "./components/pages/cart";

function App() {
  const [nocart, setnocart] = useState([]);
  return (
    <Router>
      <ToastContainer position="top-center" />
      <Header nocart={nocart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Home />} />
        <Route
          path="/product/:id"
          element={<Productdetails nocart={nocart} setno={setnocart} />}
        />
        <Route
          path="/Cart"
          element={<Cart nocart={nocart} setno={setnocart} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
