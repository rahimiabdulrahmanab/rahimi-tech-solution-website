import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './InnerPage.css'

const CATEGORIES = ['All', 'Strategy', 'Case Study', 'Government Tech', 'Healthcare', 'Education', 'Technology', 'General']

export default function Insights() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [cat, setCat] = useState('All')

  useEffect(() => {
    supabase
      .from('articles')
      .select('id, title, slug, category, excerpt, image_url, author, published_at, tags')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .then(({ data }) => {
        setArticles(data || [])
        setLoading(false)
      })
  }, [])

  const filtered = cat === 'All' ? articles : articles.filter(a => a.category === cat)

  return (
    <div className="inner-page">
      <div className="page-banner insights-banner">
        <div className="container">
          <h1>IT Insights &amp; <span>Articles</span></h1>
          <p>Practical knowledge from Afghanistan's software development landscape. Case studies, guides and technology perspectives.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span className="sep">›</span><span>Insights</span>
          </div>
        </div>
      </div>

      <section className="ip-section">
        <div className="container">

          <div className="insights-filter-bar">
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`insights-cat-btn${cat === c ? ' active' : ''}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="insights-loading">
              <i className="fas fa-spinner fa-spin"></i> Loading articles…
            </div>
          ) : filtered.length === 0 ? (
            <div className="insights-empty">
              <i className="fas fa-newspaper"></i>
              <p>No articles published yet in this category. Check back soon.</p>
            </div>
          ) : (
            <div className="insights-grid">
              {filtered.map(article => (
                <Link key={article.id} to={`/insights/${article.slug}`} className="insight-card">
                  <div className="insight-img">
                    {article.image_url
                      ? <img src={article.image_url} alt={article.title} loading="lazy" />
                      : <div className="insight-img-placeholder"><i className="fas fa-newspaper"></i></div>
                    }
                    <span className="insight-cat-badge">{article.category || 'General'}</span>
                  </div>
                  <div className="insight-body">
                    <h3 className="insight-title">{article.title}</h3>
                    {article.excerpt && <p className="insight-excerpt">{article.excerpt}</p>}
                    <div className="insight-meta">
                      <span><i className="fas fa-user"></i> {article.author || 'Rahimi Tech Solution'}</span>
                      <span><i className="fas fa-calendar-alt"></i> {new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                  <div className="insight-read-more">
                    Read Article <i className="fas fa-arrow-right"></i>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </section>

      <section className="ip-cta">
        <div className="container">
          <h2>Have a project in mind? <span>Let's talk.</span></h2>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 28 }}>
            <Link to="/contact" className="btn btn-accent">Get in Touch</Link>
            <Link to="/portfolio" className="btn btn-outline-white">View Our Work</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
