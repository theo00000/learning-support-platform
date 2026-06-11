import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  const [showBottomNav, setShowBottomNav] = useState(false);

  useEffect(() => {
    const handleBottomNav = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const isNearBottom = scrollTop + windowHeight >= documentHeight - 260;

      setShowBottomNav(isNearBottom);
    };

    handleBottomNav();

    window.addEventListener("scroll", handleBottomNav, { passive: true });
    window.addEventListener("resize", handleBottomNav);

    return () => {
      window.removeEventListener("scroll", handleBottomNav);
      window.removeEventListener("resize", handleBottomNav);
    };
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll(
      [
        ".lp-badge",
        ".lp-hero-content h1",
        ".lp-hero-content p",
        ".lp-hero-actions",
        ".lp-trust-row",
        ".lp-dashboard-mockup",
        ".lp-floating-card",
        ".lp-section-heading",
        ".lp-feature-card",
        ".lp-overview-card",
        ".lp-info-main",
        ".lp-info-card",
        ".lp-showcase-card",
        ".lp-workflow-item",
        ".lp-cta",
      ].join(", "),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16,
        rootMargin: "0px 0px -70px 0px",
      },
    );

    revealElements.forEach((element, index) => {
      element.classList.add("lp-scroll-reveal");
      element.style.setProperty(
        "--reveal-delay",
        `${Math.min(index * 35, 260)}ms`,
      );
      observer.observe(element);
    });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const move = Math.min(scrollY * 0.045, 34);
      const scale = 1 + Math.min(scrollY * 0.00005, 0.025);

      document.documentElement.style.setProperty(
        "--lp-parallax-y",
        `${move}px`,
      );
      document.documentElement.style.setProperty(
        "--lp-parallax-scale",
        `${scale}`,
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const features = [
    {
      icon: "📚",
      title: "Structured Materials",
      description:
        "Students can access learning materials based on subject, difficulty, duration, and study goals.",
    },
    {
      icon: "✅",
      title: "Progress Tracking",
      description:
        "Each completed material is tracked per student so learning progress can be continued anytime.",
    },
    {
      icon: "✨",
      title: "AI Study Assistant",
      description:
        "Students can ask questions and receive simpler explanations based on available learning materials.",
    },
  ];

  const workflows = [
    "Create a student account",
    "Login to the dashboard",
    "Explore learning materials",
    "Track progress and ask AI",
  ];

  const platformDetails = [
    {
      label: "For Students",
      title: "A focused learning dashboard",
      description:
        "Students can browse materials, open detailed content, filter by subject, and monitor which materials have been completed.",
    },
    {
      label: "For Learning Flow",
      title: "Progress-based study experience",
      description:
        "The platform helps students continue learning from their progress instead of starting over or losing track of completed materials.",
    },
    {
      label: "For Study Support",
      title: "AI assistance with material context",
      description:
        "The AI Study Assistant uses existing learning material data as context, making answers more relevant to the student’s study content.",
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <main className="lp-page">
      <nav className="lp-navbar">
        <Link to="/" className="lp-brand">
          <span className="lp-brand-logo">LS</span>
          <span className="lp-brand-text">Learning Support</span>
        </Link>

        <div className="lp-nav-links">
          <a href="#features">Features</a>
          <a href="#overview">Overview</a>
          <a href="#workflow">Workflow</a>
        </div>

        <div className="lp-nav-actions">
          <Link to="/login" className="lp-login-link">
            Login
          </Link>
          <Link to="/register" className="lp-nav-cta">
            Get Started
          </Link>
        </div>
      </nav>

      <section className="lp-hero">
        <div className="lp-hero-content">
          <div className="lp-badge">
            <span>✨</span>
            Learning Support Platform
          </div>

          <h1>Study smarter with structured materials and AI support.</h1>

          <p>
            A fullstack learning platform that helps students access organized
            learning materials, track study progress, and ask questions through
            an AI Study Assistant.
          </p>

          <div className="lp-hero-actions">
            <Link to="/register" className="lp-primary-button">
              Start Learning
            </Link>

            <Link to="/login" className="lp-secondary-button">
              Login to Dashboard
            </Link>
          </div>

          <div className="lp-trust-row">
            <div>
              <strong>Personal</strong>
              <span>User progress</span>
            </div>
            <div>
              <strong>Simple</strong>
              <span>Study dashboard</span>
            </div>
            <div>
              <strong>Helpful</strong>
              <span>AI explanation</span>
            </div>
          </div>
        </div>

        <div className="lp-hero-visual">
          <div className="lp-dashboard-mockup">
            <div className="lp-mockup-top">
              <div>
                <span>Student Dashboard</span>
                <h3>Hi, Student 👋</h3>
              </div>

              <div className="lp-status-pill">Active</div>
            </div>

            <div className="lp-progress-card">
              <div className="lp-progress-text">
                <span>Learning Progress</span>
                <strong>72%</strong>
              </div>
              <div className="lp-progress-track">
                <div className="lp-progress-fill" />
              </div>
            </div>

            <div className="lp-material-list">
              <div className="lp-material-item">
                <span>📐</span>
                <div>
                  <strong>Mathematics</strong>
                  <p>Algebra and equations</p>
                </div>
              </div>

              <div className="lp-material-item">
                <span>🧪</span>
                <div>
                  <strong>Chemistry</strong>
                  <p>Basic chemical reactions</p>
                </div>
              </div>

              <div className="lp-material-item">
                <span>🤖</span>
                <div>
                  <strong>AI Assistant</strong>
                  <p>Explain this material simply</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lp-floating-card lp-floating-one">
            <strong>12+</strong>
            <span>Materials</span>
          </div>

          <div className="lp-floating-card lp-floating-two">
            <strong>Synced</strong>
            <span>User Progress</span>
          </div>
        </div>
      </section>

      <section className="lp-section" id="features">
        <div className="lp-section-heading">
          <span>Core Features</span>
          <h2>Everything students need in one learning dashboard.</h2>
          <p>
            Learning Support Platform combines material access, authentication,
            progress tracking, and AI assistance in one simple experience.
          </p>
        </div>

        <div className="lp-feature-grid">
          {features.map((feature) => (
            <article className="lp-feature-card" key={feature.title}>
              <div className="lp-feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="lp-overview-section" id="overview">
        <div className="lp-overview-card">
          <div className="lp-overview-content">
            <span>Platform Overview</span>
            <h2>
              Built to make study sessions more organized and easier to
              continue.
            </h2>
            <p>
              Learning Support Platform is designed for students who need a
              centralized place to access study materials, understand content
              more easily, and keep track of what they have completed.
            </p>
          </div>

          <div className="lp-overview-list">
            {platformDetails.map((item) => (
              <article className="lp-overview-item" key={item.title}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-info-section">
        <div className="lp-info-grid">
          <div className="lp-info-main">
            <span>Learning Experience</span>
            <h2>From finding material to finishing progress.</h2>
            <p>
              The platform does not only display learning content. It also helps
              students build a clearer study flow by connecting materials,
              completion status, and AI explanations into one dashboard.
            </p>
          </div>

          <div className="lp-info-card">
            <strong>01</strong>
            <h3>Browse</h3>
            <p>
              Students search and filter materials based on subject and topic.
            </p>
          </div>

          <div className="lp-info-card">
            <strong>02</strong>
            <h3>Learn</h3>
            <p>
              Students open material details and read structured explanations.
            </p>
          </div>

          <div className="lp-info-card">
            <strong>03</strong>
            <h3>Complete</h3>
            <p>
              Students mark materials as completed to update their progress.
            </p>
          </div>

          <div className="lp-info-card">
            <strong>04</strong>
            <h3>Ask AI</h3>
            <p>Students ask questions when they need simpler study guidance.</p>
          </div>
        </div>
      </section>

      <section className="lp-showcase-section">
        <div className="lp-showcase-card">
          <div className="lp-showcase-content">
            <span>Why It Matters</span>
            <h2>Designed for students who need simple and focused learning.</h2>
            <p>
              Instead of switching between many learning sources, students can
              use one platform to find materials, continue progress, and ask AI
              for study help when needed.
            </p>
          </div>

          <div className="lp-showcase-panel">
            <div className="lp-panel-item">
              <span>01</span>
              <strong>Centralized Materials</strong>
              <p>Learning content is organized in one accessible dashboard.</p>
            </div>

            <div className="lp-panel-item">
              <span>02</span>
              <strong>User-Based Progress</strong>
              <p>Each student has their own completed material records.</p>
            </div>

            <div className="lp-panel-item">
              <span>03</span>
              <strong>Contextual AI Support</strong>
              <p>
                AI answers are supported by available learning material context.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-section" id="workflow">
        <div className="lp-section-heading">
          <span>Workflow</span>
          <h2>Simple learning flow from account to progress.</h2>
        </div>

        <div className="lp-workflow-grid">
          {workflows.map((workflow, index) => (
            <div className="lp-workflow-item" key={workflow}>
              <div>{index + 1}</div>
              <p>{workflow}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="lp-cta">
        <div>
          <span>Start Now</span>
          <h2>Ready to explore the learning dashboard?</h2>
          <p>
            Create an account and start learning with structured materials,
            progress tracking, and AI-powered support.
          </p>
        </div>

        <div className="lp-cta-actions">
          <Link to="/register" className="lp-primary-button lp-white-button">
            Create Account
          </Link>
          <Link
            to="/login"
            className="lp-secondary-button lp-transparent-button"
          >
            Login
          </Link>
        </div>
      </section>

      <footer className="lp-footer">
        <div className="lp-footer-content">
          <div className="lp-footer-brand">
            <span className="lp-footer-logo">LS</span>
            <div>
              <strong>Learning Support Platform</strong>
              <p>Study smarter, track better, and learn with AI support.</p>
            </div>
          </div>

          <div className="lp-footer-info">
            <p>
              Built by <strong>Wesly Adam R.</strong>
            </p>
            <p>
              © {currentYear} Learning Support Platform. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <nav
        className={`lp-bottom-nav ${showBottomNav ? "is-show" : ""}`}
        aria-label="Bottom navigation"
      >
        <a href="#features">Features</a>
        <a href="#overview">Overview</a>
        <a href="#workflow">Workflow</a>
        <Link to="/login">Login</Link>
        <Link to="/register" className="lp-bottom-nav-cta">
          Get Started
        </Link>
      </nav>
    </main>
  );
}
