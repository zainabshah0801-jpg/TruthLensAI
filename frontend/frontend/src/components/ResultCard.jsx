import "./ResultCard.css";

function ResultCard({ result }) {
  const score = Number(result?.score || 0);

  const isGenuine =
    result?.label === "Likely Genuine";

  const getScoreMessage = () => {
    if (score >= 80) {
      return "High model confidence";
    }

    if (score >= 60) {
      return "Moderate model confidence";
    }

    return "Low model confidence";
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


      {/* MAIN RESULT */}

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
              ? "The AI model found patterns that are more consistent with genuine news."
              : "The AI model found patterns that may be associated with unreliable or misleading content."}
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


      {/* ANALYSIS DETAILS */}

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


      {/* MESSAGE */}

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


      {/* MODEL INFORMATION */}

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


      {/* HOW TO INTERPRET */}

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

        <span>ⓘ</span>

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