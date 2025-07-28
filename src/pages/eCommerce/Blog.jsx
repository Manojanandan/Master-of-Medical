
import { FaUserMd, FaStethoscope, FaAmbulance, FaPhone, FaMapMarkerAlt, FaClock, FaHeart, FaBrain, FaChild, FaBone, FaSyringe, FaHandHoldingMedical } from 'react-icons/fa';

const API_KEY = 'Tk21ap3mVHhetx3KKpWGfO9jLeiEomY7vOhYH9WlwU86JxyCptwJjnHv'; // Replace with your actual Pexels API key
const API_URL = 'https://api.pexels.com/v1/search';

// Dynamically load Material-UI stylesheet
const loadMaterialUI = () => {
  if (!document.querySelector('link[href*="mui"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/mui/5.14.1/material-ui.min.css';
    document.head.appendChild(link);
  }
};

export default function MedicalWebsite() {
  const [blogImages, setBlogImages] = useState([]);
  const [heroImage, setHeroImage] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch images from Pexels API
  useEffect(() => {
    loadMaterialUI();
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const heroResponse = await fetch(`${API_URL}?query=professional+doctor+hospital+white+coat&per_page=1&orientation=portrait`, {
        headers: { Authorization: API_KEY },
      });
      const heroData = await heroResponse.json();
      if (heroData.photos && heroData.photos.length > 0) {
        setHeroImage(heroData.photos[0].src.large2x || heroData.photos[0].src.large);
      }

      const blogResponse = await fetch(`${API_URL}?query=medical+equipment+hospital+healthcare&per_page=4&orientation=landscape`, {
        headers: { Authorization: API_KEY },
      });
      const blogData = await blogResponse.json();
      if (blogData.photos) {
        setBlogImages(blogData.photos);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
    }
  };

  // Service data
  const services = [
    { title: 'Expert Consultations', icon: <FaUserMd />, description: 'Professional medical consultation and diagnosis services with experienced doctors.' },
    { title: 'Family Healthcare', icon: <FaStethoscope />, description: 'Comprehensive healthcare services for families and individuals of all ages.' },
    { title: 'Emergency Care', icon: <FaAmbulance />, description: '24/7 emergency medical services with rapid response team availability.' },
  ];

  // Blog post data
  const blogPosts = [
    { title: 'Modern Hospital Management', category: 'Business Life', content: 'Latest updates in medical business management and healthcare administration.' },
    { title: 'Advanced Medical Procedures', category: 'Medical', content: 'Innovative treatment methodologies and cutting-edge surgical techniques.' },
    { title: 'Preventive Healthcare', category: 'Healthcare', content: 'Comprehensive wellness programs and preventive care measures.' },
    { title: 'Specialized Treatments', category: 'Treatment', content: 'Personalized care approaches for complex medical conditions.' },
  ];

  // Styles with responsive adjustments
  const muiStyles = {
    container: { maxWidth: '1200px', margin: '0 auto', padding: '0 16px', '@media (max-width: 600px)': { padding: '0 12px' } },
    heroSection: { 
      background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)', 
      color: 'white', 
      padding: '80px 0 40px', 
      position: 'relative', 
      overflow: 'hidden',
      '@media (max-width: 768px)': { padding: '60px 0 30px' },
    },
    heroGrid: { 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
      gap: '40px', 
      alignItems: 'center',
      '@media (max-width: 768px)': { gridTemplateColumns: '1fr', gap: '20px' },
    },
    heroTitle: { 
      fontSize: '3rem', 
      fontWeight: 'bold', 
      marginBottom: '16px', 
      lineHeight: '1.2', 
      textShadow: '0 2px 4px rgba(0,0,0,0.2)',
      '@media (max-width: 600px)': { fontSize: '2.2rem' },
    },
    heroSubtitle: { 
      fontSize: '1.2rem', 
      marginBottom: '24px', 
      opacity: 0.9, 
      lineHeight: '1.6', 
      maxWidth: '600px',
      '@media (max-width: 600px)': { fontSize: '1rem' },
    },
    button: { 
      backgroundColor: 'white', 
      color: '#1976d2', 
      padding: '12px 32px', 
      border: 'none', 
      borderRadius: '8px', 
      fontWeight: 'bold', 
      fontSize: '16px', 
      cursor: 'pointer', 
      transition: 'all 0.3s ease', 
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      '@media (max-width: 600px)': { padding: '10px 24px', fontSize: '14px' },
    },
    heroImage: { 
      width: '100%', 
      maxWidth: '360px', 
      height: '450px', 
      objectFit: 'cover', 
      borderRadius: '12px', 
      boxShadow: '0 16px 32px rgba(0,0,0,0.3)', 
      display: 'block', 
      margin: '0 auto', 
      border: '6px solid rgba(255,255,255,0.1)',
      '@media (max-width: 768px)': { maxWidth: '300px', height: '350px' },
    },
    contactCards: { 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
      gap: '20px', 
      marginTop: '40px',
      '@media (max-width: 600px)': { gridTemplateColumns: '1fr', gap: '16px', marginTop: '24px' },
    },
    contactCard: { 
      backgroundColor: 'rgba(255,255,255,0.95)', 
      padding: '20px', 
      borderRadius: '10px', 
      textAlign: 'center', 
      boxShadow: '0 6px 18px rgba(0,0,0,0.1)', 
      backdropFilter: 'blur(6px)', 
      transition: 'transform 0.3s ease', 
      maxWidth: '240px',
      '@media (max-width: 600px)': { maxWidth: '100%', padding: '16px' },
    },
    contactIcon: { 
      fontSize: '2.5rem', 
      color: '#1976d2', 
      marginBottom: '15px', 
      background: 'rgba(25,118,210,0.1)', 
      width: '60px', 
      height: '60px', 
      borderRadius: '50%', 
      display: 'inline-flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      '@media (max-width: 600px)': { fontSize: '2rem', width: '50px', height: '50px' },
    },
    servicesSection: { 
      padding: '80px 0', 
      backgroundColor: '#f8f9fa', 
      position: 'relative', 
      overflow: 'hidden',
      '@media (max-width: 768px)': { padding: '60px 0' },
    },
    servicesGrid: { 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
      gap: '32px',
      '@media (max-width: 600px)': { gridTemplateColumns: '1fr', gap: '24px' },
    },
    serviceCard: { 
      backgroundColor: 'white', 
      padding: '40px 24px', 
      borderRadius: '12px', 
      textAlign: 'center', 
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)', 
      transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
      height: '100%', 
      position: 'relative', 
      overflow: 'hidden',
      '@media (max-width: 600px)': { padding: '32px 20px' },
    },
    serviceIcon: { 
      fontSize: '4rem', 
      marginBottom: '24px', 
      color: '#1976d2',
      '@media (max-width: 600px)': { fontSize: '3.5rem' },
    },
    blogSection: { 
      padding: '80px 0', 
      backgroundColor: 'white', 
      position: 'relative',
      '@media (max-width: 768px)': { padding: '60px 0' },
    },
    blogGrid: { 
      display: 'grid', 
      gridTemplateColumns: '2fr 1fr', 
      gap: '48px',
      '@media (max-width: 768px)': { gridTemplateColumns: '1fr', gap: '32px' },
    },
    blogPost: { 
      backgroundColor: 'white', 
      border: '1px solid #e0e0e0', 
      borderRadius: '12px', 
      marginBottom: '24px', 
      overflow: 'hidden', 
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)', 
      transition: 'all 0.3s ease', 
      display: 'flex', 
      flexDirection: 'row',
      '@media (max-width: 600px)': { flexDirection: 'column' },
    },
    blogPostContent: { 
      display: 'flex', 
      flexDirection: 'row', 
      width: '100%',
      '@media (max-width: 600px)': { flexDirection: 'column' },
    },
    blogImage: { 
      width: '220px', 
      height: '180px', 
      objectFit: 'cover', 
      flexShrink: 0, 
      transition: 'transform 0.3s ease',
      '@media (max-width: 600px)': { width: '100%', height: '200px' },
    },
    blogContent: { 
      padding: '24px', 
      flex: 1,
      '@media (max-width: 600px)': { padding: '20px' },
    },
    chip: { 
      backgroundColor: '#1976d2', 
      color: 'white', 
      padding: '6px 16px', 
      borderRadius: '20px', 
      fontSize: '14px', 
      marginBottom: '12px', 
      display: 'inline-block', 
      fontWeight: '500',
      '@media (max-width: 600px)': { fontSize: '12px' },
    },
    sidebar: { 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '24px', 
      position: 'sticky', 
      top: '24px',
      '@media (max-width: 768px)': { position: 'static' },
    },
    sidebarCard: { 
      backgroundColor: 'white', 
      padding: '24px', 
      borderRadius: '12px', 
      border: '1px solid #e0e0e0', 
      boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
      '@media (max-width: 600px)': { padding: '20px' },
    },
    tagCloud: { 
      display: 'flex', 
      flexWrap: 'wrap', 
      gap: '8px',
    },
    tag: { 
      padding: '6px 12px', 
      backgroundColor: '#f5f5f5', 
      color: '#555', 
      borderRadius: '20px', 
      fontSize: '14px', 
      cursor: 'pointer', 
      transition: 'all 0.3s ease', 
      fontWeight: '500',
      '@media (max-width: 600px)': { fontSize: '12px' },
    },
    webinarSection: { 
      marginTop: '32px', 
      background: 'linear-gradient(to right, #e3f2fd, #bbdefb)', 
      padding: '32px', 
      borderRadius: '12px', 
      border: '1px solid #90caf9', 
      position: 'relative', 
      overflow: 'hidden',
      '@media (max-width: 600px)': { padding: '24px' },
    },
    ratingDots: { 
      display: 'flex', 
      gap: '8px', 
      marginTop: '16px',
    },
    ratingDot: { 
      width: '10px', 
      height: '10px', 
      borderRadius: '50%', 
      backgroundColor: '#e0e0e0', 
      transition: 'background-color 0.3s ease',
    },
    activeDot: { 
      backgroundColor: '#1976d2',
    },
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: "'Roboto', sans-serif" }}>
      {/* Hero Section */}
      <section style={muiStyles.heroSection} aria-label="Hero Section">
        <div style={muiStyles.container}>
          <div style={muiStyles.heroGrid}>
            <div>
              <h2 style={muiStyles.heroTitle}>Advanced Healthcare Solutions for Modern Life</h2>
              <p style={muiStyles.heroSubtitle}>Our team of experienced medical professionals provides comprehensive care using the latest technology and evidence-based practices to ensure optimal health outcomes.</p>
              <button
                style={muiStyles.button}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#f0f0f0';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 12px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
                }}
                onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(25,118,210,0.3)'}
                aria-label="Explore healthcare services"
              >
                Explore Services
              </button>
            </div>
            <div style={{ textAlign: 'center', position: 'relative' }}>
              {loading ? (
                <div style={{ width: '100%', maxWidth: '360px', height: '450px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '12px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FaUserMd style={{ fontSize: '3.5rem', color: 'rgba(255,255,255,0.5)' }} />
                </div>
              ) : heroImage ? (
                <img
                  src={heroImage}
                  alt="Professional Doctor"
                  style={muiStyles.heroImage}
                  loading="lazy"
                  onMouseOver={(e) => {
                    e.target.style.transform = 'scale(1.02)';
                    e.target.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 16px 32px rgba(0,0,0,0.3)';
                  }}
                />
              ) : (
                <div style={{ width: '100%', maxWidth: '360px', height: '450px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '12px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FaUserMd style={{ fontSize: '3.5rem', color: 'rgba(255,255,255,0.5)' }} />
                </div>
              )}
            </div>
          </div>

          {/* Contact Cards */}
          <div style={muiStyles.contactCards} role="region" aria-label="Contact Information">
            <div
              style={muiStyles.contactCard}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              tabIndex={0}
              role="button"
              aria-label="Emergency Contact Information"
            >
              <div style={muiStyles.contactIcon}><FaPhone aria-hidden="true" /></div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>Emergency Contact</h3>
              <p style={{ color: '#666', margin: 0, fontSize: '1rem' }}>+1 (555) 123-4567</p>
            </div>
            <div
              style={muiStyles.contactCard}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              tabIndex={0}
              role="button"
              aria-label="Our Location Information"
            >
              <div style={muiStyles.contactIcon}><FaMapMarkerAlt aria-hidden="true" /></div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>Our Location</h3>
              <p style={{ color: '#666', margin: 0, fontSize: '1rem' }}>123 Medical Center Drive, Health City, HC 12345</p>
            </div>
            <div
              style={muiStyles.contactCard}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              tabIndex={0}
              role="button"
              aria-label="Working Hours Information"
            >
              <div style={muiStyles.contactIcon}><FaClock aria-hidden="true" /></div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '10px', color: '#333' }}>Working Hours</h3>
              <p style={{ color: '#666', margin: 0, fontSize: '1rem' }}>24/7 Emergency Services</p>
              <p style={{ color: '#666', margin: '6px 0 0', fontSize: '1rem' }}>Mon-Fri: 8am - 8pm</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section style={muiStyles.servicesSection} aria-label="Our Services">
        <div style={muiStyles.container}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333', marginBottom: '16px', position: 'relative', display: 'inline-block' }}>
              Our Specialized Services
              <span style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', width: '70px', height: '4px', backgroundColor: '#1976d2', borderRadius: '2px' }}></span>
            </h2>
            <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              We offer a comprehensive range of medical services to meet all your healthcare needs with the highest standards of quality and care.
            </p>
          </div>

          <div style={muiStyles.servicesGrid}>
            {services.map((service, index) => (
              <div
                key={index}
                style={muiStyles.serviceCard}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                }}
                tabIndex={0}
                role="article"
                aria-label={`Service: ${service.title}`}
              >
                <div style={muiStyles.serviceIcon}>{service.icon}</div>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '16px', color: '#333', position: 'relative', paddingBottom: '12px' }}>
                  {service.title}
                  <span style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)', width: '40px', height: '3px', backgroundColor: '#1976d2', borderRadius: '2px' }}></span>
                </h3>
                <p style={{ color: '#666', lineHeight: '1.8', margin: 0, fontSize: '1rem' }}>{service.description}</p>
                <button
                  style={{ marginTop: '24px', backgroundColor: 'transparent', color: '#1976d2', border: '2px solid #1976d2', padding: '8px 20px', borderRadius: '8px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', transition: 'all 0.3s ease' }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#1976d2';
                    e.target.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#1976d2';
                  }}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(25,118,210,0.3)'}
                  aria-label={`Learn more about ${service.title}`}
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section style={muiStyles.blogSection} aria-label="Latest Medical News">
        <div style={muiStyles.container}>
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333', marginBottom: '12px', textAlign: 'center' }}>
              Latest Medical News & Updates
            </h2>
            <p style={{ color: '#666', fontSize: '1.1rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
              Stay informed with our regularly updated medical blog featuring health tips, research updates, and healthcare news.
            </p>
          </div>

          <div style={muiStyles.blogGrid}>
            <div>
              {blogPosts.map((post, index) => (
                <article
                  key={index}
                  style={muiStyles.blogPost}
                  onMouseOver={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.15)';
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1.05)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1)';
                  }}
                  tabIndex={0}
                  role="article"
                  aria-label={`Blog Post: ${post.title}`}
                >
                  <div style={muiStyles.blogPostContent}>
                    <div style={{ width: '220px', height: '180px', flexShrink: 0, overflow: 'hidden' }}>
                      {loading ? (
                        <div style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FaSyringe style={{ fontSize: '2.5rem', color: '#ccc' }} />
                        </div>
                      ) : blogImages[index] ? (
                        <img src={blogImages[index].src.medium} alt={post.title} style={muiStyles.blogImage} loading="lazy" />
                      ) : (
                        <div style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <FaSyringe style={{ fontSize: '2.5rem', color: '#ccc' }} />
                        </div>
                      )}
                    </div>
                    <div style={muiStyles.blogContent}>
                      <span style={muiStyles.chip}>{post.category}</span>
                      <h3 style={{ fontSize: '1.6rem', fontWeight: 'bold', marginBottom: '12px', color: '#333', lineHeight: '1.3' }}>{post.title}</h3>
                      <p style={{ color: '#666', marginBottom: '16px', lineHeight: '1.8', fontSize: '1rem' }}>{post.content}</p>
                      <button
                        style={{ backgroundColor: 'transparent', color: '#1976d2', border: '2px solid #1976d2', padding: '8px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', transition: 'all 0.3s ease' }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = '#1976d2';
                          e.target.style.color = 'white';
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#1976d2';
                        }}
                        onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(25,118,210,0.3)'}
                        aria-label={`Read article: ${post.title}`}
                      >
                        Read Article →
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              <div style={muiStyles.webinarSection} role="complementary" aria-label="Upcoming Webinar">
                <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '16px', color: '#333', position: 'relative', paddingBottom: '12px' }}>
                  Upcoming Medical Webinar
                  <span style={{ position: 'absolute', bottom: '0', left: '0', width: '50px', height: '3px', backgroundColor: '#1976d2', borderRadius: '2px' }}></span>
                </h3>
                <p style={{ color: '#333', marginBottom: '20px', lineHeight: '1.8', fontSize: '1rem' }}>
                  Join our exclusive webinar on "Advances in Modern Medicine" featuring leading healthcare professionals discussing breakthrough treatments and innovative healthcare solutions.
                </p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <button
                    style={{ backgroundColor: '#1976d2', color: 'white', border: 'none', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', transition: 'background-color 0.3s ease' }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#1565c0'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#1976d2'}
                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(25,118,210,0.3)'}
                    aria-label="Register for webinar"
                  >
                    Register Now
                  </button>
                  <button
                    style={{ backgroundColor: 'transparent', color: '#1976d2', border: '2px solid #1976d2', padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', transition: 'all 0.3s ease' }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#1976d2';
                      e.target.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#1976d2';
                    }}
                    onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(25,118,210,0.3)'}
                    aria-label="Learn more about webinar"
                  >
                    Learn More
                  </button>
                </div>
                <div style={muiStyles.ratingDots}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} style={{ ...muiStyles.ratingDot, ...(i <= 3 ? muiStyles.activeDot : {}) }} />
                  ))}
                </div>
              </div>
            </div>

            <div style={muiStyles.sidebar}>
              <div style={muiStyles.sidebarCard} role="complementary" aria-label="Medical Departments">
                <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '20px', color: '#333', position: 'relative', paddingBottom: '12px' }}>
                  Medical Departments
                  <span style={{ position: 'absolute', bottom: '0', left: '0', width: '40px', height: '3px', backgroundColor: '#1976d2', borderRadius: '2px' }}></span>
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { name: 'Cardiology', icon: <FaHeart /> },
                    { name: 'Neurology', icon: <FaBrain /> },
                    { name: 'Pediatrics', icon: <FaChild /> },
                    { name: 'Orthopedics', icon: <FaBone /> },
                    { name: 'Oncology', icon: <FaSyringe /> },
                    { name: 'Dermatology', icon: <FaHandHoldingMedical /> },
                  ].map((item, i) => (
                    <li
                      key={i}
                      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', color: '#555', cursor: 'pointer', transition: 'all 0.3s ease', borderRadius: '8px', backgroundColor: '#f8f9fa' }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#e3f2fd';
                        e.currentTarget.style.color = '#1976d2';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                        e.currentTarget.style.color = '#555';
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Department: ${item.name}`}
                    >
                      <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                      <span style={{ fontSize: '1rem', fontWeight: '500' }}>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={muiStyles.sidebarCard} role="complementary" aria-label="Recent Updates">
                <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '20px', color: '#333', position: 'relative', paddingBottom: '12px' }}>
                  Recent Updates
                  <span style={{ position: 'absolute', bottom: '0', left: '0', width: '40px', height: '3px', backgroundColor: '#1976d2', borderRadius: '2px' }}></span>
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {['New Cancer Treatment Breakthrough', 'COVID-19 Vaccine Updates', 'Mental Health Awareness Month', 'Advancements in Robotic Surgery'].map((item, i) => (
                    <li
                      key={i}
                      style={{ paddingBottom: '12px', color: '#555', cursor: 'pointer', transition: 'color 0.3s ease', borderBottom: '1px solid #eee', lineHeight: '1.5' }}
                      onMouseOver={(e) => e.currentTarget.style.color = '#1976d2'}
                      onMouseOut={(e) => e.currentTarget.style.color = '#555'}
                      tabIndex={0}
                      role="button"
                      aria-label={`Update: ${item}`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={muiStyles.sidebarCard} role="complementary" aria-label="Medical Tags">
                <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '20px', color: '#333', position: 'relative', paddingBottom: '12px' }}>
                  Medical Tags
                  <span style={{ position: 'absolute', bottom: '0', left: '0', width: '40px', height: '3px', backgroundColor: '#1976d2', borderRadius: '2px' }}></span>
                </h3>
                <div style={muiStyles.tagCloud}>
                  {['Cardiology', 'Diabetes', 'Pediatrics', 'Surgery', 'Nutrition', 'Wellness', 'Vaccines', 'Mental Health', 'Prevention'].map((tag) => (
                    <span
                      key={tag}
                      style={muiStyles.tag}
                      onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#e3f2fd';
                        e.target.style.color = '#1976d2';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.backgroundColor = '#f5f5f5';
                        e.target.style.color = '#555';
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Tag: ${tag}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer style={{ backgroundColor: '#333', color: 'white', padding: '48px 0 24px', fontSize: '1rem' }} aria-label="Footer">
        <div style={muiStyles.container}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px', marginBottom: '32px' }}>
            <div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '20px', color: '#fff' }}>MediCare+</h3>
              <p style={{ color: '#bbb', lineHeight: '1.8', marginBottom: '16px' }}>Providing exceptional healthcare services with compassion and cutting-edge technology since 1995.</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {[<FaPhone />, <FaSyringe />, <FaHeart />, <FaBrain />].map((icon, i) => (
                  <div
                    key={i}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#444', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background-color 0.3s ease' }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1976d2'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#444'}
                    tabIndex={0}
                    role="button"
                    aria-label={`Social Link ${i + 1}`}
                  >
                    {icon}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px', color: '#fff' }}>Quick Links</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Home', 'Services', 'Doctors', 'Appointments', 'About Us', 'Contact'].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      style={{ color: '#bbb', textDecoration: 'none', transition: 'color 0.3s ease' }}
                      onMouseOver={(e) => e.target.style.color = '#1976d2'}
                      onMouseOut={(e) => e.target.style.color = '#bbb'}
                      aria-label={`Navigate to ${item}`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px', color: '#fff' }}>Services</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['Emergency Care', 'Cardiac Surgery', 'Dental Care', 'Neurology', 'Pediatrics', 'Diagnostics'].map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      style={{ color: '#bbb', textDecoration: 'none', transition: 'color 0.3s ease' }}
                      onMouseOver={(e) => e.target.style.color = '#1976d2'}
                      onMouseOut={(e) => e.target.style.color = '#bbb'}
                      aria-label={`Navigate to ${item}`}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px', color: '#fff' }}>Newsletter</h3>
              <p style={{ color: '#bbb', lineHeight: '1.8', marginBottom: '16px' }}>Subscribe to our newsletter for the latest health news and updates.</p>
              <div style={{ display: 'flex', marginBottom: '12px' }}>
                <input
                  type="email"
                  placeholder="Your Email"
                  style={{ flex: 1, padding: '10px 12px', border: 'none', borderRadius: '8px 0 0 8px', fontSize: '14px' }}
                  aria-label="Email for newsletter subscription"
                />
                <button
                  style={{ backgroundColor: '#1976d2', color: 'white', border: 'none', padding: '0 16px', borderRadius: '0 8px 8px 0', cursor: 'pointer', fontWeight: '600', transition: 'background-color 0.3s ease' }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#1565c0'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#1976d2'}
                  onFocus={(e) => e.target.style.boxShadow = '0 0 0 3px rgba(25,118,210,0.3)'}
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe
                </button>
              </div>
              <p style={{ color: '#777', fontSize: '0.85rem', lineHeight: '1.6' }}>We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #444', paddingTop: '24px', textAlign: 'center', color: '#777' }}>
            <p>© {new Date().getFullYear()} MediCare+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}