function HowItWorks() {

  return (
    <main className="page">

      <div className="page-header">

        <span>HOW IT WORKS</span>

        <h1>
          From News to Truth.
        </h1>

        <p>
          Three simple steps to analyze information
          with TruthLens AI.
        </p>

      </div>

      <div className="steps">

        <div className="step-card">
          <div className="step-number">01</div>
          <div className="step-icon">📝</div>

          <h2>Paste</h2>

          <p>
            Enter a news article, headline or social
            media content into TruthLens AI.
          </p>
        </div>

        <div className="step-card">
          <div className="step-number">02</div>
          <div className="step-icon">🧠</div>

          <h2>Analyze</h2>

          <p>
            Our AI model processes the information
            and analyzes its content.
          </p>
        </div>

        <div className="step-card">
          <div className="step-number">03</div>
          <div className="step-icon">🛡️</div>

          <h2>Verify</h2>

          <p>
            Receive an AI prediction and confidence
            score to help evaluate the information.
          </p>
        </div>

      </div>

    </main>
  );
}

export default HowItWorks;