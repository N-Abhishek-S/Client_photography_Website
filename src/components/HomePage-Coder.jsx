import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLink } from "react-router-dom";
import LOGOGURUWHITE from "../assets/images/LOGOGURUWHITE.png";

// Import specific functions for portfolio services
import { getPortfolioServices, getMainServices } from "../appwrite";

// Icons
import { Camera, Video, BookOpen, Image as ImageIcon, Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const logoRef = useRef(null);
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);

  const [mainServices, setMainServices] = useState([]);
  const [portfolioServices, setPortfolioServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch both main services and portfolio services
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        console.log('Starting to fetch data...');
        
        // Fetch both types of services in parallel
        const [mainServicesData, portfolioServicesData] = await Promise.all([
          getMainServices(),
          getPortfolioServices()
        ]);
        
        console.log('Main services data:', mainServicesData);
        console.log('Portfolio services data:', portfolioServicesData);
        
        setMainServices(mainServicesData);
        setPortfolioServices(portfolioServicesData);
        
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get image URL - enhanced version
  const getImageUrl = (item) => {
    // Try different possible image fields
    const imageId = item.imageId || item.image || item.image_id || item.fileId || item.thumbnail;
    
    if (imageId) {
      // Construct the URL
      const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
      const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
      const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID;
      
      return `${endpoint}/storage/buckets/${bucketId}/files/${imageId}/view?project=${projectId}`;
    }
    
    // Fallback based on service type
    const title = item.title || item.serviceName || '';
    
    if (title.toLowerCase().includes('photo') || title.toLowerCase().includes('photography')) {
      return "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    }
    
    if (title.toLowerCase().includes('video') || title.toLowerCase().includes('videography')) {
      return "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    }
    
    if (title.toLowerCase().includes('design') || title.toLowerCase().includes('graphic')) {
      return "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    }
    
    // Default fallback
    return "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
  };

  // GSAP Animations
  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      );

      // Main services animation
      const serviceEls = servicesRef.current
        ? Array.from(servicesRef.current.querySelectorAll(".service-card"))
        : [];
      
      if (serviceEls.length) {
        gsap.fromTo(
          serviceEls,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Portfolio services animation
      const portfolioEls = portfolioRef.current
        ? Array.from(portfolioRef.current.querySelectorAll(".portfolio-item"))
        : [];
      
      if (portfolioEls.length) {
        gsap.fromTo(
          portfolioEls,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.3,
            scrollTrigger: {
              trigger: portfolioRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, [mainServices, portfolioServices]);

  // Render loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-yellow-400 animate-spin" />
        <span className="ml-4 text-gray-300">Loading services...</span>
      </div>
    );
  }

  return (
    <div ref={pageRef} className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1930&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-black/60 z-10"></div>

        <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
          <img
            ref={logoRef}
            src={LOGOGURUWHITE}
            alt="Logo Guru White"
            className="mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mb-6"
          />

          <p className="text-xl md:text-2xl lg:text-3xl mb-6 text-gray-200">
            Photography & Videography Services
          </p>

          <p className="text-base md:text-lg mb-8 max-w-2xl mx-auto text-gray-300">
            Capturing moments that tell your story.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink to="/portfolio">
              <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
                View Portfolio
              </button>
            </NavLink>
            <NavLink to="/services">
              <button className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all">
                Our Services
              </button>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section ref={servicesRef} className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">
            Our Main Services
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Professional services from Appwrite
          </p>
          
          {error ? (
            <div className="text-center py-12">
              <p className="text-red-400 mb-4">Error: {error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-yellow-500 text-black px-6 py-2 rounded-lg"
              >
                Retry
              </button>
            </div>
          ) : mainServices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No main services found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mainServices.map((service) => (
                <div
                  key={service.$id}
                  className="service-card bg-gray-800 p-6 rounded-2xl hover:bg-gray-700 transition-all hover:scale-[1.02]"
                >
                  <div className="mb-6 overflow-hidden rounded-xl h-64">
                    <img 
                      src={getImageUrl(service)} 
                      alt={service.title || service.serviceName}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">
                    {service.title || service.serviceName || 'Service'}
                  </h3>
                  
                  <p className="text-gray-400 mb-4">
                    {service.description || service.shortDescription || 'No description available'}
                  </p>
                  
                  {service.price && (
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                      <div>
                        <p className="text-yellow-400 font-bold text-xl">
                          ${typeof service.price === 'number' ? service.price : service.price}
                        </p>
                        <p className="text-gray-500 text-sm">Starting price</p>
                      </div>
                      <button className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                        Book Now
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <section ref={servicesRef} className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Photography",
                description:
                  "Professional photography sessions including portraits, events, and commercial shoots.",
                icon: "📸",
              },
              {
                title: "Videography",
                description:
                  "Cinematic video production for weddings, commercials, and corporate events.",
                icon: "🎥",
              },
              {
                title: "Album Design",
                description:
                  "Creative and visually stunning album designs that preserve your special moments beautifully.",
                icon: "📸",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="service-card bg-gray-800 p-8 rounded-2xl hover:bg-gray-700 transition-colors group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Portfolio Services Section */}
      <section ref={portfolioRef} className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Portfolio Services
            </h2>
            <p className="text-gray-400 mb-2">
              Featured portfolio work and services
            </p>
            <NavLink to="/portfolio">
              <span className="text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer">
                View all portfolio →
              </span>
            </NavLink>
          </div>
          
          {portfolioServices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No portfolio services available.</p>
              <p className="text-sm text-gray-500 mt-2">
                Add portfolio services to your Appwrite collection.
              </p>
            </div>
          ) : (
            <>
              {/* Display as cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {portfolioServices.slice(0, 4).map((service) => (
                  <div 
                    key={service.$id} 
                    className="portfolio-item bg-gray-900 p-4 rounded-xl hover:bg-gray-800 transition-all group"
                  >
                    <div className="overflow-hidden rounded-lg mb-4 h-48">
                      <img 
                        src={getImageUrl(service)} 
                        alt={service.serviceName || service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2">
                      {service.serviceName || service.title}
                    </h3>
                    
                    {service.category && (
                      <span className="inline-block px-3 py-1 bg-yellow-400/20 text-yellow-300 rounded-full text-sm mb-3">
                        {service.category}
                      </span>
                    )}
                    
                    <p className="text-gray-400 text-sm mb-3">
                      {service.shortDescription || service.description?.substring(0, 100)}
                      {service.description?.length > 100 ? '...' : ''}
                    </p>
                    
                    {service.price && (
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
                        <span className="text-yellow-400 font-bold">
                          ${service.price}
                        </span>
                        <NavLink to={`/portfolio/${service.$id}`}>
                          <button className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded transition-colors">
                            View
                          </button>
                        </NavLink>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Portfolio Gallery Preview */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-center mb-8">Portfolio Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {portfolioServices.map((service, index) => {
                    // Try to get gallery images if they exist
                    const galleryImages = service.galleryImages || [];
                    
                    return (
                      <React.Fragment key={`gallery-${service.$id}`}>
                        {/* Show first image as thumbnail */}
                        {getImageUrl(service) && index < 8 && (
                          <div className="portfolio-item overflow-hidden rounded-lg group cursor-pointer">
                            <img 
                              src={getImageUrl(service)} 
                              alt={`Portfolio ${index + 1}`}
                              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                              <span className="text-white font-semibold">
                                {service.serviceName || `Project ${index + 1}`}
                              </span>
                            </div>
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </>
          )}
          
          {/* Show counts */}
          {mainServices.length > 0 || portfolioServices.length > 0 ? (
            <div className="mt-16 text-center text-gray-500 text-sm">
              <div className="inline-flex gap-6">
                {mainServices.length > 0 && (
                  <span>{mainServices.length} main services</span>
                )}
                {portfolioServices.length > 0 && (
                  <span>{portfolioServices.length} portfolio services</span>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-linear-to-r from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Browse our portfolio services and main services to find exactly what you need for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink to="/services">
              <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
                View All Services
              </button>
            </NavLink>
            <NavLink to="/contact">
              <button className="border-2 border-yellow-400 text-yellow-400 px-8 py-3 rounded-full font-semibold hover:bg-yellow-400 hover:text-black transition-all">
                Contact Us
              </button>
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;