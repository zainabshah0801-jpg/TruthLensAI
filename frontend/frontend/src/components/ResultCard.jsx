import "./ResultCard.css";

function ResultCard({ result }) {
  const score = Number(result?.score || 0);

  const isGenuine = result?.label === "Likely Genuine";

  const getScoreMessage = () => {
    if (score >= 80) return "High model confidence";
    if (score >= 60) return "Moderate model confidence";
    return "Low model confidence";
  };

  const getReliabilityLevel = () => {
    if (score >= 80) return "HIGH";
    if (score >= 60) return "MODERATE";
    return "LOW";
  };

  const getSignalMessage = () => {
    if (isGenuine) {
      return "The model detected patterns more consistent with genuine information.";
    }

    return "The model detected patterns that may be associated with unreliable information.";
  };

  return (
    <div className="result-card">

      {/* HEADER */}
      <div className="result-card-header">

        <div className="result-title">

          <div className="result-icon">
            {isGenuine ? "✓" : "!"}
          </div>

          <div>
            <span className="result-label">
              TRUTHLENS AI
            </span>

            <h2>
              Analysis Complete
            </h2>
          </div>

        </div>

        <div className="result-status">
          <span></span>
          COMPLETE
        </div>

      </div>


      {/* MAIN PREDICTION */}
      <div
        className={`prediction-section ${
          isGenuine ? "genuine" : "fake"
        }`}
      >

        <div className="prediction-orb">

          <div className="prediction-ring ring-a"></div>

          <div className="prediction-ring ring-b"></div>

          <div className="prediction-core">
            {isGenuine ? "✓" : "!"}
          </div>

        </div>


        <div className="prediction-content">

          <span className="prediction-small">
            AI CLASSIFICATION
          </span>

          <h3>
            {result?.label || "Unknown"}
          </h3>

          <p>
            {isGenuine
              ? "The AI model found patterns that are more consistent with genuine information."
              : "The AI model found patterns that may be associated with unreliable or misleading information."}
          </p>

        </div>

      </div>


      {/* CONFIDENCE */}
      <div className="confidence-section">

        <div className="confidence-header">

          <div>

            <span>
              MODEL CONFIDENCE
            </span>

            <strong>
              {getScoreMessage()}
            </strong>

          </div>

          <div className="confidence-number">
            {score.toFixed(1)}%
          </div>

        </div>


        <div className="confidence-track">

          <div
            className="confidence-fill"
            style={{
              width: `${Math.min(score, 100)}%`,
            }}
          ></div>

          <div
            className="confidence-marker"
            style={{
              left: `${Math.min(score, 100)}%`,
            }}
          ></div>

        </div>


        <div className="confidence-scale">
          <span>0</span>
          <span>25</span>
          <span>50</span>
          <span>75</span>
          <span>100</span>
        </div>

      </div>


      {/* AI ANALYSIS BREAKDOWN */}
      <div className="analysis-breakdown">

        <div className="breakdown-header">

          <div>

            <span className="breakdown-label">
              AI ANALYSIS
            </span>

            <h3>
              What did TruthLens find?
            </h3>

          </div>

          <div className="breakdown-badge">
            AI ENGINE
          </div>

        </div>


        {/* SIGNAL 1 */}
        <div className="analysis-signal">

          <div className="signal-icon genuine-icon">
            ◉
          </div>

          <div className="signal-content">

            <div className="signal-top">

              <div className="signal-name">
                <strong>
                  Classification Signal
                </strong>

                <small>
                  AI classification result
                </small>
              </div>

              <div
                className={`signal-result ${
                  isGenuine ? "signal-genuine" : "signal-risk"
                }`}
              >
                <span className="signal-dot"></span>

                {isGenuine
                  ? "GENUINE PATTERN"
                  : "RISK SIGNAL"}
              </div>

            </div>

            <p>
              {getSignalMessage()}
            </p>

          </div>

        </div>


        {/* SIGNAL 2 */}
        <div className="analysis-signal">

          <div className="signal-icon confidence-icon">
            ◇
          </div>

          <div className="signal-content">

            <div className="signal-top">

              <div className="signal-name">
                <strong>
                  Model Confidence
                </strong>

                <small>
                  Prediction reliability
                </small>
              </div>

              <div className="signal-result signal-confidence">
                <span className="signal-dot"></span>

                {getReliabilityLevel()}
              </div>

            </div>

            <p>
              The model assigned a confidence score of{" "}
              <strong className="inline-score">
                {score.toFixed(1)}%
              </strong>{" "}
              to its prediction.
            </p>

          </div>

        </div>


        {/* SIGNAL 3 */}
        <div className="analysis-signal">

          <div className="signal-icon processing-icon">
            ⚡
          </div>

          <div className="signal-content">

            <div className="signal-top">

              <div className="signal-name">
                <strong>
                  AI Processing
                </strong>

                <small>
                  Analysis engine status
                </small>
              </div>

              <div className="signal-result signal-complete">
                <span className="signal-dot"></span>
                COMPLETE
              </div>

            </div>

            <p>
              The submitted content was processed
              through the TruthLens AI classification
              engine.
            </p>

          </div>

        </div>

      </div>


      {/* RESULT DETAILS */}
      <div className="result-details">

        <div className="detail-box">

          <span className="detail-icon">
            ◉
          </span>

          <div>

            <small>
              CLASSIFICATION
            </small>

            <strong>
              {result?.label || "Unknown"}
            </strong>

          </div>

        </div>


        <div className="detail-box">

          <span className="detail-icon">
            ⚡
          </span>

          <div>

            <small>
              CONFIDENCE
            </small>

            <strong>
              {score.toFixed(1)}%
            </strong>

          </div>

        </div>


        <div className="detail-box">

          <span className="detail-icon">
            ◇
          </span>

          <div>

            <small>
              ENGINE
            </small>

            <strong>
              AI ACTIVE
            </strong>

          </div>

        </div>

      </div>


      {/* SYSTEM MESSAGE */}
      {result?.message && (
        <div className="result-message">

          <span>✦</span>

          <div>

            <small>
              SYSTEM MESSAGE
            </small>

            <p>
              {result.message}
            </p>

          </div>

        </div>
      )}


      {/* MODEL OUTPUT */}
      {result?.model_label && (
        <div className="model-information">

          <span>
            MODEL OUTPUT
          </span>

          <strong>
            {result.model_label}
          </strong>

        </div>
      )}


      {/* INTERPRETATION */}
      <div className="interpretation-box">

        <div className="interpretation-icon">
          ⓘ
        </div>

        <div>

          <span>
            HOW TO INTERPRET THIS RESULT
          </span>

          <p>
            A higher confidence score means the AI
            model is more confident in its
            classification. It does not mean that
            the percentage represents the probability
            that the news is factually true.
          </p>

        </div>

      </div>


      {/* DISCLAIMER */}
      <div className="result-disclaimer">

        <span>
          ⓘ
        </span>

        <p>
          TruthLens AI provides an AI-assisted
          prediction, not a definitive fact-check.
          The confidence score represents the
          model's confidence in its classification
          and does not guarantee that the information
          is true or false. Always verify important
          information using reliable sources.
        </p>

      </div>

    </div>
  );
}

export default ResultCard;