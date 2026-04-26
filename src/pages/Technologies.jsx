import { Link } from 'react-router-dom'
import './InnerPage.css'

const categories = [
  {
    icon: 'fas fa-laptop-code',
    title: 'Frontend Development',
    items: [
      { icon: 'fab fa-react', name: 'React.js', desc: 'Component-based UI' },
      { icon: 'fab fa-vuejs', name: 'Vue.js', desc: 'Progressive framework' },
      { icon: 'fas fa-n', name: 'Next.js', desc: 'React SSR/SSG' },
      { icon: 'fab fa-angular', name: 'Angular', desc: 'Enterprise SPA' },
      { icon: 'fas fa-fire', name: 'Svelte', desc: 'Compiled UI' },
      { icon: 'fab fa-js-square', name: 'TypeScript', desc: 'Typed JavaScript' },
      { icon: 'fas fa-paint-brush', name: 'Tailwind CSS', desc: 'Utility-first CSS' },
      { icon: 'fas fa-layer-group', name: 'Storybook', desc: 'Component library' },
    ]
  },
  {
    icon: 'fas fa-server',
    title: 'Backend & APIs',
    items: [
      { icon: 'fab fa-node-js', name: 'Node.js', desc: 'JavaScript runtime' },
      { icon: 'fab fa-python', name: 'Python', desc: 'Django / FastAPI' },
      { icon: 'fab fa-php', name: 'Laravel', desc: 'PHP framework' },
      { icon: 'fas fa-code', name: '.NET / C#', desc: 'Microsoft stack' },
      { icon: 'fab fa-java', name: 'Java / Spring', desc: 'Enterprise backend' },
      { icon: 'fab fa-golang', name: 'Go', desc: 'High-performance APIs' },
      { icon: 'fas fa-exchange-alt', name: 'GraphQL', desc: 'Flexible APIs' },
      { icon: 'fas fa-sitemap', name: 'REST / tRPC', desc: 'API standards' },
    ]
  },
  {
    icon: 'fas fa-mobile-alt',
    title: 'Mobile Development',
    items: [
      { icon: 'fab fa-apple', name: 'iOS / Swift', desc: 'Native Apple' },
      { icon: 'fab fa-android', name: 'Android', desc: 'Native Kotlin' },
      { icon: 'fab fa-react', name: 'React Native', desc: 'Cross-platform' },
      { icon: 'fas fa-mobile-alt', name: 'Flutter', desc: 'Google\'s SDK' },
      { icon: 'fas fa-layer-group', name: 'Ionic', desc: 'Hybrid apps' },
      { icon: 'fab fa-microsoft', name: '.NET MAUI', desc: 'Cross-platform .NET' },
    ]
  },
  {
    icon: 'fas fa-cloud',
    title: 'Cloud & DevOps',
    items: [
      { icon: 'fab fa-aws', name: 'Amazon AWS', desc: 'Cloud platform' },
      { icon: 'fab fa-microsoft', name: 'Microsoft Azure', desc: 'Enterprise cloud' },
      { icon: 'fab fa-google', name: 'Google Cloud', desc: 'GCP services' },
      { icon: 'fab fa-docker', name: 'Docker', desc: 'Containerization' },
      { icon: 'fas fa-dharmachakra', name: 'Kubernetes', desc: 'Container orchestration' },
      { icon: 'fas fa-code-branch', name: 'GitHub Actions', desc: 'CI/CD pipelines' },
      { icon: 'fas fa-layer-group', name: 'Terraform', desc: 'Infrastructure as Code' },
      { icon: 'fas fa-chart-line', name: 'Datadog', desc: 'Monitoring & observability' },
    ]
  },
  {
    icon: 'fas fa-database',
    title: 'Databases & Storage',
    items: [
      { icon: 'fas fa-database', name: 'MySQL', desc: 'Relational DB' },
      { icon: 'fas fa-database', name: 'PostgreSQL', desc: 'Advanced relational' },
      { icon: 'fas fa-leaf', name: 'MongoDB', desc: 'Document database' },
      { icon: 'fas fa-fire', name: 'Firebase', desc: 'Real-time NoSQL' },
      { icon: 'fas fa-database', name: 'Redis', desc: 'In-memory cache' },
      { icon: 'fas fa-database', name: 'Supabase', desc: 'Open-source Firebase' },
      { icon: 'fas fa-search', name: 'Elasticsearch', desc: 'Search engine' },
      { icon: 'fas fa-database', name: 'Microsoft SQL', desc: 'Enterprise relational' },
    ]
  },
]

