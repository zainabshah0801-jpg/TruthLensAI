import { useState } from "react";
import NewsForm from "../components/NewsForm";
import ResultCard from "../components/ResultCard";
import "./Verify.css";

function Verify() {
  const [result, setResult] = useState(null);

  const handleResult = (data) => {
    setResult(data);

    setTimeout(() => {
      document
        .getElementById("verification-result")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
    }, 200);
  };

  const startNewAnalysis = () => {
    setResult(null);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="verify-page">

      {/* BACKGROUND EFFECTS */}
      <div className="verify-grid"></div>
      <div className="verify-glow verify-glow-one"></div>
      <div className="verify-glow verify-glow-two"></div>


      {/* HEADER */}
      <section className="verify-header">

        <div className="verify-status">
          <span></span>
          TRUTHLENS AI ENGINE
          <b>ONLINE</b>
        </div>

        <div className="verify-label">
          ✦ AI INFORMATION ANALYSIS
        </div>

        <h1>
          Verify the
          <span> Truth.</span>
        </h1>

        <p>
          Paste a news article, headline or social media
          post and let TruthLens AI analyze the information.
        </p>

      </section>


      {/* AI CORE VISUAL */}
      <div className="ai-core">

        <div className="core-ring core-ring-one"></div>
        <div className="core-ring core-ring-two"></div>
        <div className="core-ring core-ring-three"></div>

        <div className="core-center">
          <span>◉</span>
        </div>

        <div className="core-line line-one"></div>
        <div className="core-line line-two"></div>
        <div className="core-line line-three"></div>

      </div>


      {/* ANALYSIS AREA */}
      <section className="verification-workspace">

        <div className="workspace-top">

          <div>
            <span className="workspace-number">
              01
            </span>

            <div>
              <strong>INPUT INFORMATION</strong>
              <small>
                Give TruthLens something to analyze
              </small>
            </div>
          </div>

          <div className="workspace-live">
            <span></span>
            READY
          </div>

        </div>


        {/* IMPORTANT:
            This component contains your existing
            Flask/backend connection.
        */}
        <NewsForm onResult={handleResult} />


        {/* RESULT */}
        {result && (
          <div
            id="verification-result"
            className="verification-result"
          >

            <div className="result-heading">

              <div>
                <span className="workspace-number">
                  02
                </span>

                <div>
                  <strong>AI ANALYSIS</strong>

                  <small>
                    TruthLens has completed its analysis
                  </small>
                </div>
              </div>

              <div className="analysis-complete">
                ✓ ANALYSIS COMPLETE
              </div>

            </div>


            <div className="result-wrapper">

              <div className="result-scan-line"></div>

              <ResultCard result={result} />

            </div>


            <button
              className="new-analysis-button"
              onClick={startNewAnalysis}
            >
              <span>↻</span>
              Analyze Another
            </button>

          </div>
        )}

      </section>


      {/* INFORMATION STRIP */}
      <section className="verify-info">

        <div className="info-item">
          <span>01</span>
          <strong>SUBMIT</strong>
          <p>
            Enter the information you want to examine.
          </p>
        </div>

        <div className="info-connector">→</div>

        <div className="info-item">
          <span>02</span>
          <strong>ANALYZE</strong>
          <p>
            TruthLens processes the submitted content.
          </p>
        </div>

        <div className="info-connector">→</div>

        <div className="info-item">
          <span>03</span>
          <strong>UNDERSTAND</strong>
          <p>
            Review the AI-generated prediction.
          </p>
        </div>

      </section>

    </main>
  );
}

export default Verify;