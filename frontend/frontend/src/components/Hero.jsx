function Hero() {
  return (
    <section className="hero">

      <div className="hero-glow glow-one"></div>
      <div className="hero-glow glow-two"></div>

      <div className="particles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="hero-content">

        <div className="ai-badge">
          <span className="pulse-dot"></span>
          AI-POWERED TRUTH DETECTION
        </div>

        <h1 className="hero-title">
          <span>Truth</span><span className="lens">Lens</span>
          <span className="ai-text"> AI</span>
        </h1>

        <h2 className="hero-subtitle">
          Don't just read it.
          <br />
          <span>Verify it.</span>
        </h2>

        <p className="hero-description">
          Detect misleading information, analyze credibility,
          and uncover the truth with the power of Artificial Intelligence.
        </p>

        <div className="hero-buttons">
          <a href="#verify" className="primary-btn">
            Verify News
            <span>→</span>
          </a>

          <a href="#how-it-works" className="secondary-btn">
            How it works
          </a>
        </div>

        <div className="hero-stats">
          <div>
            <strong>AI</strong>
            <span>Powered</span>
          </div>

          <div>
            <strong>24/7</strong>
            <span>Detection</span>
          </div>

          <div>
            <strong>⚡</strong>
            <span>Instant Analysis</span>
          </div>
        </div>

      </div>

      <div className="scroll-indicator">
        <span></span>
        SCROLL TO VERIFY
      </div>

    </section>
  );
}

export default Hero;