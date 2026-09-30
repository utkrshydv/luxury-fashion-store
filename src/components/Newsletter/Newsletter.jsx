import { useState } from "react";
import "./Newsletter.css";

export default function Newsletter() {
  const [email, setEmail]   = useState("");
  const [done,  setDone]    = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setDone(true);
  };

  return (
    <section className="newsletter section">
      <div className="container newsletter__inner reveal">
        <p className="label newsletter__eyebrow">The World of Maison</p>
        <h2 className="newsletter__title">Enter the Circle</h2>
        <p className="newsletter__sub">
          Receive early access to new collections, private events, and editorials.
        </p>
        {done ? (
          <p className="newsletter__thanks">You are on the list.</p>
        ) : (
          <form className="newsletter__form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="newsletter__input"
              required
            />
            <button type="submit" className="btn-outlined">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
}
