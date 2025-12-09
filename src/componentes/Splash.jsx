// src/componentes/Splash.jsx
import "./Splash.css";

export default function Splash() {
  return (
    <div className="splash-page">
      <div className="splash-bg-overlay" />

      <div className="container h-100 d-flex align-items-center justify-content-center">
        <div className="splash-card shadow-lg">
          <div className="splash-logo-wrapper">
            <div className="splash-logo">
              <span className="splash-logo-icon">🎮</span>
            </div>
          </div>

          <h1 className="splash-title">Demos de actividades educativas</h1>
          <p className="splash-subtitle">
             ¡Diviértete y Aprende!
          </p>

          <div className="splash-loader">
            <div className="splash-loader-bar">
              <div className="splash-loader-bar-fill" />
            </div>
            <div className="splash-loader-dots">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>

          <p className="splash-hint">
            Preparando preguntas, arrastres y sorpresas educativas…
          </p>
        </div>
      </div>
    </div>
  );
}
