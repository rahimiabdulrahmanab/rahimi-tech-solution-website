import { useState } from 'react'
import { Link } from 'react-router-dom'
import './InnerPage.css'

const projects = [
  { img:'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=700&q=75', title:'AutoTrack DMS', cat:'Software', tag:'web', client:'Pacific Auto Group', desc:'Full-featured dealer management system with inventory, finance and CRM modules.' },
  { img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=75', title:'InsightBoard Analytics', cat:'Dashboard', tag:'app', client:'DataMetrics Inc.', desc:'Real-time analytics dashboard with drill-down reports and automated alerts.' },
  { img:'https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=700&q=75', title:'MobilePay Banking App', cat:'Mobile', tag:'mobile', client:'Coastal Credit Union', desc:'Cross-platform React Native banking app with biometric authentication and e-transfers.' },
  { img:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=700&q=75', title:'DataCenter Build, Surrey', cat:'Infrastructure', tag:'infra', client:'TechCore Ltd.', desc:'Complete data center build including rack design, networking and redundant power.' },
  { img:'https://images.unsplash.com/photo-1547954575-855750c57bd3?w=700&q=75', title:'MedPortal Healthcare', cat:'Web App', tag:'web', client:'MedCore BC', desc:'HIPAA-compliant patient portal with appointment booking and secure messaging.' },
  { img:'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&q=75', title:'ShopNorth eCommerce', cat:'eCommerce', tag:'app', client:'Northern Goods Co.', desc:'High-volume Shopify + custom middleware platform handling 5,000+ daily orders.' },
  { img:'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=75', title:'EduTrack Attendance', cat:'Software', tag:'web', client:'BC School District', desc:'Automated attendance management system for 12 schools with parent portal.' },
  { img:'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&q=75', title:'Cloud Migration to Azure', cat:'Cloud', tag:'infra', client:'Greenfield Logistics', desc:'Full cloud migration of 40-server on-premise environment to Microsoft Azure.' },
  { img:'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=700&q=75', title:'VolunteerHub Platform', cat:'Web App', tag:'app', client:'BC Volunteer Network', desc:'Volunteer management platform matching 2,000+ volunteers with organizations.' },
]

const filters = ['all','web','app','mobile','infra']

export default function Portfolio() {
  const [active, setActive] = useState('all')
  const filtered = active === 'all' ? projects : projects.filter(p => p.tag === active)

  return (
    <div className="inner-page">
      <div className="page-banner portfolio-hero">
        <div className="container">
          <h1>Our <span>Portfolio</span></h1>
          <p>A selection of projects we've delivered for clients across BC and beyond.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">›</span>
            <span>Portfolio</span>
          </div>
        </div>
      </div>

      <section className="ip-section portfolio-main-section">
        <div className="container">
          <div className="section-header">
            <span className="tag">Our Work</span>
            <h2>Featured <span>Projects</span></h2>
          </div>

          <div className="portfolio-filters">
            {filters.map(f => (
              <button
                key={f}
                className={`filter-btn${active === f ? ' active' : ''}`}
                onClick={() => setActive(f)}
              >
                {f === 'all' ? 'All Projects' : f === 'infra' ? 'Infrastructure' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="portfolio-grid">
            {filtered.map((p, i) => (
              <div className="portfolio-card" key={i}>
                <div className="portfolio-card-img">
                  <img src={p.img} alt={p.title} loading="lazy" />
                </div>
                <div className="portfolio-card-body">
                  <span className="portfolio-cat">{p.cat}</span>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                  <p style={{fontSize:'12px',color:'#999',marginTop:'8px',fontStyle:'italic'}}>Client: {p.client}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ip-cta">
        <div className="container">
          <h2>Want to Be Our Next <span>Success Story?</span></h2>
          <p>Let's discuss your project and see how we can deliver exceptional results.</p>
          <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap',marginTop:'28px'}}>
            <Link to="/contact" className="btn btn-accent">Start a Project</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
