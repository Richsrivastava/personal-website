import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <div style={{ minHeight: 'calc(100vh - 80px)' }}>
          {children}
        </div>
        <Footer />
      </main>
    </div>
  )
}