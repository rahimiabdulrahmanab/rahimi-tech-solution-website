import { Link } from 'react-router-dom'
import './InnerPage.css'

const team = [
  { name:'Ahmad Rahimi', role:'Founder & CEO', img:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=75', bio:'15+ years in enterprise software and IT infrastructure. Leads strategy and client relationships.', socials:{li:'#',tw:'#'} },
  { name:'Sara Mohammadi', role:'CTO', img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=75', bio:'Full-stack architect with deep expertise in cloud infrastructure and distributed systems.', socials:{li:'#',tw:'#'} },
  { name:'Kevin Park', role:'Lead Frontend Engineer', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=75', bio:'Specialist in React, TypeScript, and performance optimization. Leads our frontend practice.', socials:{li:'#'} },
  { name:'Priya Singh', role:'Lead Backend Engineer', img:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=75', bio:'Node.js and Python expert. Architects APIs and database systems for high-traffic platforms.', socials:{li:'#'} },
  { name:'Carlos Reyes', role:'DevOps & Cloud Lead', img:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=75', bio:'AWS and Azure certified. Manages all client cloud environments and CI/CD pipelines.', socials:{li:'#'} },
  { name:'Jessica Chen', role:'Mobile Lead', img:'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=400&q=75', bio:'iOS and Flutter specialist with 6 published apps serving 100K+ users.', socials:{li:'#',tw:'#'} },
  { name:'Marcus Williams', role:'Infrastructure Manager', img:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=75', bio:'Cisco CCNP certified. Oversees all data center builds and network deployments.', socials:{li:'#'} },
  { name:'Aisha Hassan', role:'Project Manager', img:'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&q=75', bio:'PMP certified PM with a track record of on-time, on-budget software deliveries.', socials:{li:'#'} },
]

export default function Team() {
  return (
    <div className="inner-page">
      <div className="page-banner">
        <div className="container">
          <h1>Meet Our <span>Team</span></h1>
          <p>The talented people behind Rahimi Tech Solution's exceptional work.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">›</span>
            <span>Our Team</span>
          </div>
        </div>
      </div>

      <section className="ip-section">
        <div className="container">
          <div className="section-header">
            <span className="tag">The People</span>
            <h2>Our <span>Expert Team</span></h2>
            <p>A diverse group of certified engineers, architects, and project managers united by a passion for technology and client success.</p>
          </div>
          <div className="team-grid">
            {team.map((m, i) => (
              <div className="team-card" key={i}>
                <img src={m.img} alt={m.name} className="team-img" loading="lazy" />
                <div className="team-body">
                  <h4>{m.name}</h4>
                  <span className="team-role">{m.role}</span>
                  <p style={{fontSize:13,color:'#666',lineHeight:1.6,marginBottom:14}}>{m.bio}</p>
                  <div className="team-social">
                    {m.socials.li && <a href={m.socials.li} aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>}
                    {m.socials.tw && <a href={m.socials.tw} aria-label="Twitter"><i className="fab fa-twitter"></i></a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ip-cta">
        <div className="container">
          <h2>Want to Join <span>Our Team?</span></h2>
          <p>We're always looking for talented engineers and tech professionals to join our growing company.</p>
          <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap',marginTop:'28px'}}>
            <Link to="/careers" className="btn btn-accent">View Open Roles</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
