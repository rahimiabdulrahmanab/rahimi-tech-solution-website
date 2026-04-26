import { useState } from 'react'
import { Link } from 'react-router-dom'
import './InnerPage.css'

const testimonials = [
  { name:'James Thornton', role:'CEO, Greenfield Logistics', text:'Rahimi Tech transformed our dispatch system from a paper nightmare into a fully automated platform. Delivery times improved by 40% in the first quarter. Exceptional team.', stars:5, avatar:'JT' },
  { name:'Sarah Kim', role:'Operations Director, MedCore BC', text:'Their team delivered our patient management portal on time, within budget, and with exceptional attention to HIPAA compliance. I would not hesitate to work with them again.', stars:5, avatar:'SK' },
  { name:'David Patel', role:'Founder, AutoDealer Group', text:'The custom DMS they built for our 6 dealerships has become essential. Real-time inventory, finance integrations and a mobile app. Exactly what we envisioned and more.', stars:5, avatar:'DP' },
  { name:'Emily Chen', role:'CTO, Shopify Partner Agency', text:'World-class React and Node.js team. They took our legacy codebase and rebuilt it to modern standards without disrupting ongoing operations. Remarkable performance.', stars:5, avatar:'EC' },
  { name:'Michael Torres', role:'Director of IT, BC Health Network', text:'When we needed to migrate 40 servers to Azure with zero downtime, Rahimi Tech delivered flawlessly. Their cloud expertise is among the best in the province.', stars:5, avatar:'MT' },
  { name:'Lisa Wong', role:'CEO, ShopNorth', text:'Our eCommerce platform handles 5,000+ daily orders thanks to the scalable architecture Rahimi Tech designed and built. Revenue is up 60% since launch.', stars:5, avatar:'LW' },
  { name:'Robert Janssen', role:'IT Manager, Coastal Credit Union', text:'The mobile banking app they built for us has a 4.8-star rating on both app stores. Our members love it, and our support tickets dropped by 35%.', stars:5, avatar:'RJ' },
  { name:'Anika Desai', role:'Head of Engineering, DataMetrics', text:'Professional, fast, and genuinely cares about the outcome. They became a true extension of our team rather than just a vendor.', stars:5, avatar:'AD' },
]

