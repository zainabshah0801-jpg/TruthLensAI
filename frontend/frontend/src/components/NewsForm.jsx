import { useState } from "react";
import "./NewsForm.css";

// Backend URL
// For local testing it uses Flask on port 5000.
// For Vercel deployment, VITE_API_URL will come from your .env file.
const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:5000";


function NewsForm({ onResult }) {

  const [text, setText] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);


  // ==========================================
  // EXAMPLE NEWS
  // ==========================================

  const examples = [
    "Scientists discover a new planet that may support life.",
    "Government announces a new technology initiative.",
    "Social media post claims a common food can cure every disease."
  ];


  // ==========================================
  // FILL EXAMPLE
  // ==========================================

  const fillExample = (example) => {

    setText(example);
    setError("");

  };


  // ==========================================
  // SUBMIT / VERIFY INFORMATION
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // ------------------------------
    // CHECK EMPTY INPUT
    // ------------------------------

    if (!text.trim()) {

      setError(
        "Please enter some news or information to analyze."
      );

      return;
    }


    setError("");
    setLoading(true);
    setProgress(15);


    let progressTimer;


    try {

      // ------------------------------
      // PROGRESS ANIMATION
      // ------------------------------

      progressTimer = setInterval(() => {

        setProgress((previous) => {

          if (previous >= 90) {

            clearInterval(progressTimer);

            return 90;
          }

          return previous + 10;

        });

      }, 250);


      // ------------------------------
      // SEND REQUEST TO FLASK
      // ------------------------------

      const response = await fetch(
        `${API_URL}/predict`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            text: text.trim(),

            source_url: sourceUrl.trim(),

          }),
        }
      );


      // Stop progress animation

      if (progressTimer) {
        clearInterval(progressTimer);
      }


      // ------------------------------
      // READ SERVER RESPONSE
      // ------------------------------

      let data;


      try {

        data = await response.json();

      } catch {

        throw new Error(
          "The TruthLens server returned an invalid response."
        );

      }


      // ------------------------------
      // SERVER ERROR
      // ------------------------------

      if (!response.ok) {

        throw new Error(
          data.error ||
          data.message ||
          "Server could not process the request."
        );

      }


      // ------------------------------
      // SUCCESS
      // ------------------------------

      setProgress(100);


      setTimeout(() => {

        onResult(data);

        setLoading(false);

        setProgress(0);

      }, 500);


    } catch (err) {

      // Stop progress animation

      if (progressTimer) {
        clearInterval(progressTimer);
      }


      console.error(
        "TruthLens API Error:",
        err
      );


      setLoading(false);

      setProgress(0);


      // ------------------------------
      // ERROR MESSAGE
      // ------------------------------

      if (
        err instanceof TypeError &&
        err.message.toLowerCase().includes("fetch")
      ) {

        setError(
          "Unable to connect to the TruthLens AI server. Please check that the backend is online."
        );

      } else {

        setError(
          err.message ||
          "Unable to connect to the TruthLens AI server."
        );

      }

    }

  };


  // ==========================================
  // COMPONENT UI
  // ==========================================

  return (

    <div className="news-form-container">

      <form
        className="verify-card"
        onSubmit={handleSubmit}
      >


        {/* ==================================
            HEADER
        ================================== */}

        <div className="form-card-header">

          <div className="form-icon">
            ◉
          </div>


          <div>

            <span className="form-label">
              TRUTHLENS AI
            </span>

            <h2>
              Submit Information
            </h2>

          </div>


          <div className="secure-badge">

            <span></span>

            SECURE ANALYSIS

          </div>

        </div>



        {/* ==================================
            DESCRIPTION
        ================================== */}

        <p className="form-description">

          Paste a news article, headline, social media post,
          or any information you want TruthLens AI to examine.

        </p>



        {/* ==================================
            NEWS TEXT
        ================================== */}

        <div className="input-section">

          <div className="input-label-row">

            <label>
              NEWS / INFORMATION
            </label>

            <span>
              {text.length} characters
            </span>

          </div>


          <div className="textarea-wrapper">

            <div className="textarea-topbar">

              <span>
                CONTENT INPUT
              </span>

              <span>
                AI READY
              </span>

            </div>


            <textarea

              value={text}

              onChange={(e) => {

                setText(e.target.value);

                setError("");

              }}

              placeholder="Paste a news article, headline or social media post..."

              disabled={loading}

            />


            {loading && (

              <div className="textarea-scan"></div>

            )}

          </div>

        </div>



        {/* ==================================
            EXAMPLES
        ================================== */}

        <div className="examples">

          <span>
            TRY AN EXAMPLE:
          </span>


          {examples.map((example, index) => (

            <button

              type="button"

              key={index}

              onClick={() => fillExample(example)}

              disabled={loading}

            >

              Example {index + 1}

            </button>

          ))}

        </div>



        {/* ==================================
            SOURCE URL
        ================================== */}

        <div className="source-section">

          <div className="input-label-row">

            <label>
              NEWS / INFORMATION SOURCE
            </label>

            <span>
              OPTIONAL
            </span>

          </div>


          <input

            type="url"

            value={sourceUrl}

            onChange={(e) => {

              setSourceUrl(e.target.value);

              setError("");

            }}

            placeholder="https://example.com/article"

            disabled={loading}

          />


          <p className="source-help">

            Add the original article or information source
            to let TruthLens verify the domain.

          </p>

        </div>



        {/* ==================================
            ERROR
        ================================== */}

        {error && (

          <div className="form-error">

            <span>
              !
            </span>

            <p>
              {error}
            </p>

          </div>

        )}



        {/* ==================================
            VERIFY BUTTON
        ================================== */}

        {!loading && (

          <button

            type="submit"

            className="verify-button"

          >

            <span className="button-icon">
              ✦
            </span>


            VERIFY INFORMATION


            <span className="button-arrow">
              →
            </span>

          </button>

        )}



        {/* ==================================
            ANALYSIS PANEL
        ================================== */}

        {loading && (

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

                TruthLens AI is analyzing...

              </div>


              <div className="analysis-subtitle">

                Processing information through the AI
                classification engine.

              </div>



              {/* PROGRESS BAR */}

              <div className="progress-track">

                <div

                  className="progress-bar"

                  style={{
                    width: `${progress}%`,
                  }}

                ></div>

              </div>



              {/* ANALYSIS STEPS */}

              <div className="analysis-steps">


                <div

                  className={`step ${
                    progress >= 20
                      ? "active"
                      : ""
                  }`}

                >

                  <span>
                    ✓
                  </span>

                  INPUT

                </div>



                <div

                  className={`step ${
                    progress >= 40
                      ? "active"
                      : ""
                  }`}

                >

                  <span>
                    ✓
                  </span>

                  ANALYZING

                </div>



                <div

                  className={`step ${
                    progress >= 70
                      ? "active"
                      : ""
                  }`}

                >

                  <span>
                    ✓
                  </span>

                  CLASSIFYING

                </div>



                <div

                  className={`step ${
                    progress >= 100
                      ? "active"
                      : ""
                  }`}

                >

                  <span>
                    ✓
                  </span>

                  COMPLETE

                </div>


              </div>

            </div>

          </div>

        )}



        {/* ==================================
            TRUST STRIP
        ================================== */}

        <div className="form-trust-strip">


          <div>

            <span>
              ◉
            </span>

            AI ANALYSIS

          </div>



          <div>

            <span>
              ◇
            </span>

            MODEL BASED

          </div>



          <div>

            <span>
              ⚡
            </span>

            FAST PROCESSING

          </div>



          <div>

            <span>
              ✓
            </span>

            PRIVACY AWARE

          </div>


        </div>


      </form>

    </div>

  );

}


export default NewsForm;