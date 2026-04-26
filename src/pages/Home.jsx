import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import './Home.css'

function useCounter(target, started) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!started) return

    let current = 0
    const step = Math.max(1, Math.ceil(target / 55))
    const id = setInterval(() => {
      current = Math.min(current + step, target)
      setValue(current)
      if (current >= target) clearInterval(id)
    }, 35)

    return () => clearInterval(id)
  }, [started, target])

  return value
}

function StatsBar() {
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true)
      },
      { threshold: 0.25 }
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  const years = useCounter(11, started)
  const projects = useCounter(150, started)
  const team = useCounter(25, started)
  const clients = useCounter(80, started)

  return (
    <div className="top-feat" ref={ref}>
      <div className="feat-row">
        {[
          { n: years, label: 'Years of Experience' },
          { n: projects, label: 'Projects Completed' },
          { n: team, label: 'Team Members' },
          { n: clients, label: 'Happy Clients' },
        ].map((stat, index) => (
          <div className="top-featcard" key={index}>
            <strong>{stat.n}+</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const industries = [
  { img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80', label: 'Healthcare' },
  { img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80', label: 'Education' },
  { img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80', label: 'Government & IT' },
  { img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80', label: 'Banking & Finance' },
  { img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80', label: 'Automotive' },
  { img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80', label: 'Real Estate' },
  { img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80', label: 'Logistics' },
  { img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80', label: 'Hospitality' },
]

function IndustryCarousel() {
  const outerRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const outer = outerRef.current
    const track = trackRef.current
    if (!outer || !track) return undefined

    const reducedMotionMedia = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotionMedia.matches) return undefined

    const isMobile = () => window.matchMedia('(max-width: 767px)').matches
    const cards = industries.length
    let index = 0
    let intervalId

    const getCardStep = (el) => {
      const firstCard = el.querySelector('.f-slider')
      if (!firstCard) return 0
      const gap = parseFloat(window.getComputedStyle(el).gap || 0)
      return firstCard.getBoundingClientRect().width + gap
    }

    const moveSlide = () => {
      if (isMobile()) {
        // Mobile: animate scrollLeft on the outer scroll container
        const step = getCardStep(track)
        if (!step) return
        index += 1
        if (index >= cards) index = 0
        outer.scrollTo({ left: index * step, behavior: 'smooth' })
      } else {
        // Desktop: translate the entire track
        const step = getCardStep(track)
        if (!step) return
        index += 1
        track.style.transition = 'transform 0.75s ease'
        track.style.transform = `translateX(-${index * step}px)`
        if (index >= cards) {
          window.setTimeout(() => {
            track.style.transition = 'none'
            index = 0
            track.style.transform = 'translateX(0)'
          }, 780)
        }
      }
    }

    intervalId = window.setInterval(moveSlide, 3000)

    const handleResize = () => {
      index = 0
      track.style.transition = 'none'
      track.style.transform = 'translateX(0)'
      outer.scrollTo({ left: 0, behavior: 'instant' })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const items = [...industries, ...industries]

  return (
    <div className="ind-slider-outer" ref={outerRef}>
      <div className="ind-slider-track" ref={trackRef}>
        {items.map((industry, index) => (
          <div className="f-slider" key={`${industry.label}-${index}`}>
            <div className="img-wrap">
              <div className="industry-img">
                <img src={industry.img} alt={industry.label} loading="lazy" />
              </div>
            </div>
            <div className="f-detail">
              <strong>{industry.label}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const techTabs = [
  { id: 'mobile', label: 'Mobile', items: [{ icon: 'fab fa-apple', name: 'iOS' }, { icon: 'fab fa-android', name: 'Android' }, { icon: 'fas fa-mobile-alt', name: 'Swift' }, { icon: 'fab fa-react', name: 'React Native' }, { icon: 'fas fa-mobile-alt', name: 'Flutter' }, { icon: 'fas fa-code', name: 'Xamarin' }, { icon: 'fas fa-code', name: 'Kotlin' }, { icon: 'fas fa-code', name: 'Native Scripts' }] },
  { id: 'frontend', label: 'Front-End', items: [{ icon: 'fab fa-react', name: 'React.js' }, { icon: 'fab fa-vuejs', name: 'Vue.js' }, { icon: 'fab fa-angular', name: 'Angular' }, { icon: 'fab fa-js', name: 'Next.js' }, { icon: 'fab fa-html5', name: 'HTML5 / CSS3' }, { icon: 'fab fa-js', name: 'TypeScript' }, { icon: 'fab fa-bootstrap', name: 'Tailwind CSS' }, { icon: 'fas fa-paint-brush', name: 'Svelte' }] },
  { id: 'backend', label: 'Back-End', items: [{ icon: 'fab fa-node-js', name: 'Node.js' }, { icon: 'fab fa-python', name: 'Python' }, { icon: 'fas fa-code', name: 'Laravel' }, { icon: 'fas fa-server', name: 'ASP.NET' }, { icon: 'fab fa-java', name: 'Java / Spring' }, { icon: 'fab fa-php', name: 'PHP' }, { icon: 'fas fa-gem', name: 'Ruby on Rails' }, { icon: 'fas fa-bolt', name: 'FastAPI' }] },
  { id: 'database', label: 'Database', items: [{ icon: 'fas fa-database', name: 'MySQL' }, { icon: 'fas fa-database', name: 'PostgreSQL' }, { icon: 'fas fa-leaf', name: 'MongoDB' }, { icon: 'fas fa-fire', name: 'Redis' }, { icon: 'fas fa-database', name: 'SQLite' }, { icon: 'fas fa-database', name: 'SQL Server' }] },
  { id: 'webtech', label: 'Web Tech', items: [{ icon: 'fas fa-exchange-alt', name: 'REST API' }, { icon: 'fas fa-project-diagram', name: 'GraphQL' }, { icon: 'fab fa-wordpress', name: 'WordPress' }, { icon: 'fas fa-shopping-cart', name: 'Shopify' }, { icon: 'fas fa-exchange-alt', name: 'tRPC' }, { icon: 'fas fa-code', name: 'WebSockets' }] },
  { id: 'automation', label: 'Automation / QA', items: [{ icon: 'fas fa-vial', name: 'QA Testing' }, { icon: 'fas fa-robot', name: 'Automation' }, { icon: 'fas fa-bug', name: 'Bug Tracking' }, { icon: 'fas fa-check-double', name: 'Test Cases' }, { icon: 'fas fa-code-branch', name: 'CI Testing' }, { icon: 'fas fa-tachometer-alt', name: 'Performance QA' }] },
  { id: 'cloud', label: 'Cloud & Server', items: [{ icon: 'fab fa-aws', name: 'AWS' }, { icon: 'fab fa-microsoft', name: 'Azure' }, { icon: 'fab fa-google', name: 'Google Cloud' }, { icon: 'fas fa-cloud', name: 'DigitalOcean' }, { icon: 'fas fa-server', name: 'Linux Server' }, { icon: 'fas fa-network-wired', name: 'Cisco / VMware' }] },
  { id: 'devops', label: 'DevOps', items: [{ icon: 'fab fa-docker', name: 'Docker' }, { icon: 'fas fa-dharmachakra', name: 'Kubernetes' }, { icon: 'fab fa-git-alt', name: 'Git / GitHub' }, { icon: 'fas fa-infinity', name: 'CI / CD Pipeline' }, { icon: 'fas fa-shield-alt', name: 'Nginx' }, { icon: 'fab fa-linux', name: 'Linux' }] },
]

const hireCards = [
  { img: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=300&q=70', title: 'Web Design & Development' },
  { img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&q=70', title: 'Custom Application Development' },
  { img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&q=70', title: 'Mobile App Development' },
  { img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&q=70', title: 'Data Center & Infrastructure' },
  { img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&q=70', title: 'Cloud Migration & Hosting' },
  { img: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=300&q=70', title: 'IT Consulting & Managed Services' },
  { img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=300&q=70', title: 'IT Outsourcing' },
  { img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&q=70', title: 'Business Process Automation' },
  { img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&q=70', title: 'Cybersecurity Solutions' },
]

const whyCards = [
  {
    icon: 'fas fa-medal',
    title: 'We See Projects Through',
    desc: "We have built and delivered systems for hospitals, schools and government offices that are still running years later. We plan properly, build carefully and don't disappear after launch.",
  },
  {
    icon: 'fas fa-map-marker-alt',
    title: 'We Know Afghanistan',
    desc: "Our team is based in Jalalabad. We understand the local infrastructure, the connectivity realities and how Afghan businesses actually operate. We build software that fits.",
  },
  {
    icon: 'fas fa-globe',
    title: 'Built to Global Standards',
    desc: 'Our Canadian office connects us to international development practices. The code we write in Jalalabad is held to the same standards as software built anywhere in the world.',
  },
  {
    icon: 'fas fa-headset',
    title: 'One Team, Start to Finish',
    desc: "The same people who plan your project are the ones who build it and support it afterward. No handoffs, no gaps. You always know who to call.",
  },
]

const capCards = [
  {
    icon: 'fas fa-landmark',
    title: 'Government & Public Sector',
    desc: 'Citizen portals, tax systems, national registries and administrative dashboards. We have worked with government bodies and understand what these systems need to do reliably.',
  },
  {
    icon: 'fas fa-university',
    title: 'Banking & Financial Systems',
    desc: 'Money exchange management, core banking, digital wallets and payment tools. Built with the security and audit trails that financial institutions require.',
  },
  {
    icon: 'fas fa-hospital',
    title: 'Hospital & Healthcare',
    desc: 'Patient records, pharmacy management, appointment scheduling, billing and clinical reporting. Systems that hospital staff can use without a training manual.',
  },
  {
    icon: 'fas fa-graduation-cap',
    title: 'Education & Schools',
    desc: 'Attendance management, student portals, result systems and admin tools for schools, colleges and universities across Afghanistan.',
  },
  {
    icon: 'fas fa-handshake',
    title: 'NGOs & Organizations',
    desc: 'Volunteer tracking, donor management, field reporting and project dashboards for non-profits and international NGOs working in Afghanistan.',
  },
  {
    icon: 'fas fa-truck',
    title: 'Logistics & Supply Chain',
    desc: 'Fleet tracking, warehouse management, delivery systems and inventory control for businesses moving goods across Afghanistan.',
  },
]

const clientSectors = [
  { icon: 'fas fa-landmark', label: 'Government' },
  { icon: 'fas fa-university', label: 'Banking' },
  { icon: 'fas fa-hospital', label: 'Healthcare' },
  { icon: 'fas fa-graduation-cap', label: 'Education' },
  { icon: 'fas fa-handshake', label: 'NGOs' },
  { icon: 'fas fa-truck', label: 'Logistics' },
  { icon: 'fas fa-shopping-cart', label: 'eCommerce' },
  { icon: 'fas fa-home', label: 'Real Estate' },
  { icon: 'fas fa-hard-hat', label: 'Construction' },
  { icon: 'fas fa-hotel', label: 'Hospitality' },
]

export default function Home() {
  const [activeTech, setActiveTech] = useState('mobile')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [sent, setSent] = useState(false)
  const [articles, setArticles] = useState([])

  useEffect(() => {
    supabase
      .from('articles')
      .select('id, title, slug, category, excerpt, image_url, published_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(3)
      .then(({ data }) => setArticles(data || []))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setForm({ name: '', email: '', phone: '', service: '', message: '' })
    window.setTimeout(() => setSent(false), 4000)
  }

  const activeItems = techTabs.find((tab) => tab.id === activeTech)?.items ?? []

  return (
    <div className="home-page">

      {/* ═══════════════════════════════════
          HERO
      ═══════════════════════════════════ */}
      <section className="slider-wrap">
        <div className="slide-img">
          {/* Mobile animated background — hidden on desktop */}
          <div className="hero-mobile-bg" aria-hidden="true">
            <div className="hmb-grid"></div>
            <div className="hmb-lines">
              <span></span><span></span><span></span><span></span>
            </div>
          </div>
          <video
            className="video_bg"
            preload="metadata"
            autoPlay
            loop
            muted
            playsInline
            onCanPlay={e => e.currentTarget.classList.add('video-ready')}
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="slide-card">
          <div className="slide-sec">
            <div className="s-caption">
              <span className="hero-tag">Rahimi Tech Solution | Jalalabad, Afghanistan</span>
              <strong>
                Software Built for<br />
                How Afghanistan Works
              </strong>
              <p>
                From government offices to hospitals, schools to businesses. We write the code, set up the servers and make sure everything keeps running. Real projects. Real results.
              </p>
              <div className="hero-btns">
                <Link to="/contact">
                  <span>Start Your Project</span>
                </Link>
                <Link to="/portfolio" className="hero-btn-secondary">
                  <span>View Our Work</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="q-form">
          <h3>
            <span>get in touch</span>
            Free Project Consultation
          </h3>

          {sent ? (
            <div className="qf-success">
              <i className="fas fa-check-circle"></i>
              <p>Thank you. We will be in touch shortly.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control"
                placeholder="Your Name *"
                required
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
              />
              <input
                type="email"
                className="form-control"
                placeholder="Email Address *"
                required
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              />
              <div className="qf-row2">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Phone No."
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                />
                <select
                  className="form-select"
                  value={form.service}
                  onChange={(e) => setForm((prev) => ({ ...prev, service: e.target.value }))}
                >
                  <option value="">Select Service</option>
                  <option>Government &amp; Public Portal</option>
                  <option>Hospital Management System</option>
                  <option>School Management System</option>
                  <option>Banking &amp; Finance Software</option>
                  <option>Custom Software Development</option>
                  <option>Mobile App Development</option>
                  <option>NGO &amp; Organization System</option>
                  <option>Web Design &amp; Development</option>
                  <option>IT Consulting</option>
                </select>
              </div>
              <textarea
                className="form-control"
                placeholder="Tell us about your project..."
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
              ></textarea>
              <button type="submit" className="btn">
                Send Message
              </button>
            </form>
          )}
        </div>

        <StatsBar />
      </section>

      {/* ═══════════════════════════════════
          SOLUTIONS
      ═══════════════════════════════════ */}
      <section className="solutions">
        <svg className="circuit-bg" viewBox="0 0 1400 620" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 112 H130 L190 170 H520" fill="none" stroke="#1A4A5C" strokeWidth="2" opacity=".16" />
          <path d="M345 46 H640 L708 112 H1072 L1160 52 H1375" fill="none" stroke="#1A4A5C" strokeWidth="2" opacity=".12" />
          <path d="M1088 112 H1312 V204" fill="none" stroke="#5DCAA5" strokeWidth="2" opacity=".13" />
          <path d="M0 268 H285" fill="none" stroke="#1A4A5C" strokeWidth="2" opacity=".11" />
          <path d="M560 268 H904" fill="none" stroke="#1A4A5C" strokeWidth="2" opacity=".10" />
          <path d="M905 268 H1102 L1192 350 H1400" fill="none" stroke="#1A4A5C" strokeWidth="2" opacity=".12" />
          <path d="M0 498 H120 V436 H254" fill="none" stroke="#1A4A5C" strokeWidth="2" opacity=".13" />
          <path d="M460 436 H940" fill="none" stroke="#1A4A5C" strokeWidth="2" opacity=".10" />
          <path d="M940 436 H1218 L1310 520 H1400" fill="none" stroke="#1A4A5C" strokeWidth="2" opacity=".12" />
          <path d="M290 268 V338 H460" fill="none" stroke="#5DCAA5" strokeWidth="2" opacity=".10" />
          <circle cx="130" cy="112" r="11" fill="#5DCAA5" opacity=".16" />
          <circle cx="520" cy="170" r="9" fill="none" stroke="#1A4A5C" strokeWidth="2" opacity=".14" />
          <circle cx="708" cy="112" r="5" fill="#5DCAA5" opacity=".16" />
          <circle cx="904" cy="268" r="8" fill="none" stroke="#5DCAA5" strokeWidth="2" opacity=".18" />
          <circle cx="940" cy="436" r="7" fill="none" stroke="#5DCAA5" strokeWidth="2" opacity=".16" />
        </svg>

        <div className="container">
          <div className="headers">
            <h2>Our Solutions</h2>
            <span>Powering Afghanistan&apos;s digital transformation with full-spectrum enterprise software and IT services. From web applications to AI-driven platforms.</span>
          </div>

          <div className="sol-grid-4">
            {[
              { icon: 'fas fa-code', title: 'Website Design & Development', tags: ['HTML', 'CSS', 'PHP', 'Laravel', 'Angular', 'React'] },
              { icon: 'fas fa-terminal', title: 'Web Application Development', tags: ['React', 'Node.js', 'Next.js', 'Python (Django/FastAPI)', 'Laravel', 'Angular'] },
              { icon: 'fab fa-react', title: 'Custom Software Development', tags: ['Dot Net', 'Java', 'Next.js', 'Node.js', 'Angular', 'Vue / Nuxt'] },
              { icon: 'fab fa-android', title: 'Mobile App Development', tags: ['React Native', 'Flutter', 'iOS App', 'Android App', 'Ionic'] },
              { icon: 'fas fa-plug', title: 'API Integration', tags: ['Fetch API', 'SWR', 'NestJS', 'ASP.NET', 'FastAPI / Django REST', 'Next.js API Routes'] },
              { icon: 'fab fa-node', title: 'Cloud Migration', tags: ['AWS Database Migration', 'Azure Database Migration', 'AWS Snowball', 'AWS / Azure / GCP'] },
              { icon: 'fas fa-robot', title: 'Artificial Intelligence Development', tags: ['Vercel AI SDK', 'OpenAI or Claude', 'RAG', 'Helicone'] },
              { icon: 'fas fa-server', title: 'Data Engineering Solutions', tags: ['Fivetran', 'Kafka Connect', 'RabbitMQ', 'DataHub', 'AWS S3'] },
              { icon: 'fas fa-digital-tachograph', title: 'Digital Marketing', tags: ['Semrush', 'Ahrefs', 'Moz', 'GA4', 'Google Search Console'] },
              { icon: 'fas fa-hashtag', title: 'Social Media Marketing', tags: ['Facebook', 'Twitter', 'Instagram', 'TikTok', 'LinkedIn', 'Meta'] },
              { icon: 'fas fa-search', title: 'Search Engine Optimization (SEO)', tags: ['SEO', 'GA4', 'GTM', 'Screaming Frog', 'Semrush', 'BrightLocal'] },
              { icon: 'fas fa-briefcase', title: 'Local Google Business', tags: ['Local Listing', 'Local Ads', 'Google Ads', 'Google AdWords', 'Google Search Console'] },
            ].map((solution, index) => (
              <div className="sol-col" key={index}>
                <div className="sol-card">
                  <div className="icon-wrap">
                    <i className={solution.icon}></i>
                  </div>
                  <div className="sol-detail">
                    <h3>
                      <Link to="/services">{solution.title}</Link>
                    </h3>
                    <ul className="sol-tags">
                      {solution.tags.map((tag) => (
                        <li key={tag}>
                          <Link to="/services">{tag}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          WHY RAHIMI TECH
      ═══════════════════════════════════ */}
      <section className="why-us">
        <div className="container">
          <div className="headers why-us-headers">
            <h2>Why Choose <span>Rahimi Tech Solution?</span></h2>
            <span>We don&apos;t just write code. We build reliable, scalable digital systems that solve real problems for Afghanistan&apos;s organizations, enterprises and public institutions.</span>
          </div>
          <div className="why-grid">
            {whyCards.map((card) => (
              <div className="why-card" key={card.title}>
                <div className="why-icon">
                  <i className={card.icon}></i>
                </div>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          ENTERPRISE CAPABILITIES
      ═══════════════════════════════════ */}
      <section className="capabilities">
        <div className="container">
          <div className="headers">
            <h2>Large-Scale Projects We Build</h2>
            <span>From government portals to banking systems and hospital platforms. We have the expertise and proven track record to deliver mission-critical software that Afghanistan&apos;s public and private sectors depend on.</span>
          </div>
          <div className="cap-grid">
            {capCards.map((card) => (
              <div className="cap-card" key={card.title}>
                <i className={`${card.icon} cap-icon`}></i>
                <h4>{card.title}</h4>
                <p>{card.desc}</p>
                <Link to="/services" className="cap-link">
                  Learn More <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          MORE SERVICES
      ═══════════════════════════════════ */}
      <section className="more-serv">
        <div className="container">
          <div className="ms-inner">
            <div className="ms-left">
              <h4>Looking For More Services?</h4>
              <ul className="serv-list">
                {[
                  'Enterprise Software Development',
                  'Web Design & Web Application Development',
                  'Custom CMS, CRM Development',
                  'SaaS And PaaS Development',
                  'ECommerce Website And Marketplace Development',
                  'Dedicated Web And Software Development Team',
                  'Software Audit & Quality Assurance',
                  'Software Maintenance & Audit',
                  'Enterprise Application Development',
                  'Business Process Automation',
                ].map((service) => (
                  <li key={service}>
                    <Link to="/services">{service}</Link>
                  </li>
                ))}
              </ul>
              <div className="contact-btn">
                <Link to="/contact">
                  <i className="fas fa-phone-alt"></i>
                  Contact Us
                </Link>
                <Link to="/contact">
                  <i className="fas fa-envelope"></i>
                  Get Quote
                </Link>
              </div>
            </div>
            <div className="ms-right">
              <div className="serv-img">
                <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=900&q=80" alt="Web development services" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          HIRE US
      ═══════════════════════════════════ */}
      <section className="hire-us">
        <div className="container">
          <div className="hire-header">
            <h2>Hire Us for Your Project</h2>
            <p>
              Rahimi Tech Solution designs and builds fully custom software and digital platforms tailored to your organization&apos;s exact workflows, scale and goals. Whether you need a government portal, banking system, school management platform, hospital suite or a secure enterprise dashboard, we bring international software engineering standards to Afghanistan&apos;s market.
            </p>
          </div>

          {[hireCards.slice(0, 3), hireCards.slice(3, 6), hireCards.slice(6, 9)].map((row, rowIndex) => (
            <div className="hire-row" key={rowIndex}>
              {row.map((card) => (
                <div className="hire-col" key={card.title}>
                  <div className="hire-card">
                    <div className="img-wrap">
                      <img src={card.img} alt={card.title} loading="lazy" />
                    </div>
                    <h5>
                      <Link to="/services">{card.title}</Link>
                    </h5>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════
          TECH STACK
      ═══════════════════════════════════ */}
      <section className="tech">
        <div className="container">
          <div className="headers">
            <h2>Latest Technologies at Your Service</h2>
            <span>
              Our team of expert engineers use the latest web, mobile and cloud-based technologies to create outstanding websites, applications and software platforms. From React and Node.js to AWS and Kubernetes. We have the full stack covered.
            </span>
          </div>

          <div className="tech-tab">
            <ul className="tech-nav-list">
              {techTabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    type="button"
                    className={`tech-nav-btn${activeTech === tab.id ? ' active' : ''}`}
                    onClick={() => setActiveTech(tab.id)}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>

            <div className="tech-pane-wrap">
              {activeItems.map((item) => (
                <div className="tech-pill" key={`${activeTech}-${item.name}`}>
                  <div className="pill-icon">
                    <i className={item.icon}></i>
                  </div>
                  <strong>{item.name}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════
          WORK PROCESS
      ═══════════════════════════════════ */}
      <section className="work-process">
        <div className="container">
          <div className="headers">
            <h2>Our Work Process</h2>
            <span>
              Every project at Rahimi Tech Solution follows a structured process. From discovery and planning through design, development, testing and deployment. Your project gets delivered on time and to the highest standard.
            </span>
          </div>

          <div className="process-row-wrap">
            <div className="process-connector"></div>
            {[
              { icon: 'fas fa-search', title: 'Initiation', steps: ['Research & Planning', 'System Goals'] },
              { icon: 'fas fa-lightbulb', title: 'Design', steps: ['Brand & UI/UX', 'Wireframes'] },
              { icon: 'fas fa-file-code', title: 'Develop', steps: ['Web & Mobile Dev', 'DevOps'] },
              { icon: 'fas fa-thumbs-up', title: 'Test', steps: ['Quality Assurance', 'Feedback & Review'] },
              { icon: 'fas fa-plane-departure', title: 'Deploy', steps: ['Launch & Security', 'Monitoring & Support'] },
            ].map((step) => (
              <div className="process-card" key={step.title}>
                <div className="icon-wrap">
                  <i className={step.icon}></i>
                </div>
                <strong>{step.title}</strong>
                <ul className="process-list">
                  {step.steps.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          AFGHANISTAN FOCUS BAND
      ═══════════════════════════════════ */}
      <section className="focus-band">
        <div className="container">
          <div className="fb-inner">
            <div className="fb-text">
              <span className="fb-tag">Serving Afghanistan &amp; Beyond</span>
              <h2>Built for Afghanistan&apos;s Digital Future</h2>
              <p>
                Rahimi Tech Solution is Afghanistan&apos;s trusted software engineering partner. We build the digital systems that power government services, enterprise operations, healthcare, education and economic growth. Our Jalalabad-based team combines local knowledge of Afghan business culture with the technical standards of international software development.
              </p>
              <div className="fb-badges">
                {[
                  'Government Portals',
                  'Banking Systems',
                  'Hospital Management',
                  'School Platforms',
                  'NGO Systems',
                  'Logistics Software',
                  'eCommerce',
                  'Mobile Apps',
                ].map((b) => (
                  <span className="fb-badge" key={b}>{b}</span>
                ))}
              </div>
              <Link to="/contact" className="btn btn-accent">
                <i className="fas fa-rocket"></i>
                Start Your Project Today
              </Link>
            </div>
            <div className="fb-stats">
              {[
                { n: '150+', label: 'Projects Delivered' },
                { n: '11+', label: 'Years of Excellence' },
                { n: '25+', label: 'Expert Engineers' },
                { n: '80+', label: 'Happy Clients' },
              ].map((s) => (
                <div className="fb-stat" key={s.label}>
                  <strong>{s.n}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          PROJECT CTA
      ═══════════════════════════════════ */}
      <section className="project-cta">
        <div className="container">
          <div className="cta-inner">
            <div className="service-tabs">
              {['Web Design', 'eCommerce Development', 'Logo Design', 'Branding'].map((tab, index) => (
                <Link key={tab} to="/services" className={index === 0 ? 'active' : ''}>
                  {tab}
                </Link>
              ))}
            </div>
            <div className="project-contact">
              <span>
                Let&apos;s Discuss
                <i className="fas fa-chevron-right"></i>
              </span>
              <a href="tel:+93767617184">
                +93 (767) 617-184
                <i className="fas fa-chevron-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          CLIENTS
      ═══════════════════════════════════ */}
      <section className="clients">
        <div className="container">
          <div className="headers">
            <h2>Trusted Across Sectors</h2>
            <span>
              Rahimi Tech Solution builds strong, lasting relationships with clients across Afghanistan&apos;s most important industries. From government agencies to private enterprises and international NGOs. We deliver software that makes a real difference.
            </span>
          </div>
          <div className="client-sectors">
            {clientSectors.map((sector) => (
              <div className="client-badge" key={sector.label}>
                <i className={sector.icon}></i>
                <span>{sector.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          INSIGHTS
      ═══════════════════════════════════ */}
      {articles.length > 0 && (
        <section className="newsletter">
          <div className="container">
            <div className="headers">
              <h2>IT Insights &amp; Articles</h2>
              <span>Case studies, guides, and technology perspectives from Afghanistan&apos;s software development landscape.</span>
            </div>

            <div className="blog-row">
              {articles.map((post) => (
                <div className="blog-col" key={post.id}>
                  <div className="blog-wrap">
                    <div className="img-wrap">
                      {post.image_url
                        ? <img src={post.image_url} alt={post.title} loading="lazy" />
                        : <div style={{ height: 220, background: '#e8edf2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="fas fa-newspaper" style={{ fontSize: 40, color: '#b0bec5' }}></i></div>
                      }
                    </div>
                    <div className="blog-contn">
                      <h6>
                        <Link to={`/insights/${post.slug}`}>{post.title}</Link>
                      </h6>
                      {post.category && (
                        <div className="tags">
                          <Link to={`/insights/${post.slug}`}>{post.category}</Link>
                        </div>
                      )}
                      {post.excerpt && <p>{post.excerpt}</p>}
                      <Link to={`/insights/${post.slug}`} className="read-m">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link to="/insights" className="btn btn-outline-dark">View All Articles</Link>
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
