import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Richa Srivastava.",
};

const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/richa-a-srivastava/",
    display: "linkedin.com/in/richa-a-srivastava",
  },
  {
    label: "GitHub",
    href: "https://github.com/richsrivastava",
    display: "github.com/richsrivastava",
  },
  {
    label: "Twitter",
    href: "https://x.com/Richauniverse",
    display: "@richauniverse",
  },
];

export default function ContactPage() {
  return (
    <>
      <h1 className="page-title">Contact</h1>
      <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "0.5rem" }}>
        The best way to reach me is on LinkedIn.
      </p>
      <ul className="contact-list">
        {links.map(({ label, href, display }) => (
          <li key={label}>
            <span className="contact-label">{label}</span>
            <a href={href} target="_blank" rel="noopener noreferrer">
              {display}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
