import { Link } from 'react-router-dom'
import './InnerPage.css'

const industries = [
  {
    icon: 'fas fa-car',
    title: 'Automotive & Dealerships',
    desc: 'Dealer management systems, inventory tracking, service scheduling and customer portals for car dealerships across Afghanistan.',
    solutions: ['Dealer Management System', 'Inventory & Fleet Tracking', 'Service Desk Software', 'Customer CRM'],
    img: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80',
  },
  {
    icon: 'fas fa-hospital',
    title: 'Healthcare & Clinics',
    desc: 'Hospital management systems, patient records, pharmacy software, lab management and clinical billing for hospitals and clinics.',
    solutions: ['Hospital Management System', 'Patient Records (EMR)', 'Pharmacy Software', 'Lab & Billing Systems'],
    img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
  },
  {
    icon: 'fas fa-graduation-cap',
    title: 'Education & Schools',
    desc: 'School management systems, student portals, e-learning platforms and attendance tracking systems for schools and universities.',
    solutions: ['School Management System', 'Student Portal', 'E-learning Platform', 'Attendance & Grading'],
    img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80',
  },
  {
    icon: 'fas fa-shopping-cart',
    title: 'eCommerce & Retail',
    desc: 'Online stores, POS systems, inventory management and multi-branch retail platforms for businesses selling online and in-store.',
    solutions: ['eCommerce Platform', 'POS Software', 'Inventory Management', 'Multi-branch Retail'],
    img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&q=80',
  },
  {
    icon: 'fas fa-home',
    title: 'Real Estate & Mortgage',
    desc: 'Property listing platforms, mortgage calculators, agent CRMs and client management portals for real estate agencies.',
    solutions: ['Property Listing Platform', 'Agent CRM', 'Mortgage Calculator', 'Client Portal'],
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80',
  },
  {
    icon: 'fas fa-truck',
    title: 'Logistics & Transportation',
    desc: 'Fleet management, shipment tracking, route optimization and supply chain visibility systems for logistics and transport companies.',
    solutions: ['Fleet Management', 'Shipment Tracking', 'Route Optimization', 'Supply Chain System'],
    img: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&q=80',
  },
  {
    icon: 'fas fa-hands-helping',
    title: 'Non-Profit Organizations',
    desc: 'Volunteer management, donor portals, project tracking and beneficiary management systems for NGOs and non-profits in Afghanistan.',
    solutions: ['Volunteer Management', 'Donor Portal', 'Project Tracking', 'Beneficiary Management'],
    img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
  },
  {
    icon: 'fas fa-industry',
    title: 'Supply Chain & Manufacturing',
    desc: 'ERP systems, production tracking, supplier management, quality control and warehouse management for manufacturers.',
    solutions: ['Manufacturing ERP', 'Production Tracking', 'Supplier Management', 'Warehouse System'],
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
  },
  {
    icon: 'fas fa-hotel',
    title: 'Hospitality & Travel',
    desc: 'Hotel management systems, booking engines, restaurant POS, and customer loyalty platforms for hospitality businesses.',
    solutions: ['Hotel Management System', 'Online Booking Engine', 'Restaurant POS', 'Loyalty Platform'],
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80',
  },
  {
    icon: 'fas fa-university',
    title: 'Banking & Finance',
    desc: 'Secure financial platforms, money exchange systems, microfinance software, and fintech solutions for financial institutions.',
    solutions: ['Core Banking Module', 'Money Exchange System', 'Microfinance Software', 'Financial Reporting'],
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80',
  },
  {
    icon: 'fas fa-landmark',
    title: 'Government & Public Sector',
    desc: 'Digital government portals, citizen service platforms, document management systems, and e-governance solutions.',
    solutions: ['Citizen Service Portal', 'Document Management', 'e-Governance Platform', 'Reporting Dashboards'],
    img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
  },
]

export default function Industry() {
  return (
    <div className="inner-page">
      <div className="page-banner industry-banner">
        <div className="container">
          <h1>Industries <span>We Serve</span></h1>
          <p>From government and healthcare to retail and logistics. We deliver purpose-built software for every sector operating in Afghanistan and beyond.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">›</span>
            <span>Industry</span>
          </div>
        </div>
      </div>

      <section className="ip-section industry-section">
        <div className="container">
          <div className="section-header">
            <span className="tag">Sectors We Cover</span>
            <h2>Deep Expertise Across <span>Every Industry</span></h2>
            <p>We don't just write code. We understand your sector's workflows, compliance needs and operational challenges before building a single line.</p>
          </div>

          <div className="industry-page-grid">
            {industries.map((ind, i) => (
              <div className="ind-page-card" key={i}>
                <div className="ind-page-img">
                  <img src={ind.img} alt={ind.title} loading="lazy" />
                  <div className="ind-page-overlay">
                    <div className="ind-page-icon">
                      <i className={ind.icon}></i>
                    </div>
                  </div>
                </div>
                <div className="ind-page-body">
                  <h3>{ind.title}</h3>
                  <p>{ind.desc}</p>
                  <ul className="ind-solution-list">
                    {ind.solutions.map((sol, si) => (
                      <li key={si}><i className="fas fa-check-circle"></i> {sol}</li>
                    ))}
                  </ul>
                  <Link to="/contact" className="sol-page-cta">
                    Get a Quote <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ip-cta">
        <div className="container">
          <h2>Don't See Your <span>Industry?</span></h2>
          <p>We work across all sectors. Contact us and we'll tailor the right technology solution for your specific field.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '28px' }}>
            <Link to="/contact" className="btn btn-accent">Talk to Our Team</Link>
            <Link to="/solutions" className="btn btn-outline-white">View Our Solutions</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
