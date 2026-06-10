import { Link } from "react-router-dom";

export default function LandingPage() {
  const features = [
    {
      icon: "📚",
      title: "Structured Materials",
      description:
        "Access learning materials by subject, difficulty, duration, and study goals in one organized dashboard.",
    },
    {
      icon: "✅",
      title: "Progress Tracking",
      description:
        "Mark materials as completed, reset progress, and keep track of your learning journey.",
    },
    {
      icon: "✨",
      title: "AI Study Assistant",
      description:
        "Ask questions and get simple explanations based on available learning materials.",
    },
  ];

  const steps = [
    "Create a student account",
    "Login to your dashboard",
    "Explore learning materials",
    "Track progress and ask AI for help",
  ];

  return (
    <main className="landing-page">
      <nav className="landing-navbar">
        <Link to="/" className="landing-brand">
          <span className="landing-logo">LS</span>
          <span>Learning Support</span>
        </Link>

        <div className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#workflow">Workflow</a>
          <a href="#tech">Tech Stack</a>
          <Link to="/login" className="landing-nav-button">
            Login
          </Link>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero-content">
          <div className="landing-badge">Learning Support Platform</div>

          <h1>Study smarter with structured materials and AI support.</h1>

          <p>
            A fullstack learning platform that helps students access organized
            materials, track study progress, and ask questions through an AI
            Study Assistant.
          </p>

          <div className="landing-actions">
            <Link to="/register" className="landing-primary-button">
              Get Started
            </Link>

            <Link to="/login" className="landing-secondary-button">
              Login
            </Link>
          </div>

          <div className="landing-mini-stats">
            <div>
              <strong>JWT</strong>
              <span>Authentication</span>
            </div>

            <div>
              <strong>AI</strong>
              <span>Study Assistant</span>
            </div>

            <div>
              <strong>MongoDB</strong>
              <span>Progress Data</span>
            </div>
          </div>
        </div>

        <div className="landing-preview-wrapper">
          <div className="landing-preview-card">
            <div className="preview-header">
              <div>
                <span>Student Dashboard</span>
                <h3>Welcome back 👋</h3>
              </div>

              <div className="preview-status">Active</div>
            </div>

            <div className="preview-progress-card">
              <div className="preview-progress-text">
                <span>Learning Progress</span>
                <strong>72%</strong>
              </div>

              <div className="preview-progress-track">
                <div className="preview-progress-fill" />
              </div>
            </div>

            <div className="preview-material-list">
              <div className="preview-material-item">
                <div className="preview-icon">📐</div>
                <div>
                  <strong>Mathematics</strong>
                  <p>Algebra and equations</p>
                </div>
              </div>

              <div className="preview-material-item">
                <div className="preview-icon">🧪</div>
                <div>
                  <strong>Chemistry</strong>
                  <p>Basic chemical reactions</p>
                </div>
              </div>

              <div className="preview-material-item">
                <div className="preview-icon">🤖</div>
                <div>
                  <strong>AI Assistant</strong>
                  <p>Explain this material simply</p>
                </div>
              </div>
            </div>
          </div>

          <div className="landing-floating-card floating-card-one">
            <strong>12+</strong>
            <span>Learning Materials</span>
          </div>

          <div className="landing-floating-card floating-card-two">
            <strong>Synced</strong>
            <span>User Progress</span>
          </div>
        </div>
      </section>

      <section className="landing-section" id="features">
        <div className="landing-section-heading">
          <span>Core Features</span>
          <h2>Everything students need in one learning dashboard.</h2>
          <p>
            The platform combines learning materials, authentication, progress
            tracking, and AI assistance in a simple user experience.
          </p>
        </div>

        <div className="landing-feature-grid">
          {features.map((feature) => (
            <article className="landing-feature-card" key={feature.title}>
              <div className="landing-feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section" id="workflow">
        <div className="landing-workflow-card">
          <div className="landing-workflow-content">
            <span>How It Works</span>
            <h2>Simple flow from login to learning progress.</h2>
            <p>
              Students can quickly start learning, continue from their progress,
              and use AI support when they need extra explanation.
            </p>
          </div>

          <div className="landing-workflow-list">
            {steps.map((step, index) => (
              <div className="landing-workflow-item" key={step}>
                <div>{index + 1}</div>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section" id="tech">
        <div className="landing-section-heading">
          <span>Tech Stack</span>
          <h2>Built as a fullstack portfolio project.</h2>
        </div>

        <div className="landing-tech-grid">
          <span>React</span>
          <span>Vite</span>
          <span>Express.js</span>
          <span>MongoDB</span>
          <span>JWT</span>
          <span>OpenAI API</span>
          <span>Vercel</span>
        </div>
      </section>

      <section className="landing-cta">
        <h2>Ready to start learning?</h2>
        <p>
          Create an account and explore structured learning materials from your
          personal dashboard.
        </p>

        <div className="landing-actions landing-center-actions">
          <Link to="/register" className="landing-primary-button">
            Create Account
          </Link>

          <Link to="/login" className="landing-secondary-button">
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}
