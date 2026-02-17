import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()
  
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  return (
    <aside className="sidebar">
      {/* Header Section */}
      <div className="sidebar-header">
        <h1 className="sidebar-title">Richa Srivastava</h1>
        <p className="sidebar-subtitle">Engineering & AI Leader</p>
      </div>

      {/* Primary Navigation */}
      <nav className="sidebar-nav" aria-label="Primary">
        <Link
          to="/"
          className={isActive('/') && !isActive('/articles') && !isActive('/poems') ? 'active' : ''}
        >
          Home
        </Link>
        <Link
          to="/articles"
          className={isActive('/articles') ? 'active' : ''}
        >
          Writing
        </Link>
        <Link
          to="/poems"
          className={isActive('/poems') ? 'active' : ''}
        >
          Poetry
        </Link>
      </nav>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--border)', margin: '1rem 1.5rem' }} />

      {/* External Links Section */}
      <div style={{ padding: '0 1.5rem' }}>
        <h2 style={{ 
          fontSize: '0.75rem', 
          textTransform: 'uppercase', 
          letterSpacing: '0.05em', 
          color: 'var(--text-secondary)',
          marginBottom: '0.75rem',
          fontWeight: 600
        }}>
          Connect
        </h2>
        <nav className="sidebar-nav" aria-label="Social" style={{ padding: 0 }}>
          <a
            href="https://github.com/Richsrivastava"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/richa-a-srivastava"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://twitter.com/Richauniverse"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
        </nav>
      </div>
    </aside>
  )
}