import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Header />
      <main className="ml-64 flex-1 flex flex-col">
        <div className="flex-1 p-6">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  )
}