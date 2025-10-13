import { useEffect, useState } from "react";
import "./app.scss";

// Components
import Cursor from "./components/cursor/Cursor";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Parallax from "./components/parallax/Parallax";
import Services from "./components/services/Services";
import Tech from "./components/skills/Technology";
import ContactPage from "./components/contact/Contact";
import Categories from "./components/categories/Categories";
import Portfolio from "./components/portfolio/Portfolio";

// Data
import { portfolioItems } from "./data/portfolioItems";

const App = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    // Remove unwanted span with class 'hash-span'
    const hashSpan = document.querySelector(".hash-span");
    if (hashSpan?.parentNode) {
      hashSpan.parentNode.removeChild(hashSpan);
    }
  }, []);

  // Get filtered items based on active category
  const getDisplayItems = () => {
    if (activeCategory === "all") {
      return portfolioItems;
    }
    return portfolioItems.filter(item => item.category === activeCategory);
  };

  const displayItems = getDisplayItems();

  // Handle category selection
  const handleSelectCategory = (category) => {
    setActiveCategory(category);
    
    // Scroll to portfolio after state updates
    setTimeout(() => {
      const portfolioSection = document.getElementById("portfolio-section");
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  return (
    <div>
      <Cursor />

      <section id="Homepage">
        <Navbar />
        <Hero />
      </section>

      <section id="Parallax">
        <Parallax type="portfolio" />
      </section>

      <section id="Services">
        <Services />
      </section>

      <section id="Portfolio">
        <Categories 
          activeCategory={activeCategory}
          onCategorySelect={handleSelectCategory}
          itemCount={displayItems.length}
        />
        <Portfolio items={displayItems} activeCategory={activeCategory} />
      </section>

      <section id="Skills">
        <Tech />
      </section>

      <section id="Contact">
        <ContactPage />
      </section>
    </div>
  );
};

export default App;