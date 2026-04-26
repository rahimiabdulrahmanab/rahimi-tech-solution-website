import { Link } from 'react-router-dom'
import './InnerPage.css'

const solutions = [
  {
    icon: 'fas fa-car',
    title: 'Dealer Management Systems',
    desc: 'End-to-end DMS for automotive dealerships. Inventory, sales pipeline, service scheduling, finance and customer management in one platform.',
    tags: ['Inventory', 'Sales CRM', 'Service Desk', 'Finance'],
  },
  {
    icon: 'fas fa-graduation-cap',
    title: 'School Management Systems',
    desc: 'Complete academic administration. Student records, attendance, grading, fee collection, timetable and parent communication portals.',
    tags: ['Admissions', 'Attendance', 'Grades', 'Fee Management'],
  },
  {
    icon: 'fas fa-building',
    title: 'Organization Management Systems',
    desc: 'Centralized platform for managing HR, departments, tasks, approvals, documents, and reporting across entire organizations.',
    tags: ['HR Module', 'Departments', 'Approvals', 'Reporting'],
  },
  {
    icon: 'fas fa-hospital',
    title: 'Hospital Management Systems',
    desc: 'Integrated HMS covering patient records, appointments, pharmacy, lab, billing, ward management, and clinical reporting.',
    tags: ['Patient Records', 'Lab & Pharmacy', 'Billing', 'OPD/IPD'],
  },
  {
    icon: 'fas fa-chart-bar',
    title: 'ERP & CRM Software',
    desc: 'Custom enterprise resource planning and CRM solutions that unify operations, finance, procurement, sales, and customer relations.',
    tags: ['Finance', 'Procurement', 'Sales Pipeline', 'Analytics'],
  },
  {
    icon: 'fas fa-cash-register',
    title: 'POS Software Development',
    desc: 'Fast, reliable point-of-sale systems for retail and hospitality. Inventory sync, receipts, multi-branch support and reporting.',
    tags: ['Retail POS', 'Multi-branch', 'Inventory', 'Reports'],
  },
  {
    icon: 'fas fa-exchange-alt',
    title: 'Money Exchange Management Systems',
    desc: 'Secure platforms for currency exchange businesses. Transaction tracking, rate management, compliance and audit trails.',
    tags: ['Transactions', 'Rate Management', 'Compliance', 'Audit'],
  },
  {
    icon: 'fas fa-map-marked-alt',
    title: 'Geographic Information Systems',
    desc: 'GIS platforms for mapping, spatial analysis, asset tracking, and location-based reporting for government and enterprise use.',
    tags: ['Mapping', 'Spatial Analysis', 'Asset Tracking', 'Reporting'],
  },
  {
    icon: 'fas fa-hands-helping',
    title: 'Volunteer Management Platform',
    desc: 'Platforms for NGOs and non-profits to recruit, schedule, track, and communicate with volunteers across programs and projects.',
    tags: ['NGO', 'Scheduling', 'Communication', 'Reporting'],
  },
  {
    icon: 'fas fa-pills',
    title: 'Pharmacy Management Systems',
    desc: 'Comprehensive pharmacy software for inventory, prescriptions, billing, supplier management, expiry alerts, and sales analytics.',
    tags: ['Inventory', 'Prescriptions', 'Billing', 'Expiry Alerts'],
  },
  {
    icon: 'fas fa-cogs',
    title: 'Custom Enterprise Solutions',
    desc: 'Bespoke software built around your exact business processes. From workflow automation to complex multi-module enterprise platforms.',
    tags: ['Workflow', 'Automation', 'Multi-module', 'Scalable'],
  },
]

export default function Solutions() {
  return (
    <div className="inner-page">
      <div className="page-banner solutions-banner">
        <div className="container">
          <h1>Software <span>Solutions</span></h1>
          <p>Purpose-built software systems for government, enterprise, healthcare, education and more. Engineered to fit Afghanistan's unique operational landscape.</p>
          <div className="breadcrumb">
            <Link to="/">Home</Link>
            <span className="sep">›</span>
            <span>Solutions</span>
          </div>
        </div>
      </div>

      <section className="ip-section solutions-content-section">
        <div className="container">
          <div className="section-header">
            <span className="tag">What We Build</span>
            <h2>Industry-Specific <span>Software Systems</span></h2>
            <p>Every solution is custom-built. No off-the-shelf compromises. We engineer platforms that match your workflows, scale with your organization and work reliably in Afghanistan's environment.</p>
          </div>

          <div className="solutions-page-grid">
            {solutions.map((s, i) => (
              <div className="sol-page-card" key={i}>
                <div className="sol-page-icon">
                  <i className={s.icon}></i>
                </div>
                <div className="sol-page-body">
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <div className="sol-page-tags">
                    {s.tags.map((tag, ti) => (
                      <span className="sol-tag" key={ti}>{tag}</span>
                    ))}
                  </div>
                  <Link to="/contact" className="sol-page-cta">
                    Request a Demo <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ip-cta">
        <div className="container">
          <h2>Need a <span>Custom Solution?</span></h2>
          <p>Don't see exactly what you need? We build fully custom platforms tailored to your organization's specific workflows and requirements.</p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '28px' }}>
            <Link to="/contact" className="btn btn-accent">Start Your Project</Link>
            <Link to="/services" className="btn btn-outline-white">Browse All Services</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
