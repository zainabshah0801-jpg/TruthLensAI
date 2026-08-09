import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";

import Home from "./pages/Home";
import Verify from "./pages/Verify";
import HowItWorks from "./pages/HowItWorks";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";

import "./App.css";

function App() {

  const [showSplash, setShowSplash] = useState(true);

  return (
    <>

      {showSplash && (
        <SplashScreen
          onComplete={() => setShowSplash(false)}
        />
      )}

      <div className="app">

        <BrowserRouter>

          <Navbar />

          <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/verify" element={<Verify />} />

            <Route
              path="/how-it-works"
              element={<HowItWorks />}
            />

            <Route
              path="/features"
              element={<Features />}
            />

            <Route
              path="/about"
              element={<About />}
            />

            <Route
              path="/contact"
              element={<Contact />}
            />

          </Routes>

          <Footer />

        </BrowserRouter>

      </div>

    </>
  );
}

export default App;