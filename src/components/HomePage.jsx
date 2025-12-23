import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavLink } from "react-router-dom";
import LOGOGURUWHITE from "../assets/images/LOGOGURUWHITE.png";

// Import specific functions for portfolio services
import { getPortfolioServices, getMainServices } from "../appwrite";

// Icons
import { Loader2 } from "lucide-react";

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

  // Get image URL - FIXED VERSION
  const getImageUrl = (item) => {
    console.log("Getting image URL for item:", item);
    
    // Check for image in various possible fields
    const possibleImageFields = [
      'image',
      'imageUrl',
      'imageURL',
      'image_id',
      'imageId',
      'fileId',
      'thumbnail',
      'imageFileId',
      'coverImage',
      'mainImage'
    ];

    let imageValue = null;

    // Find the first field that contains an image value
    for (const field of possibleImageFields) {
      if (item[field]) {
        imageValue = item[field];
        console.log(`Found image value in field '${field}':`, imageValue);
        break;
      }
    }

    // If imageValue is already a URL (starts with http), return it directly
    if (imageValue && imageValue.startsWith('http')) {
      console.log("Returning direct URL:", imageValue);
      return imageValue;
    }

    // If imageValue is a file ID (not a URL), construct the Appwrite URL
    if (imageValue) {
      const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
      const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
      const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID || import.meta.env.VITE_APPWRITE_SERVICES_BUCKET_ID;

      if (bucketId && projectId && imageValue) {
        const imageUrl = `${endpoint}/storage/buckets/${bucketId}/files/${imageValue}/view?project=${projectId}`;
        console.log("Constructed Appwrite image URL:", imageUrl);
        return imageUrl;
      } else {
        console.warn("Missing Appwrite configuration:", { bucketId, projectId, imageValue });
      }
    }

    // Fallback based on service type
    const title = item.title || item.serviceName || item.name || "";
    console.log("No image found, using fallback for title:", title);

    if (title.toLowerCase().includes('wedding')) {
      return "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    }

    if (title.toLowerCase().includes('portrait') || title.toLowerCase().includes('photo') || title.toLowerCase().includes('photography')) {
      return "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    }

    if (title.toLowerCase().includes('commercial') || title.toLowerCase().includes('business')) {
      return "https://images.unsplash.com/photo-1464822759844-d62ea2ef67f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
    }

    if (title.toLowerCase().includes('video') || title.toLowerCase().includes('videography')) {
      return "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
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
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
        );
      }

      // Main services animation
      if (servicesRef.current) {
        const serviceEls = Array.from(servicesRef.current.querySelectorAll(".service-card"));
        
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
      }

      // Portfolio services animation
      if (portfolioRef.current) {
        const portfolioEls = Array.from(portfolioRef.current.querySelectorAll(".portfolio-item"));
        
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
              {mainServices.map((service) => {
                const imageUrl = getImageUrl(service);
                const serviceTitle = service.title || service.serviceName || 'Service';
                const serviceDescription = service.description || service.shortDescription || 'No description available';
                const price = service.price || service.startingPrice || service.basePrice || 0;
                
                return (
                  <div
                    key={service.$id}
                    className="service-card bg-gray-800 p-6 rounded-2xl hover:bg-gray-700 transition-all hover:scale-[1.02]"
                  >
                    <div className="mb-6 overflow-hidden rounded-xl h-64">
                      <img 
                        src={imageUrl} 
                        alt={serviceTitle}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          console.error("Failed to load image:", imageUrl);
                          e.target.src = "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3">
                      {serviceTitle}
                    </h3>
                    
                    <p className="text-gray-400 mb-4">
                      {serviceDescription}
                    </p>
                    
                    {price > 0 && (
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                        <div>
                          <p className="text-yellow-400 font-bold text-xl">
                            ${price}
                          </p>
                          <p className="text-gray-500 text-sm">Starting price</p>
                        </div>
                        <NavLink to={`/booknow?service=${encodeURIComponent(serviceTitle)}`}>
                          <button className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                            Book Now
                          </button>
                        </NavLink>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
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
                {portfolioServices.slice(0, 4).map((service) => {
                  const imageUrl = getImageUrl(service);
                  const serviceTitle = service.serviceName || service.title || service.name || 'Portfolio Service';
                  const serviceCategory = service.category || service.type || '';
                  const serviceDescription = service.shortDescription || service.description || '';
                  const price = service.price || 0;
                  
                  return (
                    <div 
                      key={service.$id} 
                      className="portfolio-item bg-gray-900 p-4 rounded-xl hover:bg-gray-800 transition-all group"
                    >
                      <div className="overflow-hidden rounded-lg mb-4 h-48">
                        <img 
                          src={imageUrl} 
                          alt={serviceTitle}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            console.error("Failed to load portfolio image:", imageUrl);
                            e.target.src = "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">
                        {serviceTitle}
                      </h3>
                      
                      {serviceCategory && (
                        <span className="inline-block px-3 py-1 bg-yellow-400/20 text-yellow-300 rounded-full text-sm mb-3">
                          {serviceCategory}
                        </span>
                      )}
                      
                      <p className="text-gray-400 text-sm mb-3">
                        {serviceDescription.substring(0, 100)}
                        {serviceDescription.length > 100 ? '...' : ''}
                      </p>
                      
                      {price > 0 && (
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
                          <span className="text-yellow-400 font-bold">
                            ${price}
                          </span>
                          <NavLink to={`/portfolio/${service.$id}`}>
                            <button className="text-sm bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded transition-colors">
                              View
                            </button>
                          </NavLink>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {/* Portfolio Gallery Preview */}
              <div className="mt-16">
                <h3 className="text-2xl font-bold text-center mb-8">Portfolio Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {portfolioServices.map((service, index) => {
                    if (index >= 8) return null;
                    
                    const imageUrl = getImageUrl(service);
                    const serviceTitle = service.serviceName || service.title || service.name || `Project ${index + 1}`;
                    
                    return (
                      <div key={`gallery-${service.$id}-${index}`} className="portfolio-item overflow-hidden rounded-lg group cursor-pointer relative">
                        <img 
                          src={imageUrl} 
                          alt={serviceTitle}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            console.error("Failed to load gallery image:", imageUrl);
                            e.target.src = "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <span className="text-white font-semibold text-sm px-2 text-center">
                            {serviceTitle}
                          </span>
                        </div>
                      </div>
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