import { useEffect, useState } from "react";
import "./SplashScreen.css";

function SplashScreen({ onComplete }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 2600);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3300);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`splash-screen ${exiting ? "splash-exit" : ""}`}>

      {/* Background grid */}

      <div className="splash-grid"></div>

      {/* Ambient glow */}

      <div className="splash-glow splash-glow-one"></div>
      <div className="splash-glow splash-glow-two"></div>


      {/* Main logo */}

      <div className="splash-content">

        <div className="splash-logo">

          <div className="logo-ring ring-one"></div>
          <div className="logo-ring ring-two"></div>

          <div className="logo-core">
            ◉
          </div>

        </div>


        <div className="splash-brand">

          <span className="splash-mini">
            INTELLIGENCE • INTEGRITY • INSIGHT
          </span>

          <h1>
            Truth<span>Lens</span>
            <small>AI</small>
          </h1>

          <p>
            Seeing beyond the headline.
          </p>

        </div>


        {/* Loading indicator */}

        <div className="splash-loader">

          <div className="loader-track">
            <div className="loader-progress"></div>
          </div>

          <div className="loader-text">
            <span>INITIALIZING TRUTHLENS AI</span>
            <span>100%</span>
          </div>

        </div>

      </div>


      {/* Bottom text */}

      <div className="splash-footer">
        <span>TECHNO WARRIORS</span>
        <span>•</span>
        <span>AALIM MUHAMMED SALEGH COLLEGE OF ENGINEERING</span>
      </div>

    </div>
  );
}

export default SplashScreen;