import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main style={{
      minHeight: "80vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      padding: "120px 20px 60px",
      backgroundColor: "var(--color-bg)",
    }}>
      <p className="label" style={{ marginBottom: "12px", color: "var(--color-text-muted)" }}>
        Error 404
      </p>
      <h1 style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(2.5rem, 5vw, 4rem)",
        fontWeight: 300,
        marginBottom: "16px",
      }}>
        Page Not Found
      </h1>
      <p style={{
        color: "var(--color-text-muted)",
        maxWidth: "460px",
        lineHeight: 1.6,
        marginBottom: "32px",
        fontSize: "0.95rem",
      }}>
        The piece or destination you are seeking cannot be located in our current catalog. Explore our seasonal collections or return to the atelier homepage.
      </p>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
        <Link to="/" className="btn btn--primary">Return to Homepage</Link>
        <Link to="/collection" className="btn btn--outline">Browse Collections</Link>
      </div>
    </main>
  );
}
