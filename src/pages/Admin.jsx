import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './Admin.css'


/* ── helpers ── */
const statusColors = {
  pending: '#f59e0b',
  reviewed: '#3b82f6',
  accepted: '#10b981',
  rejected: '#ef4444',
}

function TagInput({ value, onChange, placeholder }) {
  const [input, setInput] = useState('')
  const add = () => {
    const v = input.trim()
    if (v && !value.includes(v)) onChange([...value, v])
    setInput('')
  }
  return (
    <div className="tag-input-wrap">
      <div className="tag-input-tags">
        {value.map((t, i) => (
          <span key={i} className="tag-pill">
            {t}
            <button type="button" onClick={() => onChange(value.filter((_, j) => j !== i))}>×</button>
          </span>
        ))}
      </div>
      <div className="tag-input-row">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add() } }}
          placeholder={placeholder}
        />
        <button type="button" className="tag-add-btn" onClick={add}>Add</button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════
   JOBS TAB
══════════════════════════════════ */
const EMPTY_JOB = {
  title: '', department: '', type: 'Full-time', location: 'Jalalabad, Afghanistan',
  remote: 'On-site', salary_range: '', description: '',
  responsibilities: [], requirements: [], tags: [], is_active: true,
}

function JobsTab() {
  const [jobs, setJobs] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_JOB)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const load = useCallback(async () => {
    const { data } = await supabase.from('jobs').select('*').order('created_at', { ascending: false })
    setJobs(data || [])
  }, [])

  useEffect(() => { load() }, [load])

  const set = (k) => (v) => setForm(p => ({ ...p, [k]: v }))
  const setVal = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }))

  const openNew = () => { setForm(EMPTY_JOB); setEditingId(null); setShowForm(true) }
  const openEdit = (job) => {
    setForm({
      title: job.title || '',
      department: job.department || '',
      type: job.type || 'Full-time',
      location: job.location || '',
      remote: job.remote || 'On-site',
      salary_range: job.salary_range || '',
      description: job.description || '',
      responsibilities: job.responsibilities || [],
      requirements: job.requirements || [],
      tags: job.tags || [],
      is_active: job.is_active,
    })
    setEditingId(job.id)
    setShowForm(true)
  }

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    const payload = { ...form }
    if (editingId) {
      await supabase.from('jobs').update(payload).eq('id', editingId)
      setMsg('Job updated.')
    } else {
      await supabase.from('jobs').insert(payload)
      setMsg('Job created.')
    }
    setSaving(false)
    setShowForm(false)
    setEditingId(null)
    load()
    setTimeout(() => setMsg(''), 3000)
  }

  const toggleActive = async (job) => {
    await supabase.from('jobs').update({ is_active: !job.is_active }).eq('id', job.id)
    load()
  }

  const deleteJob = async (id) => {
    if (!window.confirm('Delete this job? Applications linked to it will remain.')) return
    await supabase.from('jobs').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="admin-toolbar">
        <h2 className="admin-section-title">Job Openings</h2>
        <button className="admin-btn primary" onClick={openNew}>
          <i className="fas fa-plus"></i> New Job
        </button>
      </div>

      {msg && <div className="admin-flash">{msg}</div>}

      {showForm && (
        <div className="admin-form-card">
          <h3 className="admin-form-title">{editingId ? 'Edit Job' : 'Create New Job'}</h3>
          <form onSubmit={save}>
            <div className="admin-form-grid2">
              <div className="admin-field">
                <label>Job Title *</label>
                <input required value={form.title} onChange={setVal('title')} placeholder="e.g. Senior React Developer" />
              </div>
              <div className="admin-field">
                <label>Department</label>
                <input value={form.department} onChange={setVal('department')} placeholder="e.g. Engineering" />
              </div>
            </div>
            <div className="admin-form-grid3">
              <div className="admin-field">
                <label>Employment Type</label>
                <select value={form.type} onChange={setVal('type')}>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                  <option>Freelance</option>
                </select>
              </div>
              <div className="admin-field">
                <label>Work Style</label>
                <select value={form.remote} onChange={setVal('remote')}>
                  <option>On-site</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                </select>
              </div>
              <div className="admin-field">
                <label>Location</label>
                <input value={form.location} onChange={setVal('location')} placeholder="Jalalabad, Afghanistan" />
              </div>
            </div>
            <div className="admin-field">
              <label>Salary Range</label>
              <input value={form.salary_range} onChange={setVal('salary_range')} placeholder="e.g. $500 – $800 / month" />
            </div>
            <div className="admin-field">
              <label>Job Description *</label>
              <textarea required rows={4} value={form.description} onChange={setVal('description')} placeholder="Describe the role…" />
            </div>
            <div className="admin-field">
              <label>Responsibilities</label>
              <TagInput value={form.responsibilities} onChange={set('responsibilities')} placeholder="Type a responsibility and press Enter" />
            </div>
            <div className="admin-field">
              <label>Requirements</label>
              <TagInput value={form.requirements} onChange={set('requirements')} placeholder="Type a requirement and press Enter" />
            </div>
            <div className="admin-field">
              <label>Skill Tags</label>
              <TagInput value={form.tags} onChange={set('tags')} placeholder="e.g. React, Node.js" />
            </div>
            <div className="admin-field admin-toggle-field">
              <label>
                <input type="checkbox" checked={form.is_active} onChange={e => setForm(p => ({ ...p, is_active: e.target.checked }))} />
                Publish this job (visible to applicants)
              </label>
            </div>
            <div className="admin-form-actions">
              <button type="submit" className="admin-btn primary" disabled={saving}>
                {saving ? <><i className="fas fa-spinner fa-spin"></i> Saving…</> : <><i className="fas fa-save"></i> {editingId ? 'Save Changes' : 'Publish Job'}</>}
              </button>
              <button type="button" className="admin-btn ghost" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-jobs-list">
        {jobs.length === 0 && <p className="admin-empty">No jobs yet. Click "New Job" to create your first posting.</p>}
        {jobs.map(job => (
          <div className="admin-job-row" key={job.id}>
            <div className="admin-job-info">
              <div className="admin-job-title">{job.title}</div>
              <div className="admin-job-meta">
                {job.department && <span>{job.department}</span>}
                {job.type && <span>{job.type}</span>}
                {job.location && <span><i className="fas fa-map-marker-alt"></i> {job.location}</span>}
                {job.remote && <span>{job.remote}</span>}
              </div>
            </div>
            <div className="admin-job-actions">
              <span className={`admin-status-badge ${job.is_active ? 'active' : 'inactive'}`}>
                {job.is_active ? 'Live' : 'Hidden'}
              </span>
              <button className="admin-btn sm ghost" onClick={() => openEdit(job)}><i className="fas fa-edit"></i> Edit</button>
              <button className="admin-btn sm ghost" onClick={() => toggleActive(job)}>
                <i className={`fas fa-${job.is_active ? 'eye-slash' : 'eye'}`}></i> {job.is_active ? 'Hide' : 'Publish'}
              </button>
              <button className="admin-btn sm danger" onClick={() => deleteJob(job.id)}><i className="fas fa-trash"></i></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════
   ARTICLES TAB
══════════════════════════════════ */
const EMPTY_ARTICLE = {
  title: '', slug: '', category: 'General', excerpt: '', content: '',
  image_url: '', author: 'Rahimi Tech Solution', tags: [], meta_description: '', is_published: false,
}

function toSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim()
}

const ARTICLE_CATEGORIES = ['General', 'Strategy', 'Case Study', 'Government Tech', 'Healthcare', 'Education', 'Technology']

function ArticlesTab() {
  const [articles, setArticles] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState(EMPTY_ARTICLE)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  const load = useCallback(async () => {
    const { data } = await supabase.from('articles').select('*').order('created_at', { ascending: false })
    setArticles(data || [])
  }, [])

  useEffect(() => { load() }, [load])

  const openNew = () => { setForm(EMPTY_ARTICLE); setEditingId(null); setShowForm(true) }
  const openEdit = (a) => {
    setForm({
      title: a.title || '',
      slug: a.slug || '',
      category: a.category || 'General',
      excerpt: a.excerpt || '',
      content: a.content || '',
      image_url: a.image_url || '',
      author: a.author || 'Rahimi Tech Solution',
      tags: a.tags || [],
      meta_description: a.meta_description || '',
      is_published: a.is_published || false,
    })
    setEditingId(a.id)
    setShowForm(true)
  }

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    const payload = {
      ...form,
      published_at: form.is_published ? new Date().toISOString() : null,
    }
    if (editingId) {
      await supabase.from('articles').update(payload).eq('id', editingId)
      setMsg('Article updated.')
    } else {
      await supabase.from('articles').insert(payload)
      setMsg('Article published.')
    }
    setSaving(false)
    setShowForm(false)
    setEditingId(null)
    load()
    setTimeout(() => setMsg(''), 3000)
  }

  const togglePublished = async (a) => {
    await supabase.from('articles').update({ is_published: !a.is_published }).eq('id', a.id)
    load()
  }

  const deleteArticle = async (id) => {
    if (!window.confirm('Delete this article permanently?')) return
    await supabase.from('articles').delete().eq('id', id)
    load()
  }

  return (
    <div>
      <div className="admin-toolbar">
        <h2 className="admin-section-title">Articles</h2>
        <button className="admin-btn primary" onClick={openNew}>
          <i className="fas fa-plus"></i> Write New Article
        </button>
      </div>

      {msg && <div className="admin-flash">{msg}</div>}

      {showForm && (
        <div className="admin-form-card">
          <h3 className="admin-form-title">{editingId ? 'Edit Article' : 'Write New Article'}</h3>
          <form onSubmit={save}>
            <div className="admin-form-grid2">
              <div className="admin-field">
                <label>Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={e => {
                    const v = e.target.value
                    setForm(p => ({ ...p, title: v, slug: editingId ? p.slug : toSlug(v) }))
                  }}
                  placeholder="e.g. Why Afghan Businesses Need Custom Software"
                />
              </div>
              <div className="admin-field">
                <label>URL Slug *</label>
                <input
                  required
                  value={form.slug}
                  onChange={e => setForm(p => ({ ...p, slug: toSlug(e.target.value) }))}
                  placeholder="auto-generated from title"
                />
                <small style={{ color: '#888', fontSize: 12 }}>Article URL: /insights/{form.slug || 'slug'}</small>
              </div>
            </div>

            <div className="admin-form-grid2">
              <div className="admin-field">
                <label>Category</label>
                <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                  {ARTICLE_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="admin-field">
                <label>Author</label>
                <input value={form.author} onChange={e => setForm(p => ({ ...p, author: e.target.value }))} />
              </div>
            </div>

            <div className="admin-field">
              <label>Cover Image URL</label>
              <input
                value={form.image_url}
                onChange={e => setForm(p => ({ ...p, image_url: e.target.value }))}
                placeholder="https://images.unsplash.com/photo-... (paste any image link)"
              />
            </div>

            <div className="admin-field">
              <label>Excerpt <small style={{ color: '#999', fontWeight: 400 }}>(shown on the articles list page)</small></label>
              <textarea
                rows={2}
                value={form.excerpt}
                onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))}
                placeholder="1–2 sentence summary shown on the Insights listing page"
              />
            </div>

            <div className="admin-field">
              <label>Article Content</label>
              <small style={{ display: 'block', color: '#888', marginBottom: 6, fontSize: 12 }}>
                Write your full article here. Separate paragraphs with a blank line. Use ## for headings, - for bullet points.
              </small>
              <textarea
                rows={16}
                value={form.content}
                onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
                placeholder={'## Introduction\n\nWrite your first paragraph here.\n\nWrite your second paragraph here.\n\n## Why This Matters\n\nAnother section...\n\n- Bullet point one\n- Bullet point two'}
              />
            </div>

            <div className="admin-field">
              <label>SEO Meta Description <small style={{ color: '#999', fontWeight: 400 }}>(shown in Google search results, max 155 chars)</small></label>
              <input
                value={form.meta_description}
                onChange={e => setForm(p => ({ ...p, meta_description: e.target.value }))}
                placeholder="Describe this article in 1 sentence. Include keywords like 'software', 'afghanistan', etc."
                maxLength={155}
              />
            </div>

            <div className="admin-field">
              <label>Tags <small style={{ color: '#999', fontWeight: 400 }}>(keywords for SEO and filtering)</small></label>
              <TagInput
                value={form.tags}
                onChange={tags => setForm(p => ({ ...p, tags }))}
                placeholder="e.g. software, afghanistan, hospital, jalalabad"
              />
            </div>

            <div className="admin-field admin-toggle-field">
              <label>
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={e => setForm(p => ({ ...p, is_published: e.target.checked }))}
                />
                Publish this article (visible to website visitors)
              </label>
            </div>

            <div className="admin-form-actions">
              <button type="submit" className="admin-btn primary" disabled={saving}>
                {saving
                  ? <><i className="fas fa-spinner fa-spin"></i> Saving…</>
                  : <><i className="fas fa-save"></i> {editingId ? 'Save Changes' : 'Save Article'}</>
                }
              </button>
              <button type="button" className="admin-btn ghost" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-jobs-list">
        {articles.length === 0 && (
          <p className="admin-empty">No articles yet. Click "Write New Article" to publish your first post.</p>
        )}
        {articles.map(a => (
          <div className="admin-job-row" key={a.id}>
            <div className="admin-job-info">
              <div className="admin-job-title">{a.title}</div>
              <div className="admin-job-meta">
                {a.category && <span>{a.category}</span>}
                <span style={{ color: '#888', fontFamily: 'monospace', fontSize: 12 }}>/insights/{a.slug}</span>
                {a.published_at && (
                  <span><i className="fas fa-calendar"></i> {new Date(a.published_at).toLocaleDateString()}</span>
                )}
              </div>
            </div>
            <div className="admin-job-actions">
              <span className={`admin-status-badge ${a.is_published ? 'active' : 'inactive'}`}>
                {a.is_published ? 'Published' : 'Draft'}
              </span>
              <button className="admin-btn sm ghost" onClick={() => openEdit(a)}>
                <i className="fas fa-edit"></i> Edit
              </button>
              <button className="admin-btn sm ghost" onClick={() => togglePublished(a)}>
                <i className={`fas fa-${a.is_published ? 'eye-slash' : 'eye'}`}></i>
                {a.is_published ? 'Unpublish' : 'Publish'}
              </button>
              <button className="admin-btn sm danger" onClick={() => deleteArticle(a.id)}>
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════
   APPLICATIONS TAB
══════════════════════════════════ */
function ApplicationsTab() {
  const [apps, setApps] = useState([])
  const [jobs, setJobs] = useState([])
  const [filterJob, setFilterJob] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selected, setSelected] = useState(new Set())
  const [expanded, setExpanded] = useState(null)
  const [emailSubject, setEmailSubject] = useState('')
  const [emailBody, setEmailBody] = useState('')
  const [showEmail, setShowEmail] = useState(false)

  const load = useCallback(async () => {
    const [{ data: appData }, { data: jobData }] = await Promise.all([
      supabase.from('applications').select('*').order('applied_at', { ascending: false }),
      supabase.from('jobs').select('id, title'),
    ])
    setApps(appData || [])
    setJobs(jobData || [])
  }, [])

  useEffect(() => { load() }, [load])

  const filtered = apps.filter(a => {
    if (filterJob !== 'all' && a.job_id !== filterJob) return false
    if (filterStatus !== 'all' && a.status !== filterStatus) return false
    return true
  })

  const toggleSelect = (id) => setSelected(prev => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })
  const selectAll = () => setSelected(filtered.every(a => selected.has(a.id)) ? new Set() : new Set(filtered.map(a => a.id)))

  const updateStatus = async (appId, status) => {
    await supabase.from('applications').update({ status }).eq('id', appId)
    setApps(prev => prev.map(a => a.id === appId ? { ...a, status } : a))
  }

  const sendBulkEmail = () => {
    const emails = apps.filter(a => selected.has(a.id)).map(a => a.email).join(',')
    const mailto = `mailto:?bcc=${encodeURIComponent(emails)}&subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
    window.open(mailto)
  }

  const selectedEmails = apps.filter(a => selected.has(a.id)).map(a => a.email)

  return (
    <div>
      <div className="admin-toolbar">
        <h2 className="admin-section-title">Applications <span className="admin-count">{apps.length}</span></h2>
        {selected.size > 0 && (
          <button className="admin-btn primary" onClick={() => setShowEmail(v => !v)}>
            <i className="fas fa-envelope"></i> Email {selected.size} Applicant{selected.size > 1 ? 's' : ''}
          </button>
        )}
      </div>

      {showEmail && selected.size > 0 && (
        <div className="admin-email-panel">
          <h4><i className="fas fa-envelope"></i> Compose Bulk Email</h4>
          <p className="admin-email-to">To: {selectedEmails.join(', ')}</p>
          <div className="admin-field">
            <label>Subject</label>
            <input value={emailSubject} onChange={e => setEmailSubject(e.target.value)} placeholder="e.g. Update on your application at Rahimi Tech Solution" />
          </div>
          <div className="admin-field">
            <label>Message Body</label>
            <textarea rows={6} value={emailBody} onChange={e => setEmailBody(e.target.value)} placeholder="Dear Applicant,&#10;&#10;Thank you for applying to Rahimi Tech Solution…" />
          </div>
          <div className="admin-form-actions">
            <button className="admin-btn primary" onClick={sendBulkEmail} disabled={!emailSubject || !emailBody}>
              <i className="fas fa-paper-plane"></i> Open in Email Client
            </button>
            <button className="admin-btn ghost" onClick={() => setShowEmail(false)}>Close</button>
          </div>
        </div>
      )}

      <div className="admin-filters">
        <select value={filterJob} onChange={e => setFilterJob(e.target.value)}>
          <option value="all">All Jobs</option>
          {jobs.map(j => <option key={j.id} value={j.id}>{j.title}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {filtered.length === 0 && <p className="admin-empty">No applications match the current filter.</p>}

      <div className="admin-apps-table-wrap">
        {filtered.length > 0 && (
          <table className="admin-apps-table">
            <thead>
              <tr>
                <th><input type="checkbox" onChange={selectAll} checked={filtered.length > 0 && filtered.every(a => selected.has(a.id))} /></th>
                <th>Applicant</th>
                <th>Position</th>
                <th>Links</th>
                <th>Experience</th>
                <th>Status</th>
                <th>Date</th>
                <th>Resume</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(app => (
                <>
                  <tr key={app.id} className={selected.has(app.id) ? 'selected' : ''}>
                    <td><input type="checkbox" checked={selected.has(app.id)} onChange={() => toggleSelect(app.id)} /></td>
                    <td>
                      <div className="app-name">{app.name}</div>
                      <div className="app-email">{app.email}</div>
                      {app.phone && <div className="app-phone">{app.phone}</div>}
                    </td>
                    <td className="app-job">{app.job_title}</td>
                    <td>
                      <div className="app-links">
                        {app.github_url && <a href={app.github_url} target="_blank" rel="noreferrer" title="GitHub"><i className="fab fa-github"></i></a>}
                        {app.linkedin_url && <a href={app.linkedin_url} target="_blank" rel="noreferrer" title="LinkedIn"><i className="fab fa-linkedin"></i></a>}
                        {app.portfolio_url && <a href={app.portfolio_url} target="_blank" rel="noreferrer" title="Portfolio"><i className="fas fa-globe"></i></a>}
                      </div>
                    </td>
                    <td className="app-exp">{app.experience || '—'}</td>
                    <td>
                      <select
                        className="status-select"
                        value={app.status}
                        onChange={e => updateStatus(app.id, e.target.value)}
                        style={{ color: statusColors[app.status] }}
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="app-date">{new Date(app.applied_at).toLocaleDateString()}</td>
                    <td>
                      {app.resume_url
                        ? <a href={app.resume_url} target="_blank" rel="noreferrer" className="admin-btn sm ghost"><i className="fas fa-file-pdf"></i> CV</a>
                        : <span style={{ color: '#ccc' }}>—</span>
                      }
                    </td>
                    <td>
                      <button className="admin-btn sm ghost" onClick={() => setExpanded(expanded === app.id ? null : app.id)}>
                        <i className={`fas fa-chevron-${expanded === app.id ? 'up' : 'down'}`}></i>
                      </button>
                    </td>
                  </tr>
                  {expanded === app.id && (
                    <tr key={`${app.id}-exp`} className="app-detail-row">
                      <td colSpan={9}>
                        <div className="app-detail-box">
                          {app.cover_letter
                            ? <><strong>Cover Letter:</strong><p>{app.cover_letter}</p></>
                            : <p style={{ color: '#999' }}>No cover letter submitted.</p>
                          }
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

/* ══════════════════════════════════
   ROOT ADMIN PAGE
══════════════════════════════════ */
export default function Admin() {
  const [authed, setAuthed]   = useState(false)
  const [checking, setChecking] = useState(true)
  const [step, setStep]       = useState('password') // 'password' | 'otp'
  const [email, setEmail]     = useState('')
  const [pw, setPw]           = useState('')
  const [otp, setOtp]         = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [tab, setTab]         = useState('articles')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAuthed(!!data.session)
      setChecking(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setAuthed(!!session)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handlePassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.signInWithPassword({ email, password: pw })
    if (err) {
      setError('Incorrect email or password.')
      setLoading(false)
      return
    }
    // Password correct — sign out immediately, then send OTP as second factor
    await supabase.auth.signOut()
    const { error: otpErr } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false },
    })
    if (otpErr) {
      setError('Could not send verification code. Please try again.')
      setLoading(false)
      return
    }
    setOtpSent(true)
    setStep('otp')
    setLoading(false)
  }

  const handleOtp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error: err } = await supabase.auth.verifyOtp({ email, token: otp, type: 'email' })
    if (err) {
      setError('Invalid or expired code. Please try again.')
      setLoading(false)
      return
    }
    setAuthed(true)
    setLoading(false)
  }

  const resendOtp = async () => {
    setError('')
    setOtpSent(false)
    await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } })
    setOtpSent(true)
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setAuthed(false)
    setStep('password')
    setEmail('')
    setPw('')
    setOtp('')
    setError('')
  }

  if (checking) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh' }}>
      <i className="fas fa-spinner fa-spin" style={{ fontSize:36, color:'var(--brand)' }}></i>
    </div>
  )

  if (!authed && step === 'otp') return (
    <div className="admin-login-page">
      <form className="admin-login-card" onSubmit={handleOtp}>
        <div className="admin-login-logo">
          <span className="logo-rts-sm">RTS</span>
        </div>
        <h2>Check Your Email</h2>
        <p>
          {otpSent
            ? <>A 6-digit code was sent to <strong>{email}</strong>. Enter it below.</>
            : <>Enter the code sent to <strong>{email}</strong>.</>
          }
        </p>
        <div className="admin-field">
          <label>Verification Code</label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
            placeholder="000000"
            autoFocus
            style={{ letterSpacing:'0.3em', fontSize:24, textAlign:'center', fontWeight:700 }}
          />
        </div>
        {error && <p className="admin-pw-error"><i className="fas fa-exclamation-circle"></i> {error}</p>}
        <button type="submit" className="admin-btn primary full" disabled={loading || otp.length < 6}>
          {loading
            ? <><i className="fas fa-spinner fa-spin"></i> Verifying…</>
            : <><i className="fas fa-shield-alt"></i> Verify &amp; Sign In</>
          }
        </button>
        <div className="admin-otp-footer">
          <button type="button" className="admin-text-btn" onClick={() => { setStep('password'); setOtp(''); setError('') }}>
            ← Back
          </button>
          <button type="button" className="admin-text-btn" onClick={resendOtp}>
            Resend code
          </button>
        </div>
      </form>
    </div>
  )

  if (!authed) return (
    <div className="admin-login-page">
      <form className="admin-login-card" onSubmit={handlePassword}>
        <div className="admin-login-logo">
          <span className="logo-rts-sm">RTS</span>
        </div>
        <h2>Admin Panel</h2>
        <p>Rahimi Tech Solution — Internal Access Only</p>
        <div className="admin-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="admin@rahimitechsolution.com"
            required
            autoFocus
          />
        </div>
        <div className="admin-field">
          <label>Password</label>
          <input
            type="password"
            value={pw}
            onChange={e => setPw(e.target.value)}
            placeholder="Enter admin password"
            required
          />
        </div>
        {error && <p className="admin-pw-error"><i className="fas fa-exclamation-circle"></i> {error}</p>}
        <button type="submit" className="admin-btn primary full" disabled={loading}>
          {loading
            ? <><i className="fas fa-spinner fa-spin"></i> Checking…</>
            : <><i className="fas fa-arrow-right"></i> Continue</>
          }
        </button>
      </form>
    </div>
  )

  return (
    <div className="inner-page">
      <div className="page-banner admin-banner">
        <div className="container">
          <div className="admin-banner-row">
            <div>
              <h1>Admin <span>Panel</span></h1>
              <p>Manage articles, job listings and applicant reviews for Rahimi Tech Solution.</p>
              <div className="breadcrumb">
                <Link to="/">Home</Link><span className="sep">›</span><span>Admin</span>
              </div>
            </div>
            <button className="btn btn-outline-white admin-signout-btn" onClick={logout}>
              <i className="fas fa-sign-out-alt"></i> Sign Out
            </button>
          </div>
        </div>
      </div>

      <section className="ip-section admin-main-section">
        <div className="container">
          <div className="admin-tabs">
            <button className={`admin-tab${tab === 'articles' ? ' active' : ''}`} onClick={() => setTab('articles')}>
              <i className="fas fa-newspaper"></i> Articles
            </button>
            <button className={`admin-tab${tab === 'jobs' ? ' active' : ''}`} onClick={() => setTab('jobs')}>
              <i className="fas fa-briefcase"></i> Jobs
            </button>
            <button className={`admin-tab${tab === 'applications' ? ' active' : ''}`} onClick={() => setTab('applications')}>
              <i className="fas fa-users"></i> Applications
            </button>
          </div>
          <div className="admin-content">
            {tab === 'articles' && <ArticlesTab />}
            {tab === 'jobs' && <JobsTab />}
            {tab === 'applications' && <ApplicationsTab />}
          </div>
        </div>
      </section>
    </div>
  )
}
