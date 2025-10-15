import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-6 flex flex-col z-50">
      {/* Section 1: Site owner + primary navigation */}
      <div>
        <nav aria-label="Primary" className="flex flex-col gap-2">
          <Link
            to="/"
            className="hover:bg-gray-700 rounded px-3 py-2 transition-colors block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Home
          </Link>
          <Link
            to="/articles"
            className="hover:bg-gray-700 rounded px-3 py-2 transition-colors block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Articles
          </Link>
          <Link
            to="/poems"
            className="hover:bg-gray-700 rounded px-3 py-2 transition-colors block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Poetry
          </Link>
        </nav>
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-white/10" />

      {/* Section 2: External links */}
      <div>
        <h2 className="text-sm uppercase tracking-wide text-gray-300 mb-3">
          Find me on
        </h2>
        <nav aria-label="Social" className="flex flex-col gap-2">
          <a
            href={"https://github.com/Richsrivastava"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-gray-700 rounded px-3 py-2 transition-colors block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            GitHub
          </a>
          <a
            href={"https://www.linkedin.com/in/richa-a-srivastava"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-gray-700 rounded px-3 py-2 transition-colors block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </aside>
  )
}