export function Testimonials() {
  return (
    <div className="inner-page">
      <div className="page-banner">
        <div className="container">
          <h1>Client <span>Testimonials</span></h1>
          <p>Hear what our clients across BC and Canada have to say about working with Rahimi Tech.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span className="sep">›</span><span>Testimonials</span>
          </div>
        </div>
      </div>
      <section className="ip-section">
        <div className="container">
          <div className="section-header">
            <span className="tag">Reviews</span>
            <h2>What Clients <span>Say About Us</span></h2>
          </div>
          <div className="testi-page-grid">
            {testimonials.map((t, i) => (
              <div className="testi-page-card" key={i}>
                <div className="stars">
                  {[...Array(t.stars)].map((_, si) => <i key={si} className="fas fa-star"></i>)}
                </div>
                <q>{t.text}</q>
                <div className="testi-page-profile">
                  <div className="testi-page-avatar">{t.avatar}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <small>{t.role}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="ip-cta">
        <div className="container">
          <h2>Ready to Be Our Next <span>Success Story?</span></h2>
          <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap',marginTop:'28px'}}>
            <Link to="/contact" className="btn btn-accent">Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const partners = [
  { icon:'fab fa-microsoft', name:'Microsoft', desc:'Silver cloud partner for Azure services and Microsoft 365 deployments.' },
  { icon:'fab fa-aws', name:'Amazon AWS', desc:'AWS partner providing cloud migration, architecture, and managed services.' },
  { icon:'fab fa-google', name:'Google Cloud', desc:'GCP partner for data analytics, ML, and cloud infrastructure.' },
  { icon:'fab fa-apple', name:'Apple Developer', desc:'Registered Apple developer for iOS and macOS app development.' },
  { icon:'fab fa-github', name:'GitHub Enterprise', desc:'Official GitHub partner for source control and CI/CD pipelines.' },
  { icon:'fab fa-docker', name:'Docker & CNCF', desc:'Container technology and cloud-native certified practitioners.' },
  { icon:'fab fa-shopify', name:'Shopify Partners', desc:'Shopify expert and agency partner for eCommerce development.' },
  { icon:'fab fa-salesforce', name:'Salesforce', desc:'CRM integration and Salesforce development partner.' },
]

export function Partners() {
  return (
    <div className="inner-page">
      <div className="page-banner">
        <div className="container">
          <h1>Our <span>Partners</span></h1>
          <p>We work with world-class technology providers to deliver the best solutions for our clients.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span className="sep">›</span><span>Partners</span>
          </div>
        </div>
      </div>
      <section className="ip-section">
        <div className="container">
          <div className="section-header">
            <span className="tag">Technology Partners</span>
            <h2>Our Trusted <span>Partners</span></h2>
            <p>Strategic partnerships with leading technology vendors allow us to deliver certified, best-in-class solutions.</p>
          </div>
          <div className="partners-grid">
            {partners.map((p, i) => (
              <div className="partner-card" key={i}>
                <i className={p.icon}></i>
                <strong>{p.name}</strong>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="ip-cta">
        <div className="container">
          <h2>Interested in <span>Partnering?</span></h2>
          <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap',marginTop:'28px'}}>
            <Link to="/contact" className="btn btn-accent">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export function Contact() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', service:'', message:'' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('https://formspree.io/f/xblgjqzd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || 'Not provided',
          service: form.service || 'Not specified',
          message: form.message,
          _replyto: form.email,
          _subject: `New enquiry from ${form.name}: ${form.service || 'General'}`,
        }),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        setError(true)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  const locations = [
    {
      city: 'Richmond, BC',
      country: 'Canada',
      address: '7297 Moffatt Road, Richmond BC',
      phone: '+1 (604) 841-3186',
      email: 'info@rahimitechsolution.com',
      mapsQuery: '49.159892907302,-123.14520339324754',
      mapsLink: 'https://www.google.com/maps/search/?api=1&query=49.159892907302%2C-123.14520339324754',
    },
    {
      city: 'Jalalabad',
      country: 'Afghanistan',
      address: 'Mia Aslam Plaza, Jalalabad City',
      phone: '+93 (767) 617-184',
      email: 'info@rahimitechsolution.com',
      mapsQuery: '34.43080279832595,70.46200933493083',
      mapsLink: 'https://www.google.com/maps/search/?api=1&query=34.43080279832595%2C70.46200933493083',
    },
  ]

  return (
    <div className="inner-page">
      <div className="page-banner contact-hero">
        <div className="container">
          <h1>Contact <span>Us</span></h1>
          <p>Talk to Rahimi Tech Solution about software development, infrastructure, or managed IT support.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span className="sep">›</span><span>Contact</span>
          </div>
        </div>
      </div>

      <section className="ip-section contact-locations-section" style={{ paddingTop: 70, paddingBottom: 32 }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 34 }}>
            <span className="tag">Our Locations</span>
            <h2>Reach Rahimi Tech in <span>Canada & Afghanistan</span></h2>
            <p>We support organizations from Richmond, BC and maintain project-facing communication for Afghanistan through our Jalalabad contact point.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 28 }}>
            {locations.map((loc) => (
              <div
                key={loc.city}
                style={{
                  background: '#fff',
                  borderRadius: 18,
                  overflow: 'hidden',
                  boxShadow: '0 14px 34px rgba(15, 47, 58, 0.10)',
                  border: '1px solid rgba(26,74,92,0.10)',
                }}
              >
                <div style={{ position: 'relative', height: 255, background: '#eaf1f3' }}>
                  <iframe
                    title={`${loc.city} map`}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(loc.mapsQuery)}&z=12&output=embed`}
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: 'block' }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                  <a
                    href={loc.mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      position: 'absolute',
                      top: 14,
                      left: 14,
                      background: 'rgba(255,255,255,0.96)',
                      color: 'var(--brand)',
                      padding: '9px 14px',
                      borderRadius: 10,
                      fontSize: 14,
                      fontWeight: 700,
                      boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
                    }}
                  >
                    Open in Maps <i className="fas fa-external-link-alt" style={{ marginLeft: 6, fontSize: 12 }}></i>
                  </a>
                </div>

                <div style={{ padding: 24 }}>
                  <div
                    style={{
                      background: 'linear-gradient(135deg, var(--brand), var(--brand-mid))',
                      color: '#fff',
                      borderRadius: 16,
                      padding: '14px 18px',
                      fontFamily: 'var(--font-head)',
                      fontWeight: 800,
                      fontSize: 28,
                      textTransform: 'uppercase',
                      letterSpacing: '.04em',
                      marginBottom: 18,
                    }}
                  >
                    {loc.city}
                  </div>

                  <div style={{ color: '#3f4a4d', fontSize: 16, lineHeight: 1.75 }}>
                    <p style={{ marginBottom: 10 }}><strong style={{ color: '#111' }}>{loc.country}</strong></p>
                    <p style={{ marginBottom: 12 }}>{loc.address}</p>
                    <p style={{ marginBottom: 8 }}>
                      <i className="fas fa-phone-alt" style={{ color: 'var(--accent)', marginRight: 10 }}></i>
                      <a href={`tel:${loc.phone.replace(/[^\d+]/g, '')}`} style={{ color: '#111', fontWeight: 700 }}>{loc.phone}</a>
                    </p>
                    <p style={{ marginBottom: 0 }}>
                      <i className="fas fa-envelope" style={{ color: 'var(--accent)', marginRight: 10 }}></i>
                      <a href={`mailto:${loc.email}`} style={{ color: '#111', fontWeight: 700 }}>{loc.email}</a>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ip-section contact-connect-section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="contact-connect-grid">
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(93,202,165,0.12), rgba(26,74,92,0.06))',
                borderRadius: 24,
                padding: 32,
                border: '1px solid rgba(26,74,92,0.08)',
                minHeight: 100,
              }}
            >
              <div style={{ fontSize: 54, color: 'var(--accent)', marginBottom: 18 }}>
                <i className="fas fa-paper-plane"></i>
              </div>
              <h3 style={{ fontFamily: 'var(--font-head)', fontSize: 34, lineHeight: 1.15, marginBottom: 16, color: '#111' }}>
                Keep in <span style={{ color: 'var(--accent)' }}>Touch</span>
              </h3>
              <p style={{ color: '#4b5558', fontSize: 16, lineHeight: 1.85, marginBottom: 18 }}>
                Rahimi Tech Solution builds custom software, infrastructure systems, and practical digital tools for real organizations. Send us your project details and we will get back to you.
              </p>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'grid', gap: 14 }}>
                <li style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <i className="fas fa-map-marker-alt" style={{ color: 'var(--accent)', marginTop: 4 }}></i>
                  <span style={{ color: '#222' }}>Richmond, BC, Canada and Jalalabad, Afghanistan</span>
                </li>
                <li style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <i className="fas fa-phone-alt" style={{ color: 'var(--accent)', marginTop: 4 }}></i>
                  <span style={{ color: '#222' }}>+1 (604) 841-3186</span>
                </li>
                <li style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <i className="fas fa-envelope" style={{ color: 'var(--accent)', marginTop: 4 }}></i>
                  <span style={{ color: '#222' }}>info@rahimitechsolution.com</span>
                </li>
              </ul>
            </div>

            <div className="contact-form-card">
              {submitted ? (
                <div className="form-success-state">
                  <i className="fas fa-check-circle"></i>
                  <h4>Message Sent!</h4>
                  <p>Thanks for reaching out. We will get back to you within one business day.</p>
                </div>
              ) : (
                <>
                  <h3>Send a Message</h3>
                  <p>Tell us what you need and our team will be in touch shortly.</p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label>Full Name <span style={{color:'#e53e3e'}}>*</span></label>
                      <input
                        type="text"
                        placeholder="Jane Smith"
                        required
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      />
                    </div>
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Email <span style={{color:'#e53e3e'}}>*</span></label>
                        <input
                          type="email"
                          placeholder="jane@example.com"
                          required
                          value={form.email}
                          onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone</label>
                        <input
                          type="tel"
                          placeholder="+1 (604) 555-0100"
                          value={form.phone}
                          onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Service of Interest</label>
                      <select
                        value={form.service}
                        onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                      >
                        <option value="">Select a service...</option>
                        <option>Software Development</option>
                        <option>Data Center & Infrastructure</option>
                        <option>Mobile App Development</option>
                        <option>Cloud Migration</option>
                        <option>Cybersecurity</option>
                        <option>IT Consulting</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Message <span style={{color:'#e53e3e'}}>*</span></label>
                      <textarea
                        placeholder="Tell us about your project or question..."
                        required
                        rows={5}
                        value={form.message}
                        onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                      />
                    </div>
                    {error && (
                      <p style={{ color:'#e53e3e', fontSize:14, marginBottom:12 }}>
                        <i className="fas fa-exclamation-circle" style={{ marginRight:6 }}></i>
                        Something went wrong. Please email us directly at info@rahimitechsolution.com
                      </p>
                    )}
                    <button type="submit" className="btn btn-primary" style={{ width:'100%', justifyContent:'center', height:50 }} disabled={loading}>
                      {loading
                        ? <><i className="fas fa-spinner fa-spin"></i> Sending…</>
                        : <><i className="fas fa-paper-plane"></i> Send Message</>
                      }
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export function Terms() {
  return (
    <div className="inner-page">
      <div className="page-banner">
        <div className="container">
          <h1>Terms & <span>Conditions</span></h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span className="sep">›</span><span>Terms & Conditions</span>
          </div>
        </div>
      </div>
      <section className="ip-section">
        <div className="container">
          <div className="legal-content">
            <div className="legal-meta">Last updated: January 1, 2025. These terms govern your use of Rahimi Tech Solution services and website.</div>
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using any service provided by Rahimi Tech Solution ("RTS," "we," "us," or "our"), you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
            <h2>2. Services</h2>
            <p>Rahimi Tech Solution provides software development, IT infrastructure, cloud services, and related consulting services to businesses. Specific terms for each engagement are defined in individual service agreements or statements of work (SOW).</p>
            <h2>3. Intellectual Property</h2>
            <p>Unless otherwise specified in a written agreement, all deliverables, code, designs, and documentation created by RTS for a client become the property of the client upon full payment. RTS retains the right to display the work in portfolios unless a non-disclosure agreement is in place.</p>
            <h2>4. Confidentiality</h2>
            <p>Both parties agree to keep confidential any proprietary information shared during the course of an engagement. This obligation survives termination of the service agreement.</p>
            <h2>5. Payment Terms</h2>
            <p>Payment terms are defined in individual project agreements. Standard terms are net 30 days from invoice date. Late payments may incur interest charges as outlined in the applicable agreement.</p>
            <h2>6. Limitation of Liability</h2>
            <p>To the maximum extent permitted by applicable law, RTS shall not be liable for indirect, incidental, special, consequential, or punitive damages arising out of or related to the use of our services. Our total liability shall not exceed the fees paid for the specific service giving rise to the claim.</p>
            <h2>7. Governing Law</h2>
            <p>These terms are governed by the laws of the Province of British Columbia, Canada. Any disputes shall be resolved in the courts of British Columbia.</p>
            <h2>8. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of the updated terms.</p>
            <h2>9. Contact</h2>
            <p>For questions about these terms, contact us at <a href="mailto:info@rahimitechsolution.com">info@rahimitechsolution.com</a> or visit our <Link to="/contact">contact page</Link>.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export function Privacy() {
  return (
    <div className="inner-page">
      <div className="page-banner">
        <div className="container">
          <h1>Privacy <span>Policy</span></h1>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span className="sep">›</span><span>Privacy Policy</span>
          </div>
        </div>
      </div>
      <section className="ip-section">
        <div className="container">
          <div className="legal-content">
            <div className="legal-meta">Last updated: January 23, 2025. Rahimi Tech Solution is committed to protecting your privacy in compliance with PIPEDA (Canada).</div>
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly, such as your name, email address, phone number and project details when you fill out our contact or application forms. We also collect usage data about how you interact with our website.</p>
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to respond to inquiries, provide services, improve our website, process job applications and send relevant communications. We do not sell your personal information to third parties.</p>
            <h2>3. Cookies and Tracking</h2>
            <p>Our website uses cookies to improve user experience and analyze traffic. You can control cookie settings through your browser. We use analytics tools such as Google Analytics to understand how visitors use our site.</p>
            <h2>4. Data Retention</h2>
            <p>We retain personal data only as long as necessary to provide services or as required by law. You may request deletion of your data at any time by contacting us.</p>
            <h2>5. Data Security</h2>
            <p>We implement industry-standard security measures to protect your information from unauthorized access, disclosure, or misuse. However, no method of transmission over the internet is 100% secure.</p>
            <h2>6. Your Rights (PIPEDA)</h2>
            <p>Under Canada's PIPEDA, you have the right to access, correct, or request deletion of your personal information. To exercise these rights, contact us at <a href="mailto:privacy@rahimitechsolution.com">privacy@rahimitechsolution.com</a>.</p>
            <h2>7. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their policies.</p>
            <h2>8. Contact</h2>
            <p>For privacy-related questions, contact us at <a href="mailto:info@rahimitechsolution.com">info@rahimitechsolution.com</a>.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

const posts = [
  { img:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=75', cat:'Infrastructure', title:'Data Center Best Practices for BC Businesses in 2025', date:'March 12, 2025', desc:'On-premise vs cloud vs hybrid? We break down the key factors that should drive your data center strategy in 2025.' },
  { img:'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=900&q=75', cat:'Development', title:'Modern Web Development: Building to Scale in 2025', date:'February 28, 2025', desc:'Modern web development helps organizations build secure, scalable, and responsive platforms with less technical debt.' },
  { img:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=75', cat:'Marketing', title:'Mastering Digital Marketing: Strategies for Online Success', date:'February 14, 2025', desc:'Digital marketing helps businesses build visibility, reach the right audience, and turn traffic into real leads.' },
  { img:'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&q=75', cat:'Cloud', title:'AWS vs Azure vs Google Cloud: Which Is Right for Your BC Business?', date:'January 30, 2025', desc:'A clear, no-fluff comparison of the three major cloud platforms to help Canadian businesses make an informed choice.' },
  { img:'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=900&q=75', cat:'eCommerce', title:'How to Build an eCommerce Platform That Scales to 10,000 Orders/Day', date:'January 15, 2025', desc:'Architecture patterns and technology choices that allow eCommerce platforms to grow without breaking under load.' },
  { img:'https://images.unsplash.com/photo-1487611459768-bd414656ea10?w=900&q=75', cat:'Security', title:'Cybersecurity Basics Every Canadian SMB Must Know in 2025', date:'December 20, 2024', desc:'Practical, actionable cybersecurity steps that every small and medium-sized business should implement immediately.' },
]

export function Insights() {
  return (
    <div className="inner-page">
      <div className="page-banner insights-hero">
        <div className="container">
          <h1>IT <span>Insights</span></h1>
          <p>Articles, guides, and technical perspectives from the Rahimi Tech team.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link><span className="sep">›</span><span>Insights</span>
          </div>
        </div>
      </div>
      <section className="ip-section">
        <div className="container">
          <div className="section-header">
            <span className="tag">Latest Articles</span>
            <h2>Insights & <span>Resources</span></h2>
          </div>
          <div className="insights-grid">
            {posts.map((p, i) => (
              <div className="blog-card" key={i} style={{background:'#fff',boxShadow:'var(--shadow-sm)',borderRadius:'var(--radius)',overflow:'hidden',transition:'var(--transition)',display:'flex',flexDirection:'column'}}>
                <div style={{height:220,overflow:'hidden'}}>
                  <img src={p.img} alt={p.title} loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover',transition:'transform .45s ease'}} />
                </div>
                <div style={{padding:'24px',flex:1,display:'flex',flexDirection:'column'}}>
                  <div style={{display:'flex',gap:10,marginBottom:12,alignItems:'center'}}>
                    <span style={{background:'rgba(93,202,165,.1)',color:'var(--accent)',padding:'3px 10px',borderRadius:20,fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'.1em'}}>{p.cat}</span>
                    <span style={{fontSize:12,color:'#999'}}>{p.date}</span>
                  </div>
                  <h4 style={{fontFamily:'var(--font-head)',fontSize:18,fontWeight:700,marginBottom:12,lineHeight:1.35,flex:1}}>
                    <a href="#" style={{color:'#111',transition:'var(--transition)'}}>{p.title}</a>
                  </h4>
                  <p style={{fontSize:14,color:'#555',lineHeight:1.7,marginBottom:18}}>{p.desc}</p>
                  <a href="#" style={{display:'inline-flex',alignItems:'center',gap:8,background:'linear-gradient(135deg,var(--brand-dark),var(--brand))',color:'#fff',padding:'9px 18px',borderRadius:3,fontSize:13,fontWeight:700,fontFamily:'var(--font-head)',alignSelf:'flex-start'}}>
                    Read More <i className="fas fa-arrow-right" style={{fontSize:11}}></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Testimonials
