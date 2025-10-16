export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '2rem',
      textAlign: 'center',
      fontSize: '0.875rem',
      color: 'var(--text-secondary)',
      background: 'var(--main-bg)'
    }}>
      <p style={{ margin: 0 }}>
        © {new Date().getFullYear()} Richa Srivastava. All rights reserved.
      </p>
    </footer>
  )
}