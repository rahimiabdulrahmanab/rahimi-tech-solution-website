import { Link } from 'react-router-dom'
import './InnerPage.css'

const services = [
  {
    icon: 'fas fa-code',
    title: 'Web Application Development',
    desc: 'We build web applications that do real work. Customer portals, internal tools, SaaS platforms, dashboards. Built to be fast, secure and easy to maintain long-term.',
    items: ['React / Vue / Angular frontends', 'Node.js / Python / Laravel APIs', 'Database design & optimization', 'Third-party API integrations', 'Performance & SEO optimization'],
  },
  {
    icon: 'fas fa-cogs',
    title: 'Custom Software Development',
    desc: 'When off-the-shelf software does not fit your process, we write it from scratch. Your workflows, your rules, your data, shaped exactly how your business needs it.',
    items: ['Business process automation', 'Legacy system modernization', 'ERP & CRM development', 'Workflow management tools', 'Reporting & analytics dashboards'],
  },
  {
    icon: 'fas fa-server',
    title: 'Data Center & Infrastructure',
    desc: 'We design server rooms, install racks, configure networks and manage the physical IT backbone your software runs on. From small office setups to full data centers.',
    items: ['Server rack design & deployment', 'Network infrastructure', 'Storage solutions & SAN', 'Virtualization (VMware / Hyper-V)', 'Power & cooling management'],
  },
  {
    icon: 'fas fa-mobile-alt',
    title: 'Mobile App Development',
    desc: 'iOS and Android apps that people actually want to use. We handle design, development and publishing. You handle the business the app serves.',
    items: ['iOS (Swift / Objective-C)', 'Android (Kotlin / Java)', 'React Native & Flutter', 'App Store / Play Store publishing', 'Push notifications & offline sync'],
  },
  {
    icon: 'fas fa-cloud',
    title: 'Cloud Migration & DevOps',
    desc: 'Moving servers to the cloud, setting up automated deployments, reducing downtime. We handle the technical migration so your team does not have to figure it out.',
    items: ['AWS / Azure / Google Cloud', 'Docker & Kubernetes', 'CI/CD pipeline setup', 'Infrastructure as Code (Terraform)', 'Cloud cost optimization'],
  },
  {
    icon: 'fas fa-shield-alt',
    title: 'Cybersecurity Solutions',
    desc: 'We find the gaps in your security before someone else does. Firewall setup, penetration testing, security audits, endpoint protection, and incident response.',
    items: ['Firewall & intrusion detection', 'Penetration testing', 'Security audits & compliance', 'Endpoint protection', 'Incident response planning'],
  },
  {
    icon: 'fas fa-shopping-cart',
    title: 'eCommerce Development',
    desc: 'Online stores that actually convert. Built on Shopify, WooCommerce or fully custom when your business needs something specific. Fast, reliable and easy to manage.',
    items: ['Shopify / WooCommerce / Magento', 'Custom eCommerce platforms', 'Payment gateway integration', 'Inventory management', 'B2B & wholesale portals'],
  },
  {
    icon: 'fas fa-robot',
    title: 'AI & Machine Learning',
    desc: 'Practical AI. Prediction tools, document processing, smart search, chatbots and data analysis systems that solve actual business problems, not theoretical ones.',
    items: ['Predictive analytics', 'Natural language processing', 'Computer vision solutions', 'Chatbot & virtual assistant', 'Data science consulting'],
  },
  {
    icon: 'fas fa-headset',
    title: 'IT Consulting & Managed Services',
    desc: 'Tech strategy, vendor management, helpdesk support, and day-to-day IT management. We run your IT infrastructure so your team can focus on what they do best.',
    items: ['IT strategy & roadmap', 'Technology selection', 'Vendor management', '24/7 helpdesk support', 'IT outsourcing & staff augmentation'],
  },
]

export default function Services() {
  return (
    <div className="inner-page">
      <div className="page-banner services-banner">
        <div className="container">
          <h1>Our <span>Services</span></h1>
          <p>Software development, IT infrastructure, mobile apps, cloud and cybersecurity. For businesses, hospitals, schools and government offices across Afghanistan.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">›</span>
            <span>Services</span>
          </div>
        </div>
      </div>

      <section className="ip-section services-main-section">
        <div className="container">
          <div className="section-header">
            <span className="tag">What We Offer</span>
            <h2>What We <span>Build & Deliver</span></h2>
            <p>Nine service areas. One team. Whether you need a hospital management system or a simple business website, we build it properly and support it after launch.</p>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <div className="service-card" key={i}>
                <div className="service-card-icon">
                  <i className={s.icon}></i>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <ul>
                  {s.items.map((item, ii) => <li key={ii}>{item}</li>)}
                </ul>
                <Link to="/contact" className="learn-more">
                  Get a Quote <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ip-cta">
        <div className="container">
          <h2>Not Sure Where to <span>Start?</span></h2>
          <p>Tell us what you are trying to build or fix. We will give you an honest answer about whether we can help and what it would take.</p>
          <div style={{display:'flex',gap:'14px',justifyContent:'center',flexWrap:'wrap',marginTop:'28px'}}>
            <Link to="/contact" className="btn btn-accent">Book Free Consultation</Link>
            <Link to="/portfolio" className="btn btn-outline-white">View Our Work</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
