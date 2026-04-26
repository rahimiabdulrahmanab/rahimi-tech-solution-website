import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './InnerPage.css'

const perks = [
  { icon: 'fas fa-money-bill-wave', title: 'Honest Pay', desc: 'We pay based on your actual skill and what the role requires. Not what we think we can get away with. Salaries are reviewed every year. You won\'t need to fight for a raise you\'ve already earned.' },
  { icon: 'fas fa-laptop-house', title: 'Office First, Flexible Where It Makes Sense', desc: 'Most of our team works from the Jalalabad office. Some roles have room for remote days. We look at each situation honestly rather than having a blanket policy.' },
  { icon: 'fas fa-graduation-cap', title: 'We Pay for Your Learning', desc: 'Certifications, courses, workshops. If it makes you better at your job we cover the cost. We\'ve sent team members to training that had nothing to do with their current project, because that\'s how people grow.' },
  { icon: 'fas fa-shield-alt', title: 'Health Coverage for Your Family', desc: 'You get real health coverage for you and your immediate family. Not a small token. Something that actually helps when something goes wrong.' },
  { icon: 'fas fa-sun', title: 'Take Your Days Off', desc: 'All Afghan public holidays. Proper annual leave. Sick days without a debate. We don\'t track whether you took a full hour for lunch. We care that the work gets done and that you\'re not burning out.' },
  { icon: 'fas fa-users', title: 'A Small Team That Actually Works Together', desc: 'We\'ve had the same core team for years. People here know each other, help each other and aren\'t competing for credit. It\'s not a perfect workplace. No place is. But it\'s a real one.' },
]

const badgeClass = (remote) => {
  if (!remote) return ''
  const r = remote.toLowerCase()
  if (r === 'remote') return 'remote'
  if (r === 'hybrid') return 'hybrid'
  return ''
}

export default function Careers() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('jobs')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setJobs(data || [])
        setLoading(false)
      })
  }, [])

  return (
    <div className="inner-page">
      <div className="page-banner careers-banner">
        <div className="container">
          <h1>Work With <span>Us</span></h1>
          <p>We're a software team in Jalalabad that has been building real systems for Afghan organizations since 2015.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">›</span>
            <span>Careers</span>
          </div>
        </div>
      </div>

      <section className="ip-section" style={{ background: '#fff', borderBottom: '1px solid #eef1f4' }}>
        <div className="container">
          <div className="careers-intro">
            <div className="careers-intro-text">
              <h2>What it's actually like to work here</h2>
              <p>
                We are not a startup trying to move fast and break things. We are a software company
                that has been around since 2015, with clients across government, healthcare, education,
                and private enterprise. The work is real, the problems are interesting and the stakes matter.
                A hospital management system we built is used by doctors every day.
              </p>
              <p>
                Our team is small by design. Everyone here does real work. There is no layer of people
                who just attend meetings. If you join us, you will write code that ships, design
                interfaces that people actually use, and talk directly to the people you are building for.
              </p>
              <p>
                We are based in Jalalabad, Afghanistan. If you are local and you are serious about
                software, we want to hear from you.
              </p>
            </div>
            <div className="careers-intro-facts">
              <div className="fact-item">
                <strong>10+</strong>
                <span>Years in operation</span>
              </div>
              <div className="fact-item">
                <strong>25+</strong>
                <span>People on the team</span>
              </div>
              <div className="fact-item">
                <strong>150+</strong>
                <span>Projects delivered</span>
              </div>
              <div className="fact-item">
                <strong>Jalalabad</strong>
                <span>Where we work</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ip-section careers-perks-section">
        <div className="container">
          <div className="section-header">
            <span className="tag">Working Here</span>
            <h2>What We <span>Offer</span></h2>
            <p>Nothing unusual. Just the things that actually matter when you're thinking about where to work.</p>
          </div>
          <div className="perks-grid">
            {perks.map((p, i) => (
              <div key={i} className="perk-card">
                <div className="perk-icon">
                  <i className={p.icon}></i>
                </div>
                <strong className="perk-title">{p.title}</strong>
                <p className="perk-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ip-section careers-jobs-section">
        <div className="container">
          <div className="section-header">
            <span className="tag">Open Roles</span>
            <h2>Current <span>Openings</span></h2>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#888' }}>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: 32, color: 'var(--brand)', marginBottom: 16, display: 'block' }}></i>
              Loading openings…
            </div>
          ) : jobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <i className="fas fa-briefcase" style={{ fontSize: 48, color: '#ddd', marginBottom: 16, display: 'block' }}></i>
              <h3 style={{ fontFamily: 'var(--font-head)', color: '#555', marginBottom: 8 }}>No openings right now</h3>
              <p style={{ color: '#888' }}>Check back soon or send us your CV below.</p>
            </div>
          ) : (
            <div className="jobs-grid">
              {jobs.map((job) => (
                <div className="job-card" key={job.id}>
                  <div className="job-card-body">
                    <div className="job-card-head">
                      {job.department && <span className="job-dept-tag"><i className="fas fa-building"></i> {job.department}</span>}
                      {job.remote && <span className={`job-badge ${badgeClass(job.remote)}`}>{job.remote}</span>}
                    </div>
                    <h3 className="job-title">{job.title}</h3>
                    <div className="job-meta">
                      {job.location && <span><i className="fas fa-map-marker-alt"></i>{job.location}</span>}
                      {job.type && <span><i className="fas fa-clock"></i>{job.type}</span>}
                      {job.salary_range && <span><i className="fas fa-money-bill-wave"></i>{job.salary_range}</span>}
                    </div>
                    <p className="job-desc">{job.description}</p>
                    {job.tags && job.tags.length > 0 && (
                      <div className="job-tags">
                        {job.tags.slice(0, 5).map((t, ti) => <span className="job-tag" key={ti}>{t}</span>)}
                      </div>
                    )}
                    <Link to={`/careers/${job.id}`} className="job-apply-link">
                      View & Apply <i className="fas fa-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="ip-cta">
        <div className="container">
          <h2>Don't See the <span>Right Role?</span></h2>
          <p>
            We don't always post every position we hire for. If you are a developer, designer, or IT
            specialist based in Afghanistan and you do serious work, send us your CV. We read every
            message and we will reply. It might just take a few days.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '28px' }}>
            <a href="mailto:info@rahimitechsolution.com?subject=Open%20Application" className="btn btn-accent">
              <i className="fas fa-envelope"></i> Send Your CV
            </a>
            <Link to="/contact" className="btn" style={{ background: 'transparent', border: '2px solid rgba(255,255,255,0.5)', color: '#fff' }}>
              <i className="fas fa-phone-alt"></i> Talk to Us First
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
