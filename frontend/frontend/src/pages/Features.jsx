function Features() {

  const features = [
    {
      icon: "🧠",
      title: "AI-Powered Analysis",
      text: "Analyze news content using an artificial intelligence model."
    },
    {
      icon: "🔎",
      title: "Content Detection",
      text: "Examine the submitted information and identify potentially misleading content."
    },
    {
      icon: "📊",
      title: "Confidence Score",
      text: "Get a score representing the model's confidence in its prediction."
    },
    {
      icon: "⚡",
      title: "Fast Results",
      text: "Receive an AI-generated result within seconds."
    },
    {
      icon: "🛡️",
      title: "Simple Interface",
      text: "A clean interface designed to make verification easy."
    },
    {
      icon: "🌐",
      title: "Built for the Web",
      text: "Access TruthLens AI through a modern web application."
    }
  ];

  return (
    <main className="page">

      <div className="page-header">

        <span>FEATURES</span>

        <h1>
          Intelligence Behind the Lens.
        </h1>

        <p>
          Tools designed to help users evaluate
          information more intelligently.
        </p>

      </div>

      <div className="features-grid">

        {features.map((feature, index) => (

          <div className="feature-card" key={index}>

            <div className="feature-icon">
              {feature.icon}
            </div>

            <h2>{feature.title}</h2>

            <p>{feature.text}</p>

          </div>

        ))}

      </div>

    </main>
  );
}

export default Features;