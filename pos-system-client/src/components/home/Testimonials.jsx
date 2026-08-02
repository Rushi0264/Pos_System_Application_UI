import "./Testimonials.css";

const testimonials = [
  {
    name: "Rahul Sharma",
    company: "Fresh Mart",
    text: "This POS system transformed how we manage our stores. Billing is fast and inventory is always accurate.",
  },
  {
    name: "Priya Patel",
    company: "Mega Retail",
    text: "Managing multiple branches is now effortless. The reports help us make better business decisions.",
  },
  {
    name: "Amit Kumar",
    company: "Super Mall",
    text: "Excellent performance and a clean interface. Highly recommended for retail businesses.",
  },
];

function Testimonials() {
  return (
    <section
    className="testimonials"
    data-aos="fade-up"
>
      <h2>What Our Clients Say</h2>

      <div className="testimonial-grid">
        {testimonials.map((item, index) => (
          <div className="testimonial-card" key={index}>
            <p>"{item.text}"</p>

            <h3>{item.name}</h3>

            <span>{item.company}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;