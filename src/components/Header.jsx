import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Header.css'

const navItems = [
  { label: 'Home', to: '/' },
  {
    label: 'Services',
    to: '/services',
    mega: {
      heading: 'Full-spectrum software & IT services.',
      cols: [
        {
          title: 'Software Dev',
          links: [
            { label: 'Web Application Development', to: '/services' },
            { label: 'Custom Software Development', to: '/services' },
            { label: 'Enterprise Web Solutions', to: '/services' },
            { label: 'eCommerce Development', to: '/services' },
            { label: 'AI-Based Development', to: '/services' },
          ]
        },
        {
          title: 'Data Center & Infra',
          links: [
            { label: 'Server Setup & Management', to: '/services' },
            { label: 'Network Infrastructure', to: '/services' },
            { label: 'Cloud Migration', to: '/services' },
            { label: 'Cybersecurity Solutions', to: '/services' },
            { label: 'IT Support & Maintenance', to: '/services' },
          ]
        },
        {
          title: 'More',
          links: [
            { label: 'Mobile App Development', to: '/services' },
            { label: 'IT Consulting Services', to: '/services' },
            { label: 'Digital Marketing', to: '/services' },
            { label: 'Managed IT Services', to: '/services' },
          ]
        }
      ]
    }
  },
  {
    label: 'Technology',
    to: '/technologies',
    mega: {
      heading: 'Modern technologies to build your solution.',
      cols: [
        { title: 'Frontend', links: [
          { label: 'React · Vue · Next.js', to: '/technologies' },
          { label: 'Angular · Svelte', to: '/technologies' },
          { label: 'TypeScript', to: '/technologies' },
        ]},
        { title: 'Backend', links: [
          { label: 'Node.js · Python · Laravel', to: '/technologies' },
          { label: 'Dot Net · Java', to: '/technologies' },
          { label: 'REST · GraphQL', to: '/technologies' },
        ]},
        { title: 'Mobile & Cloud', links: [
          { label: 'iOS · Android · Flutter', to: '/technologies' },
          { label: 'AWS · Azure · Google Cloud', to: '/technologies' },
          { label: 'MySQL · PostgreSQL · MongoDB', to: '/technologies' },
        ]},
      ]
    }
  },
  {
    label: 'Solutions',
    to: '/solutions',
    mega: {
      heading: 'Software solutions we provide:',
      cols: [
        { title: '', links: [
          { label: 'Dealer Management Systems', to: '/solutions' },
          { label: 'School Management Systems', to: '/solutions' },
          { label: 'Organization Management Systems', to: '/solutions' },
          { label: 'Hospital Management Systems', to: '/solutions' },
        ]},
        { title: '', links: [
          { label: 'ERP & CRM Software', to: '/solutions' },
          { label: 'POS Software Development', to: '/solutions' },
          { label: 'Money Exchange Management Systems', to: '/solutions' },
          { label: 'Geographic Information Systems', to: '/solutions' },
        ]},
        { title: '', links: [
          { label: 'Volunteer Management Platform', to: '/solutions' },
          { label: 'Custom Enterprise Solutions', to: '/solutions' },
          { label: 'Pharmacy Management Systems', to: '/solutions' },
        ]},
      ]
    }
  },
  {
    label: 'Industry',
    to: '/industry',
    mega: {
      heading: 'Industries we serve across Afghanistan:',
      cols: [
        { title: '', links: [
          { label: 'Automotive & Dealerships', to: '/industry' },
          { label: 'Healthcare & Clinics', to: '/industry' },
          { label: 'Education & Schools', to: '/industry' },
        ]},
        { title: '', links: [
          { label: 'eCommerce & Retail', to: '/industry' },
          { label: 'Real Estate & Mortgage', to: '/industry' },
          { label: 'Logistics & Transportation', to: '/industry' },
        ]},
        { title: '', links: [
          { label: 'Non-Profit Organizations', to: '/industry' },
          { label: 'Supply Chain & Manufacturing', to: '/industry' },
          { label: 'Hospitality & Travel', to: '/industry' },
        ]},
      ]
    }
  },
  { label: 'Careers', to: '/careers' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Insights', to: '/insights' },
  {
    label: 'About',
    to: '/about',
    mega: {
      heading: 'Learn more about Rahimi Tech Solution.',
      cols: [
        { title: 'About Us', links: [
          { label: 'About Us', to: '/about' },
          { label: 'Our Team', to: '/team' },
          { label: 'Careers', to: '/careers' },
        ]},
        { title: 'Company', links: [
          { label: 'Terms & Conditions', to: '/terms' },
          { label: 'Privacy Policy', to: '/privacy' },
        ]},
        { title: 'Recognition', links: [
          { label: 'Testimonials', to: '/testimonials' },
          { label: 'Our Partners', to: '/partners' },
        ]},
      ]
    }
  },
  { label: 'Contact', to: '/contact' },
]

const taglines = [
  'Custom Software Development',
  'IT Infrastructure & Networks',
  'Mobile App Development',
  'Cloud & AI Solutions',
]

function LogoTagline() {
  const [idx, setIdx] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setIdx(i => (i + 1) % taglines.length)
        setFade(true)
      }, 400)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <span className={`logo-tagline-cycle${fade ? ' visible' : ''}`}>
      {taglines[idx]}
    </span>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openMega, setOpenMega] = useState(null)
  const closeTimeout = useRef(null)
  const location = useLocation()

  const openMenu = (label) => {
    clearTimeout(closeTimeout.current)
    setOpenMega(label)
  }
  const scheduleClose = () => {
    closeTimeout.current = setTimeout(() => setOpenMega(null), 200)
  }
  

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const id = window.setTimeout(() => {
      setMenuOpen(false)
      setOpenMega(null)
    }, 0)
    return () => window.clearTimeout(id)
  }, [location])

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      {/* Logo Bar */}
      <div className="logo-bar">
        <div className="container">
          <div className="logo-bar-row">

            {/* Col 1 — Logo */}
            <div className="col-logo">
              <div className="logo-wrap">
                <Link
                  to="/"
                  className="logo-link"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <div className="logo-badge">
                    <span className="logo-rts">
                      <span className="lr">R</span><span className="lt">T</span><span className="ls">S</span>
                    </span>
                  </div>
                  <div className="logo-text-block">
                    <span className="logo-company-name">
                      Rahimi <span className="logo-tech">Tech</span> Solution
                    </span>
                    <span className="logo-since">
                      <i className="fas fa-circle"></i> In Market Since 2015
                    </span>
                    <LogoTagline />
                  </div>
                </Link>
              </div>
            </div>

            {/* Col 2 — Company button + phone */}
            <div className="col-contact">
              <div className="top-right">
                <Link to="/contact" className="ent-btn">Rahimi Tech Solution</Link>
              </div>
              <ul className="top-contact">
                <li className="cntct-logo">
                  <strong><i className="fas fa-phone-alt"></i></strong>
                </li>
                <li>
                  <a href="tel:+93767617184">+93 (767) 617-184</a>
                </li>
              </ul>
            </div>

            {/* Col 3 — Main office + since */}
            <div className="col-office">
              <div className="main-ofc">
                <i className="fas fa-location-arrow"></i>
                <small>Main Office</small>
                <strong>Jalalabad, Afghanistan</strong>
              </div>
              <div className="main-ofc since-badge">
                <i className="fas fa-medal"></i>
                <small>In Market</small>
                <strong>Since 2015</strong>
              </div>
            </div>

            {/* Col 4 — Quick links */}
            <div className="col-quick">
              <ul className="quick-b">
                <li><Link to="/contact"><i className="fas fa-address-card"></i>Quick Enquiry</Link></li>
                <li><Link to="/contact"><i className="fas fa-globe"></i>Locations</Link></li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Nav Bar */}
      <div className="nav-bar">
        <div className="container">
          <div className="nav-inner">
            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle navigation"
            >
              <span /><span /><span />
            </button>

            <nav className={`main-nav${menuOpen ? ' open' : ''}`}>
              <ul className="nav-list">
                {navItems.map((item) => (
                  <li
                    key={item.label}
                    className={`nav-item${item.mega ? ' has-mega' : ''}`}
                    onMouseEnter={() => item.mega && openMenu(item.label)}
                    onMouseLeave={() => item.mega && scheduleClose()}
                  >
                    <NavLink
                      to={item.to}
                      className={({ isActive }) => (isActive && !item.noActive) ? 'nav-link active' : 'nav-link'}
                      onClick={() => item.mega && setOpenMega(v => v === item.label ? null : item.label)}
                      end={item.to === '/'}
                    >
                      {item.label}
                      {item.mega && <i className="fas fa-chevron-down nav-arrow"></i>}
                    </NavLink>

                    {item.mega && (openMega === item.label || undefined) && (
                      <div
                        className={`mega-menu${openMega === item.label ? ' visible' : ''}`}
                        onMouseEnter={() => openMenu(item.label)}
                        onMouseLeave={scheduleClose}
                      >
                        <div className="container">
                          <div className="mega-inner">
                            <div className="mega-heading">
                              <strong>{item.mega.heading}</strong>
                              <i className="fas fa-arrow-right"></i>
                            </div>
                            {item.mega.cols.map((col, ci) => (
                              <div key={ci} className="mega-col">
                                {col.title && <strong className="mega-col-title">{col.title}</strong>}
                                <ul>
                                  {col.links.map((lnk, li) => (
                                    <li key={li}>
                                      <Link to={lnk.to}>{lnk.label}</Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
