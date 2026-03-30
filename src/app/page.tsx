import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Richa Srivastava",
  description:
    "Engineering & AI Leader at Chubb. Writing on enterprise AI, technology strategy, and leadership. Poetry in English and Hindi.",
};

export default function HomePage() {
  return (
    <div className="home-intro">
      <h1>Richa Srivastava</h1>
      <p className="home-subtitle">
        Engineering &amp; AI Leader · Writer · Poetess
      </p>

      <div className="home-bio">
        <p>
          Global Engineering Leader at <strong>Chubb Insurance</strong>,
          building high-performing teams and scalable AI solutions across
          enterprise platforms.
        </p>
        <p>
          I write about enterprise AI, engineering leadership, and the gap
          between proof-of-concept and production — from inside the
          organizations where that gap matters most.
        </p>
        <p>
          I&rsquo;ve spent two decades at the intersection of technology,
          insurance, and business transformation. I believe the hardest problems
          are organizational, not technical.
        </p>
        <p>
          I write poetry in English and Hindi. It started as a private thing and
          eventually stopped being one.
        </p>
        <p>
          My philosophy: start small, move steadily, and let impact grow through
          consistency.
        </p>
      </div>

      <p className="home-section-label">Explore</p>
      <div className="home-links">
        <Link href="/writing">Writing</Link>
        <Link href="/poetry">Poetry</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </div>
  );
}
