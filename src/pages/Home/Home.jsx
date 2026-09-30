import { useEffect } from "react";
import Hero from "../../components/Hero/Hero";
import CollectionSection from "../../components/CollectionSection/CollectionSection";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import EditorialSection from "../../components/EditorialSection/EditorialSection";
import CollectionBanner from "../../components/CollectionSection/CollectionBanner";
import Newsletter from "../../components/Newsletter/Newsletter";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

export default function Home() {
  useReveal();
  return (
    <main>
      <Hero />
      <CollectionSection category="Women" label="Featured Collection" />
      <ProductGrid title="New Arrivals" limit={8} />
      <EditorialSection />
      <CollectionBanner
        category="Men"
        subtitle="New Season"
        image="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=85&auto=format&fit=crop"
      />
      <Newsletter />
    </main>
  );
}
