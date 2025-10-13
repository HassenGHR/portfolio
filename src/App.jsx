import { useEffect, useState } from "react";
import "./app.scss";

// Components
import Cursor from "./components/cursor/Cursor";
import Hero from "./components/hero/Hero";
import Navbar from "./components/navbar/Navbar";
import Parallax from "./components/parallax/Parallax";
import Portfolio from "./components/portfolio/Portfolio";
import Services from "./components/services/Services";
import Tech from "./components/skills/Technology";
import Categories from "./components/categories/Categories";
import ContactPage from "./components/contact/Contact";

const App = () => {
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // Remove unwanted span with class 'hash-span'
    const hashSpan = document.querySelector(".hash-span");
    if (hashSpan?.parentNode) {
      hashSpan.parentNode.removeChild(hashSpan);
    }
  }, []);

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
        <Categories onFilteredItems={setFilteredItems} />
        <Portfolio filteredItems={filteredItems} />
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
