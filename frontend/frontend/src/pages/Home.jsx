import "./Home.css";

function Home() {
  const scrollToExplore = () => {
    document
      .getElementById("home-explore")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="home-page">

      {/* ================= HERO ================= */}

      <section className="home-hero">

        <div className="hero-grid"></div>

        <div className="hero-glow hero-glow-one"></div>
        <div className="hero-glow hero-glow-two"></div>

        <div className="hero-orb orb-one"></div>
        <div className="hero-orb orb-two"></div>


        {/* Floating AI Nodes */}

        <div className="ai-node node-one">
          <span></span>
          AI ENGINE
        </div>

        <div className="ai-node node-two">
          <span></span>
          DATA
        </div>

        <div className="ai-node node-three">
          <span></span>
          VERIFY
        </div>

        <div className="ai-node node-four">
          <span></span>
          INSIGHT
        </div>


        {/* Status */}

        <div className="hero-status">
          <span className="status-dot"></span>
          TRUTHLENS AI ENGINE — ONLINE
        </div>


        {/* Eyebrow */}

        <div className="hero-eyebrow">
          <span>✦</span>
          AI-POWERED INFORMATION INTELLIGENCE
        </div>


        {/* Main Title */}

        <h1 className="massive-title">

          <span className="title-main">
            TRUTHLENS
          </span>

          <span className="title-ai">
            AI
          </span>

        </h1>


        {/* Slogan */}

        <h2 className="hero-slogan">
          See Beyond the <span>Headline.</span>
        </h2>


        <p className="hero-description">
          Analyze information, question what you see,
          and make more informed decisions with
          AI-powered content analysis.
        </p>


        {/* Buttons */}

        <div className="hero-actions">

          <a
            href="/verify"
            className="hero-main-button"
          >
            <span>✦</span>
            Verify Information
            <b>→</b>
          </a>

          <button
            className="hero-explore-button"
            onClick={scrollToExplore}
          >
            Explore TruthLens
            <span>↓</span>
          </button>

        </div>


        {/* Capabilities */}

        <div className="hero-capabilities">

          <div className="capability">

            <span className="capability-icon">
              ◉
            </span>

            <div>
              <strong>
                AI ANALYSIS
              </strong>

              <small>
                Intelligent processing
              </small>
            </div>

          </div>


          <div className="capability-divider"></div>


          <div className="capability">

            <span className="capability-icon">
              ⚡
            </span>

            <div>
              <strong>
                FAST RESULTS
              </strong>

              <small>
                Analysis in seconds
              </small>
            </div>

          </div>


          <div className="capability-divider"></div>


          <div className="capability">

            <span className="capability-icon">
              ◈
            </span>

            <div>
              <strong>
                SMART INSIGHTS
              </strong>

              <small>
                Understand the result
              </small>
            </div>

          </div>

        </div>


        {/* Scroll */}

        <button
          className="hero-scroll"
          onClick={scrollToExplore}
        >
          <span></span>
          SCROLL TO EXPLORE
        </button>

      </section>


      {/* ================= EXPLORE ================= */}

      <section
        className="home-explore"
        id="home-explore"
      >

        <div className="explore-heading">

          <div className="section-label">
            THE TRUTHLENS EXPERIENCE
          </div>

          <h2>
            Information deserves
            <span> a second look.</span>
          </h2>

          <p>
            TruthLens AI is designed to help you
            examine information instead of simply
            accepting it at face value.
          </p>

        </div>


        <div className="experience-grid">


          {/* CARD 01 */}

          <a
            href="/verify"
            className="experience-card large-card"
          >

            <div className="card-number">
              01
            </div>

            <div className="card-glow"></div>

            <div className="experience-icon">
              ◉
            </div>

            <div className="experience-content">

              <span>
                ANALYZE
              </span>

              <h3>
                Look beyond
                <br />
                the headline.
              </h3>

              <p>
                Submit information and let the
                TruthLens AI engine examine it.
              </p>

              <div className="card-link">
                Start analyzing
                <span>→</span>
              </div>

            </div>

          </a>


          {/* CARD 02 */}

          <div className="experience-card">

            <div className="card-number">
              02
            </div>

            <div className="experience-icon blue">
              ✦
            </div>

            <span>
              UNDERSTAND
            </span>

            <h3>
              Turn information
              <br />
              into insight.
            </h3>

            <p>
              Explore the AI analysis and
              understand what the model predicts.
            </p>

            <div className="card-decoration">
              <i></i>
              <i></i>
              <i></i>
              <i></i>
            </div>

          </div>


          {/* CARD 03 */}

          <div className="experience-card">

            <div className="card-number">
              03
            </div>

            <div className="experience-icon purple">
              ◈
            </div>

            <span>
              THINK
            </span>

            <h3>
              Question.
              <br />
              Verify.
              <br />
              Decide.
            </h3>

            <p>
              Use AI-assisted analysis as another
              perspective when evaluating information.
            </p>

            <div className="card-decoration orbit">
              <i></i>
            </div>

          </div>

        </div>


        {/* Mini stats */}

        <div className="home-stats">

          <div>
            <strong>AI</strong>
            <span>POWERED ENGINE</span>
          </div>

          <div>
            <strong>24/7</strong>
            <span>AVAILABLE</span>
          </div>

          <div>
            <strong>01</strong>
            <span>MISSION — INFORM</span>
          </div>

          <div>
            <strong>∞</strong>
            <span>QUESTIONS WORTH ASKING</span>
          </div>

        </div>

      </section>


      {/* ================= FINAL CTA ================= */}

      <section className="home-final">

        <div className="final-grid"></div>

        <div className="final-glow"></div>

        <div className="section-label">
          READY TO TAKE A CLOSER LOOK?
        </div>

        <h2>
          Don't just read it.
          <br />
          <span>Verify it.</span>
        </h2>

        <p>
          One claim. One analysis.
          A smarter way to question information.
        </p>

        <a
          href="/verify"
          className="final-button"
        >
          <span>✦</span>
          Open TruthLens AI
          <b>→</b>
        </a>

      </section>

    </main>
  );
}

export default Home;