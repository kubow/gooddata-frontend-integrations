"use client";
export const dynamic = "force-dynamic";

import GoodDataChart from "./components/GoodDataChart";
import Image from "next/image";

export default function Home() {
  return (
    <div id="main">
      <header className="site-header">
        <h1>My Fruit Store</h1>
        <nav>
          <a href="#home" className="nav-link">
            Home
          </a>
          <a href="#products" className="nav-link">
            Products
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
        </nav>
      </header>
      <main>
        <section className="products">
          <h2>Todays Fruits</h2>
          <div className="product-list">
            <div className="product-item">
              <Image src="/apples.jpeg" alt="Apples" width={200} height={200} />
              <h3>Apples</h3>
              <p>Ideal for baking a delicious pie!</p>
            </div>
            <div className="product-item">
              <Image src="/pears.jpeg" alt="Pears" width={200} height={200} />
              <h3>Pears</h3>
              <p>Ideal for smoothies!</p>
            </div>
            <div className="product-item">
              <Image src="/bananas.jpeg" alt="Bananas" width={200} height={200} />
              <h3>Bananas</h3>
              <p>Get your daily dose of potassium!</p>
            </div>
          </div>
        </section>
        <section className="data-visualization">
          <h1>Where people buy our fruits?</h1>
          <GoodDataChart />
        </section>
      </main>

      <footer>
        <div>I am a happy little Footer</div>
      </footer>
    </div>
  );
}
