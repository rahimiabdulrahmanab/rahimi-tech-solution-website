import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './InnerPage.css'

const EMPTY_FORM = {
  name: '', email: '', phone: '',
  linkedin_url: '', github_url: '', portfolio_url: '',
  experience: '', cover_letter: '', file: null,
}

export default function JobDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [job, setJob] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.from('jobs').select('*').eq('id', id).single()
      .then(({ data, error: err }) => {
        if (err || !data) setNotFound(true)
        else setJob(data)
      })
  }, [id])

  if (notFound) {
    navigate('/careers', { replace: true })
    return null
  }
  if (!job) return (
    <div className="inner-page" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <i className="fas fa-spinner fa-spin" style={{ fontSize: 36, color: 'var(--brand)' }}></i>
    </div>
  )

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let resume_url = ''
      let resume_name = ''

      if (form.file) {
        const ext = form.file.name.split('.').pop()
        const path = `${id}/${Date.now()}_${form.name.replace(/\s+/g, '_')}.${ext}`
        const { error: uploadErr } = await supabase.storage
          .from('resumes')
          .upload(path, form.file, { upsert: false })

        if (uploadErr) throw uploadErr

        const { data: urlData } = supabase.storage.from('resumes').getPublicUrl(path)
        resume_url = urlData.publicUrl
        resume_name = form.file.name
      }

      const { error: insertErr } = await supabase.from('applications').insert({
        job_id: job.id,
        job_title: job.title,
        name: form.name,
        email: form.email,
        phone: form.phone,
        linkedin_url: form.linkedin_url,
        github_url: form.github_url,
        portfolio_url: form.portfolio_url || null,
        cover_letter: form.cover_letter,
        experience: form.experience,
        resume_url,
        resume_name,
        status: 'pending',
      })

      if (insertErr) throw insertErr
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const responsibilities = Array.isArray(job.responsibilities) ? job.responsibilities : []
  const requirements = Array.isArray(job.requirements) ? job.requirements : []
  const tags = Array.isArray(job.tags) ? job.tags : []

  return (
    <div className="inner-page">
      <div className="page-banner">
        <div className="container">
          <h1>{job.title}</h1>
          <p>{[job.department, job.location, job.type].filter(Boolean).join(' · ')}</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span className="sep">›</span>
            <Link to="/careers">Careers</Link><span className="sep">›</span>
            <span>{job.title}</span>
          </div>
        </div>
      </div>

      <section className="ip-section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '60px', alignItems: 'start' }}>

            <div>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', padding: '22px', background: 'var(--bg-light)', borderRadius: 4, marginBottom: 32, borderLeft: '4px solid var(--accent)' }}>
                {[
                  { icon: 'fas fa-map-marker-alt', label: 'Location', value: job.location },
                  { icon: 'fas fa-briefcase', label: 'Type', value: job.type },
                  { icon: 'fas fa-money-bill-wave', label: 'Salary', value: job.salary_range },
                  { icon: 'fas fa-laptop-house', label: 'Work Style', value: job.remote },
                  { icon: 'fas fa-building', label: 'Department', value: job.department },
                ].filter(m => m.value).map((m, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: '1 0 150px' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={m.icon} style={{ fontSize: 13, color: '#fff' }}></i>
                    </div>
                    <div>
                      <span style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: '#999' }}>{m.label}</span>
                      <strong style={{ fontSize: 14, color: '#111', fontFamily: 'var(--font-head)' }}>{m.value}</strong>
                    </div>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: 16, lineHeight: 1.85, color: '#444', marginBottom: 32 }}>{job.description}</p>

              {responsibilities.length > 0 && (
                <>
                  <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 800, color: '#111', marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #eee' }}>
                    <i className="fas fa-tasks" style={{ color: 'var(--accent)', marginRight: 10 }}></i>Responsibilities
                  </h3>
                  <ul style={{ marginBottom: 36 }}>
                    {responsibilities.map((r, i) => (
                      <li key={i} style={{ padding: '8px 0 8px 24px', position: 'relative', borderBottom: '1px solid #f0f0f0', fontSize: 15, color: '#444' }}>
                        <i className="fas fa-check-circle" style={{ position: 'absolute', left: 0, top: 11, color: 'var(--accent)', fontSize: 13 }}></i>
                        {r}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {requirements.length > 0 && (
                <>
                  <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 800, color: '#111', marginBottom: 16, paddingBottom: 10, borderBottom: '2px solid #eee' }}>
                    <i className="fas fa-star" style={{ color: 'var(--accent)', marginRight: 10 }}></i>Requirements
                  </h3>
                  <ul style={{ marginBottom: 32 }}>
                    {requirements.map((r, i) => (
                      <li key={i} style={{ padding: '8px 0 8px 24px', position: 'relative', borderBottom: '1px solid #f0f0f0', fontSize: 15, color: '#444' }}>
                        <i className="fas fa-circle" style={{ position: 'absolute', left: 4, top: 14, color: 'var(--brand)', fontSize: 7 }}></i>
                        {r}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {tags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <strong style={{ fontFamily: 'var(--font-head)', fontSize: 13, fontWeight: 700, color: '#666', textTransform: 'uppercase', letterSpacing: '.06em', width: '100%', marginBottom: 4 }}>Skills:</strong>
                  {tags.map((t, i) => (
                    <span key={i} style={{ background: 'var(--bg-light)', color: 'var(--brand)', padding: '5px 12px', borderRadius: 4, fontSize: 13, fontWeight: 600, border: '1px solid rgba(26,74,92,.1)' }}>{t}</span>
                  ))}
                </div>
              )}
            </div>

            <div style={{ position: 'sticky', top: 100 }}>
              <div style={{ background: '#fff', borderRadius: 4, boxShadow: 'var(--shadow-md)', padding: '28px', borderTop: '3px solid var(--accent)', marginBottom: 20 }}>
                <h4 style={{ fontFamily: 'var(--font-head)', fontSize: 18, fontWeight: 800, color: '#111', marginBottom: 14 }}>Apply for this role</h4>
                <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7, marginBottom: 18 }}>Ready to join the team? Fill out the application form below.</p>
                <a href="#apply-form" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', justifyContent: 'center' }}>
                  <i className="fas fa-paper-plane"></i> Apply Now
                </a>
              </div>
              <div style={{ background: 'var(--bg-light)', borderRadius: 4, padding: '20px', fontSize: 14 }}>
                <strong style={{ display: 'block', fontFamily: 'var(--font-head)', fontWeight: 700, color: '#111', marginBottom: 8 }}>Questions?</strong>
                <a href="mailto:info@rahimitechsolution.com" style={{ color: 'var(--brand)', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 600, marginBottom: 6 }}>
                  <i className="fas fa-envelope"></i> info@rahimitechsolution.com
                </a>
                <Link to="/careers" style={{ color: '#888', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                  <i className="fas fa-arrow-left"></i> Back to all jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ip-section ip-section--grey" id="apply-form">
        <div className="container">
          <div className="apply-form-wrap">
            {submitted ? (
              <div className="form-success-state">
                <i className="fas fa-check-circle"></i>
                <h4>Application Submitted!</h4>
                <p>Thank you for applying for <strong>{job.title}</strong>. Our team will review your application and be in touch soon.</p>
                <Link to="/careers" className="btn btn-primary" style={{ marginTop: 20, display: 'inline-flex' }}>View Other Openings</Link>
              </div>
            ) : (
              <>
                <h2>Apply for: {job.title}</h2>
                <p>Fields marked with <span style={{ color: '#e53e3e' }}>*</span> are required.</p>
                <form onSubmit={handleSubmit}>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Full Name <span>*</span></label>
                      <input type="text" placeholder="Ahmad Rahimi" required value={form.name} onChange={set('name')} />
                    </div>
                    <div className="form-group">
                      <label>Email Address <span>*</span></label>
                      <input type="email" placeholder="you@example.com" required value={form.email} onChange={set('email')} />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>Phone Number <span>*</span></label>
                      <input type="tel" placeholder="+93 7XX XXX XXX" required value={form.phone} onChange={set('phone')} />
                    </div>
                    <div className="form-group">
                      <label>Years of Experience <span>*</span></label>
                      <select required value={form.experience} onChange={set('experience')}>
                        <option value="">Select…</option>
                        <option>Less than 1 year</option>
                        <option>1–2 years</option>
                        <option>3–5 years</option>
                        <option>5–8 years</option>
                        <option>8+ years</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label>GitHub Profile <span>*</span></label>
                      <input type="url" placeholder="https://github.com/username" required value={form.github_url} onChange={set('github_url')} />
                    </div>
                    <div className="form-group">
                      <label>LinkedIn Profile <span>*</span></label>
                      <input type="url" placeholder="https://linkedin.com/in/username" required value={form.linkedin_url} onChange={set('linkedin_url')} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Portfolio / Website <span style={{ color: '#999', fontWeight: 400 }}>(optional)</span></label>
                    <input type="url" placeholder="https://yourportfolio.com" value={form.portfolio_url} onChange={set('portfolio_url')} />
                  </div>

                  <div className="form-group">
                    <label>Cover Letter / Message</label>
                    <textarea placeholder="Tell us why you're a great fit for this role…" rows={5} value={form.cover_letter} onChange={set('cover_letter')} />
                  </div>

                  <div className="form-group">
                    <label>Resume / CV (PDF) <span>*</span></label>
                    <div className="file-upload" onClick={() => document.getElementById('cv-upload').click()}>
                      <i className="fas fa-cloud-upload-alt"></i>
                      <p>Click to upload your resume</p>
                      <small>PDF only — Max 5 MB</small>
                      {form.file && (
                        <p style={{ color: 'var(--accent)', marginTop: 8, fontWeight: 600, fontSize: 13 }}>
                          <i className="fas fa-check"></i> {form.file.name}
                        </p>
                      )}
                    </div>
                    <input
                      id="cv-upload"
                      type="file"
                      accept=".pdf"
                      required
                      style={{ display: 'none' }}
                      onChange={e => setForm(p => ({ ...p, file: e.target.files[0] || null }))}
                    />
                  </div>

                  {error && (
                    <p style={{ color: '#e53e3e', fontSize: 14, marginBottom: 12 }}>
                      <i className="fas fa-exclamation-circle" style={{ marginRight: 6 }}></i>{error}
                    </p>
                  )}

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', height: 52, fontSize: 15 }} disabled={loading}>
                    {loading
                      ? <><i className="fas fa-spinner fa-spin"></i> Submitting…</>
                      : <><i className="fas fa-paper-plane"></i> Submit Application</>
                    }
                  </button>
                  <p style={{ fontSize: 12, color: '#999', textAlign: 'center', marginTop: 12 }}>
                    By submitting you agree to our <Link to="/privacy" style={{ color: 'var(--brand)' }}>Privacy Policy</Link>.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
