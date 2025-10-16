import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Articles from './pages/Articles'
import ArticleDetail from './pages/ArticleDetail'
import Github from './pages/Github'
import Poems from './pages/Poems'
import PoemDetail from './pages/PoemDetail'
import Contact from './pages/Contact'
import './portfolio_styles.css'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<ArticleDetail />} />
          <Route path="/github" element={<Github />} />
          <Route path="/poems" element={<Poems />} />
          <Route path="/poems/:slug" element={<PoemDetail />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
