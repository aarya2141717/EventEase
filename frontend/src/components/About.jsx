export default function About() {
  return (
    <section className="about-section">
      <div className="about-content">
        <h2>ABOUT US</h2>
        <p>
          EventEase makes planning events easy and stress-free.
          We connect you with the best venues and artists to make your
          events memorable and hassle-free.
        </p>
        <button className="btn btn-secondary">Explore more</button>
      </div>

      <div className="about-image">
        <img src="/images/singer.jpg" alt="Singer performing" />
      </div>

      <div className="why-choose">
        <h2>Why Choose EventEase?</h2>
        <ul>
          <li>✔ Curated Venues & Artists</li>
          <li>✔ Easy Booking Process</li>
          <li>✔ 24/7 Customer Support</li>
          <li>✔ Competitive Pricing</li>
        </ul>
        <button className="btn btn-primary">Book now</button>
      </div>
    </section>
  );
}

