import { BrowserRouter, Routes, Route, ScrollRestoration } from 'react-router-dom'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import ScrollTop from './components/ScrollTop'

import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Technologies from './pages/Technologies'
import Portfolio from './pages/Portfolio'
import Careers from './pages/Careers'
import JobDetail from './pages/JobDetail'
import Team from './pages/Team'
import Testimonials from './pages/Testimonials'
import Partners from './pages/Partners'
import Contact from './pages/Contact'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Insights from './pages/Insights'
import InsightDetail from './pages/InsightDetail'
import Solutions from './pages/Solutions'
import Industry from './pages/Industry'
import Admin from './pages/Admin'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Layout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/technologies" element={<Technologies />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:id" element={<JobDetail />} />
          <Route path="/team" element={<Team />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<InsightDetail />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/industry" element={<Industry />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
      <ScrollTop />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
