import { Link } from "react-router-dom";
import "./EditorialSection.css";

export default function EditorialSection() {
  return (
    <section className="editorial section">
      <div className="editorial__grid">
        <div className="editorial__image-wrap">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85&auto=format&fit=crop"
            alt="The Art of Form"
            className="editorial__image"
          />
        </div>
        <div className="editorial__content reveal">
          <p className="label editorial__issue">The Journal — No. 04</p>
          <h2 className="editorial__title">The Art<br />of Form</h2>
          <p className="editorial__body">
            There is beauty in restraint. In the deliberate choice of a single material,
            a careful cut, a silhouette that needs no explanation. This season we return
            to the beginning — to craft, to intention, to form.
          </p>
          <Link to="/collection/Women" className="btn-text">Read the Story</Link>
        </div>
      </div>
    </section>
  );
}
