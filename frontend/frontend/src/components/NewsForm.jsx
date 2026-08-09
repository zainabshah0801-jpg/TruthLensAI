import { useEffect, useState } from "react";
import "./NewsForm.css";

function NewsForm({ onResult }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [analysisStep, setAnalysisStep] = useState(0);

  const analysisSteps = [
    "Initializing TruthLens AI",
    "Reading submitted content",
    "Analyzing information",
    "Generating AI prediction",
  ];

  useEffect(() => {
    if (!loading) {
      return;
    }

    const interval = setInterval(() => {
      setAnalysisStep((current) =>
        current < analysisSteps.length - 1
          ? current + 1
          : current
      );
    }, 900);

    return () => clearInterval(interval);
  }, [loading, analysisSteps.length]);

  const handleVerify = async () => {
    if (!text.trim()) {
      setError("Please enter some news text.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysisStep(0);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: text,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();

      console.log("AI RESULT:", data);

      setAnalysisStep(3);

      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      onResult(data);

    } catch (error) {
      console.error(error);

      setError(
        "Could not connect to the TruthLens AI backend."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleExample = (example) => {
    setText(example);
    setError("");
  };

  return (
    <div className="news-form-container">

      {/* INPUT CARD */}

      <div className="verify-card">

        <div className="form-card-header">

          <div className="form-icon">
            ◉
          </div>

          <div>
            <span className="form-label">
              TRUTHLENS INPUT
            </span>

            <h2>
              What do you want to verify?
            </h2>
          </div>

          <div className="secure-badge">
            <span></span>
            SECURE
          </div>

        </div>


        <p className="form-description">
          Paste a headline, article or social media
          claim below. TruthLens AI will analyze the
          submitted content.
        </p>


        {/* TEXT AREA */}

        <div
          className={`textarea-wrapper ${
            loading ? "is-loading" : ""
          }`}
        >

          <div className="textarea-topbar">

            <span>
              NEWS / CLAIM
            </span>

            <span>
              {text.length} / 2000
            </span>

          </div>

          <textarea
            value={text}
            maxLength={2000}
            disabled={loading}
            onChange={(e) => {
              setText(e.target.value);
              setError("");
            }}
            placeholder="Paste the information you want TruthLens AI to analyze..."
          />

          {loading && (
            <div className="textarea-scan"></div>
          )}

        </div>


        {/* EXAMPLES */}

        {!loading && (
          <div className="examples">

            <span>TRY AN EXAMPLE</span>

            <button
              type="button"
              onClick={() =>
                handleExample(
                  "Scientists announce a new breakthrough that could improve renewable energy technology."
                )
              }
            >
              Example claim
            </button>

            <button
              type="button"
              onClick={() =>
                handleExample(
                  "A viral social media post claims that drinking a certain beverage can instantly cure every disease."
                )
              }
            >
              Viral claim
            </button>

          </div>
        )}


        {/* ERROR */}

        {error && (
          <div className="form-error">
            <span>!</span>
            {error}
          </div>
        )}


        {/* BUTTON / ANALYSIS */}

        {!loading ? (

          <button
            type="button"
            className="verify-button"
            onClick={handleVerify}
          >
            <span className="button-icon">
              ✦
            </span>

            Analyze with TruthLens AI

            <span className="button-arrow">
              →
            </span>
          </button>

        ) : (

          <div className="analysis-panel">

            <div className="analysis-orb">

              <div className="analysis-ring ring-one"></div>

              <div className="analysis-ring ring-two"></div>

              <div className="analysis-core">
                ◉
              </div>

            </div>


            <div className="analysis-info">

              <div className="analysis-title">
                {analysisSteps[analysisStep]}
              </div>

              <div className="analysis-subtitle">
                TruthLens AI is processing your submission
              </div>


              <div className="progress-track">

                <div
                  className="progress-bar"
                  style={{
                    width: `${
                      ((analysisStep + 1) /
                        analysisSteps.length) *
                      100
                    }%`,
                  }}
                ></div>

              </div>


              <div className="analysis-steps">

                {analysisSteps.map(
                  (step, index) => (

                    <div
                      key={step}
                      className={
                        index <= analysisStep
                          ? "step active"
                          : "step"
                      }
                    >

                      <span>
                        {index < analysisStep
                          ? "✓"
                          : index === analysisStep
                          ? "●"
                          : "○"}
                      </span>

                      {step}

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

        )}

      </div>


      {/* TRUST STRIP */}

      <div className="form-trust-strip">

        <div>
          <span>◉</span>
          AI-POWERED
        </div>

        <div>
          <span>⚡</span>
          FAST ANALYSIS
        </div>

        <div>
          <span>◇</span>
          INTELLIGENT RESULTS
        </div>

        <div>
          <span>🔒</span>
          YOUR INPUT STAYS PRIVATE
        </div>

      </div>

    </div>
  );
}

export default NewsForm;