export default function Technologies() {
  return (
    <div className="inner-page">
      <div className="page-banner technologies-banner">
        <div className="container">
          <h1>Our <span>Technology Stack</span></h1>
          <p>We use proven, modern technologies chosen for performance, maintainability, and your long-term success.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">›</span>
            <span>Technologies</span>
          </div>
        </div>
      </div>

      <section className="tech-section ip-section">

        {/* ── decorative circuit background ── */}
        <svg className="tech-bg-pattern" viewBox="0 0 1400 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {/* light grid */}
          <g stroke="#1A4A5C" strokeWidth="1" opacity="0.07" fill="none">
            <line x1="0" y1="100" x2="1400" y2="100"/><line x1="0" y1="220" x2="1400" y2="220"/>
            <line x1="0" y1="340" x2="1400" y2="340"/><line x1="0" y1="460" x2="1400" y2="460"/>
            <line x1="0" y1="580" x2="1400" y2="580"/><line x1="0" y1="700" x2="1400" y2="700"/>
            <line x1="0" y1="820" x2="1400" y2="820"/>
            <line x1="100" y1="0" x2="100" y2="900"/><line x1="280" y1="0" x2="280" y2="900"/>
            <line x1="460" y1="0" x2="460" y2="900"/><line x1="640" y1="0" x2="640" y2="900"/>
            <line x1="820" y1="0" x2="820" y2="900"/><line x1="1000" y1="0" x2="1000" y2="900"/>
            <line x1="1180" y1="0" x2="1180" y2="900"/><line x1="1360" y1="0" x2="1360" y2="900"/>
          </g>
          {/* circuit traces */}
          <g stroke="#1A4A5C" strokeWidth="2" opacity="0.11" fill="none">
            <path d="M100 100 L280 100 L280 220 L460 220 L460 100 L640 100"/>
            <path d="M640 220 L820 220 L820 340 L1000 340 L1000 220 L1180 220"/>
            <path d="M100 460 L280 460 L280 580 L460 580 L460 460 L640 460"/>
            <path d="M820 460 L1000 460 L1000 580 L1180 580 L1180 460 L1360 460"/>
            <path d="M280 700 L460 700 L460 820 L640 820"/>
            <path d="M1000 700 L1180 700 L1180 820 L1360 820"/>
            <path d="M640 340 L640 460"/><path d="M820 100 L820 220"/>
            <path d="M1360 340 L1360 460"/><path d="M100 700 L100 820"/>
            <path d="M460 340 L460 460"/><path d="M1180 340 L1180 460"/>
          </g>
          {/* accent traces */}
          <g stroke="#5DCAA5" strokeWidth="2" opacity="0.1" fill="none">
            <path d="M460 220 L460 340 L640 340 L640 220"/>
            <path d="M820 580 L1000 580 L1000 700 L820 700 L820 580"/>
            <path d="M100 220 L100 340 L280 340 L280 220"/>
          </g>
          {/* nodes */}
          <g fill="#1A4A5C" opacity="0.14">
            {[
              [100,100],[280,100],[280,220],[460,220],[460,100],[640,100],
              [640,220],[820,220],[820,340],[1000,340],[1000,220],[1180,220],
              [100,460],[280,460],[280,580],[460,580],[460,460],[640,460],
              [820,460],[1000,460],[1000,580],[1180,580],[1180,460],[1360,460],
              [280,700],[460,700],[460,820],[640,820],
              [1000,700],[1180,700],[1180,820],[1360,820],
              [640,340],[820,100],[1360,340],[100,820],
              [460,340],[1180,340],[100,220],[100,340],[280,340],
            ].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4"/>)}
          </g>
          {/* accent nodes */}
          <g fill="#5DCAA5" opacity="0.28">
            {[
              [460,220],[820,340],[640,460],[1180,580],[280,580],[1000,700],[640,820],[280,340],[820,580]
            ].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="7"/>)}
          </g>
          {/* IC chips */}
          <g fill="none" stroke="#1A4A5C" strokeWidth="1.5" opacity="0.09">
            <rect x="560" y="168" width="80" height="52" rx="4"/>
            <line x1="560" y1="184" x2="536" y2="184"/><line x1="560" y1="200" x2="536" y2="200"/><line x1="560" y1="216" x2="536" y2="216"/>
            <line x1="640" y1="184" x2="664" y2="184"/><line x1="640" y1="200" x2="664" y2="200"/><line x1="640" y1="216" x2="664" y2="216"/>
            <rect x="900" y="288" width="80" height="52" rx="4"/>
            <line x1="900" y1="304" x2="876" y2="304"/><line x1="900" y1="320" x2="876" y2="320"/>
            <line x1="980" y1="304" x2="1004" y2="304"/><line x1="980" y1="320" x2="1004" y2="320"/>
            <rect x="380" y="528" width="80" height="52" rx="4"/>
            <line x1="380" y1="544" x2="356" y2="544"/><line x1="380" y1="560" x2="356" y2="560"/>
            <line x1="460" y1="544" x2="484" y2="544"/><line x1="460" y1="560" x2="484" y2="560"/>
            <rect x="1100" y="428" width="80" height="52" rx="4"/>
            <line x1="1100" y1="444" x2="1076" y2="444"/><line x1="1100" y1="460" x2="1076" y2="460"/>
            <line x1="1180" y1="444" x2="1204" y2="444"/><line x1="1180" y1="460" x2="1204" y2="460"/>
            <rect x="160" y="648" width="80" height="52" rx="4"/>
            <line x1="160" y1="664" x2="136" y2="664"/><line x1="160" y1="680" x2="136" y2="680"/>
            <line x1="240" y1="664" x2="264" y2="664"/><line x1="240" y1="680" x2="264" y2="680"/>
          </g>
        </svg>

        <div className="container">
          <div className="section-header">
            <span className="tag">Tools & Frameworks</span>
            <h2>Technologies We <span>Master</span></h2>
            <p>Every tool in our stack is chosen deliberately. For reliability, community support and suitability to the problem at hand.</p>
          </div>

          {categories.map((cat, ci) => (
            <div className="tech-category" key={ci}>
              <div className="tech-category-header">
                <div className="tech-cat-icon">
                  <i className={cat.icon}></i>
                </div>
                <h3>{cat.title}</h3>
              </div>
              <div className="tech-cards-grid">
                {cat.items.map((item, ii) => (
                  <div className="tech-card" key={ii}>
                    <div className="tc-icon">
                      <i className={item.icon}></i>
                    </div>
                    <div>
                      <strong>{item.name}</strong>
                      <span className="tc-desc">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ip-cta">
        <div className="container">
          <h2>Need a Specific <span>Stack?</span></h2>
          <p>Tell us your requirements and we will recommend the best technology fit for your project.</p>
          <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap',marginTop:'28px'}}>
            <Link to="/contact" className="btn btn-accent">Discuss Your Project</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
