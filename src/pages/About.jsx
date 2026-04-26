import { Link } from 'react-router-dom'
import './InnerPage.css'

const values = [
  { icon: 'fas fa-bullseye', title: 'Mission', desc: 'To build software and IT systems that Afghan businesses and institutions can genuinely depend on. Built properly, maintained well and priced fairly.' },
  { icon: 'fas fa-eye', title: 'Vision', desc: "To be Afghanistan's go-to technology company. The team that hospitals, government offices and businesses call when something important needs to work." },
  { icon: 'fas fa-heart', title: 'Values', desc: 'We say what we will do and then we do it. We build things that last. When something breaks, we fix it. No excuses.' },
]

const milestones = [
  { year: '2015', title: 'Started in Jalalabad', desc: 'Two developers, one shared goal: build software that Afghan businesses and institutions could actually depend on.' },
  { year: '2017', title: 'Infrastructure & Networks', desc: 'Added server setup and networking services as clients started needing more than just software.' },
  { year: '2019', title: 'Mobile Development', desc: 'Launched our dedicated mobile team to build apps for iOS and Android.' },
  { year: '2021', title: '100+ Projects Delivered', desc: 'Passed a major milestone. Hospital systems, school platforms, government portals and business tools all live and running.' },
  { year: '2023', title: 'Cloud & AI', desc: 'Added cloud migration and AI development to stay ahead of where technology is heading.' },
  { year: '2025', title: 'Two Offices, One Team', desc: 'Now operating from Jalalabad and Richmond BC, with 25+ engineers serving clients on two continents.' },
]

export default function About() {
  return (
    <div className="inner-page">
      <div className="page-banner about-hero">
        <div className="container">
          <h1>About <span>Rahimi Tech</span></h1>
          <p>We are an Afghan-Canadian technology company. We started in Jalalabad and we build software that works in Afghanistan.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">›</span>
            <span>About Us</span>
          </div>
        </div>
      </div>

      {/* Who We Are */}
      <section className="ip-section ip-section--grey about-middle-lines">
        <div className="container">
          <div className="about-grid">
            <div className="about-img-wrap">
              <div className="about-img-main">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=75" alt="Rahimi Tech team" loading="lazy" />
              </div>
              <div className="about-img-badge">
                <strong>10+</strong>
                <span>Years in Afghanistan</span>
              </div>
            </div>
            <div className="about-content">
              <div className="section-header left">
                <span className="tag">Who We Are</span>
                <h2>Built in Afghanistan, <span>For Afghanistan</span></h2>
              </div>
              <p>Rahimi Tech Solution started in Jalalabad in 2015. We build custom software, set up IT infrastructure and provide technology services to businesses, hospitals, schools and government offices across Afghanistan and now beyond, with an office in Richmond, British Columbia.</p>
              <p style={{marginTop:'16px'}}>Our team of 25+ engineers and IT professionals has delivered over 150 projects. We are not a marketing company that also does software. We are engineers who build things that work.</p>
              <div className="about-highlights">
                {[
                  { n: '150+', label: 'Projects Delivered' },
                  { n: '80+', label: 'Happy Clients' },
                  { n: '25+', label: 'Team Members' },
                  { n: '10+', label: 'Years Experience' },
                ].map((h, i) => (
                  <div className="about-hl" key={i}>
                    <strong>{h.n}</strong>
                    <span>{h.label}</span>
                  </div>
                ))}
              </div>
              <div style={{marginTop:'28px', display:'flex', gap:'14px', flexWrap:'wrap'}}>
                <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
                <Link to="/team" className="btn btn-outline">Meet the Team</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="ip-section ip-section--grey">
        <div className="container">
          <div className="section-header">
            <span className="tag">Our Foundation</span>
            <h2>Mission, Vision & <span>Values</span></h2>
          </div>
          <div className="mvv-grid">
            {values.map((v, i) => (
              <div className="mvv-card" key={i}>
                <div className="mvv-icon"><i className={v.icon}></i></div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="ip-section about-milestones-section">
        <div className="container">
          <div className="section-header">
            <span className="tag">Our Journey</span>
            <h2>Company <span>Milestones</span></h2>
          </div>
          <div className="timeline">
            {milestones.map((m, i) => (
              <div className={`timeline-item${i % 2 === 0 ? ' left' : ' right'}`} key={i}>
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <span className="timeline-year">{m.year}</span>
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ip-cta">
        <div className="container">
          <h2>Ready to Work With <span>Us?</span></h2>
          <p>Tell us about your project and let's build something great together.</p>
          <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap',marginTop:'28px'}}>
            <Link to="/contact" className="btn btn-accent">Start a Project</Link>
            <Link to="/careers" className="btn btn-outline-white">Join Our Team</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
