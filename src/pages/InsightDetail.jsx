import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './InnerPage.css'

export default function InsightDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()
      .then(({ data, error }) => {
        if (error || !data) setNotFound(true)
        else {
          setArticle(data)
          document.title = `${data.title} | Rahimi Tech Solution`
        }
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="inner-page">
        <div className="insight-loading-screen">
          <i className="fas fa-spinner fa-spin"></i>
        </div>
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="inner-page">
        <div className="insight-not-found">
          <i className="fas fa-file-slash"></i>
          <h2>Article not found</h2>
          <p>This article may have been removed or the link is incorrect.</p>
          <Link to="/insights" className="btn btn-accent">Back to Insights</Link>
        </div>
      </div>
    )
  }

  const paragraphs = (article.content || '').split(/\n{2,}/).filter(p => p.trim())

  return (
    <div className="inner-page">
      <div className="page-banner insights-banner">
        <div className="container">
          <span className="insight-detail-cat">{article.category}</span>
          <h1>{article.title}</h1>
          <div className="insight-detail-meta">
            <span><i className="fas fa-user"></i> {article.author || 'Rahimi Tech Solution'}</span>
            <span><i className="fas fa-calendar-alt"></i> {new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">›</span>
            <Link to="/insights">Insights</Link>
            <span className="sep">›</span>
            <span>{article.title}</span>
          </div>
        </div>
      </div>

      <section className="ip-section">
        <div className="container">
          <div className="insight-detail-wrap">

            {article.image_url && (
              <img
                className="insight-detail-hero-img"
                src={article.image_url}
                alt={article.title}
                loading="lazy"
              />
            )}

            <div className="insight-detail-content">
              {paragraphs.map((p, i) => {
                if (p.startsWith('## ')) return <h2 key={i} className="insight-h2">{p.slice(3)}</h2>
                if (p.startsWith('# ')) return <h2 key={i} className="insight-h1">{p.slice(2)}</h2>
                if (p.startsWith('- ')) {
                  const items = p.split('\n').filter(l => l.startsWith('- ')).map(l => l.slice(2))
                  return <ul key={i} className="insight-list">{items.map((item, j) => <li key={j}>{item}</li>)}</ul>
                }
                return <p key={i}>{p}</p>
              })}
            </div>

            {article.tags && article.tags.length > 0 && (
              <div className="insight-detail-tags">
                <span className="insight-tags-label">Tags:</span>
                {article.tags.map((t, i) => <span key={i} className="insight-tag">{t}</span>)}
              </div>
            )}

            <div className="insight-detail-footer">
              <Link to="/insights" className="insight-back-btn">
                <i className="fas fa-arrow-left"></i> Back to Insights
              </Link>
              <Link to="/contact" className="btn btn-accent">
                Start a Project <i className="fas fa-arrow-right"></i>
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
