// src/components/HomePage.jsx
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavLink } from 'react-router-dom';
import LOGOGURUWHITE from "../assets/images/LOGOGURUWHITE.png";

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules';

// Icons import
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const logoRef = useRef(null);
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);
  const portfolioGridRef = useRef(null);

  const [selectedProject, setSelectedProject] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const portfolioCategories = [
    {
      id: 1,
      title: "Wedding Photography",
      category: "Weddings",
      description: "Beautiful moments from love stories",
      thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1520854221256-17463ccb8b9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      ]
    },
    {
      id: 2,
      title: "Commercial Shoots",
      category: "Commercial",
      description: "Professional branding and advertising",
      thumbnail: "https://images.unsplash.com/photo-1492684223066-dd23140edf6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1492684223066-dd23140edf6d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      ]
    },
    {
      id: 3,
      title: "Portrait Sessions",
      category: "Portrait",
      description: "Expressive individual and group portraits",
      thumbnail: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      ]
    },
    {
      id: 4,
      title: "Fashion Photography",
      category: "Fashion",
      description: "Editorial and fashion campaigns",
      thumbnail: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      ]
    },
    {
      id: 5,
      title: "Event Coverage",
      category: "Events",
      description: "Corporate and social event photography",
      thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1519677100203-7c61d0b01354?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      ]
    },
    {
      id: 6,
      title: "Cinematography",
      category: "Film",
      description: "Professional video production",
      thumbnail: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1517230878791-4d28214057c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      ]
    }
  ];

  const openLightbox = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  // Add CSS for Swiper navigation arrows
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .swiper-button-next, .swiper-button-prev {
        color: white !important;
        background: rgba(0,0,0,0.5);
        width: 50px !important;
        height: 50px !important;
        border-radius: 50%;
      }
      .swiper-button-next:after, .swiper-button-prev:after {
        font-size: 20px !important;
      }
      .swiper-pagination-bullet {
        background: white !important;
      }
      .swiper-pagination-bullet-active {
        background: #fbbf24 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // ESC key and click outside to close
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && selectedProject) {
        closeLightbox();
      }
    };

    const handleClickOutside = (event) => {
      if (selectedProject && event.target.classList.contains('bg-black/95')) {
        closeLightbox();
      }
    };

    if (selectedProject) {
      document.addEventListener('keydown', handleEscKey);
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selectedProject]);

  // GSAP Animations
  useEffect(() => {
    if (!pageRef.current) return;

    const ctx = gsap.context(() => {
      // HERO
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
        );

        gsap.to(heroRef.current, {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      // LOGO
      if (logoRef.current) {
        gsap.fromTo(
          logoRef.current,
          { scale: 0, rotation: -180 },
          { scale: 1, rotation: 0, duration: 1, delay: 0.5, ease: 'back.out(1.7)' }
        );
      }

      // SERVICES
      const serviceEls = servicesRef.current ? Array.from(servicesRef.current.querySelectorAll('.service-card')) : [];
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
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // PORTFOLIO
      const portfolioEls = portfolioGridRef.current ? Array.from(portfolioGridRef.current.querySelectorAll('.portfolio-item')) : [];
      if (portfolioEls.length) {
        gsap.fromTo(
          portfolioEls,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            stagger: 0.3,
            scrollTrigger: {
              trigger: portfolioRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, pageRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1930&q=80")'
          }}
        />
        
        <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/50 z-10"></div>
        
        <div className="relative z-20 text-center px-4 sm:px-6 max-w-6xl mx-auto">
          <img 
            ref={logoRef}
            src={LOGOGURUWHITE} 
            alt="Logo Guru White" 
            className="mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mb-6"
          />
          
          <p className="text-xl md:text-2xl lg:text-3xl mb-6 md:mb-8 text-gray-200 font-light tracking-wide">
            Photo & Film Official
          </p>
          
          <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-12 max-w-2xl mx-auto text-gray-300 leading-relaxed px-4">
            Capturing moments that tell your story. Professional photography and cinematography services.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
            <NavLink to="/portfolio" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-yellow-400 text-black px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                View Portfolio
              </button>
            </NavLink>
            <NavLink to="/services" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto border-2 border-white px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
                Our Services
              </button>
            </NavLink>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-6 h-10 border-2 border-white/80 rounded-full flex justify-center animate-bounce">
            <div className="w-1 h-3 bg-white/80 rounded-full mt-2" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Photography',
                description: 'Professional photography sessions including portraits, events, and commercial shoots.',
                icon: '📸'
              },
              {
                title: 'Videography',
                description: 'Cinematic video production for weddings, commercials, and corporate events.',
                icon: '🎥'
              },
              {
                title: 'Editing',
                description: 'Professional photo and video editing to bring your vision to life.',
                icon: '🎬'
              }
            ].map((service, index) => (
              <div key={index} className="service-card bg-gray-800 p-8 rounded-2xl hover:bg-gray-700 transition-colors group">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section ref={portfolioRef} className="py-20 bg-black">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">
            Our Portfolio
          </h2>
          <p className="text-gray-400 text-center mb-12 md:mb-16 max-w-2xl mx-auto">
            Explore our work across different photography and film categories
          </p>
          
          <div ref={portfolioGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {portfolioCategories.map((project, index) => (
              <div 
                key={project.id}
                onClick={() => openLightbox(project)}
                className={`portfolio-item group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                  index === 0 || index === 3 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="aspect-square md:aspect-video relative overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block px-3 py-1 bg-yellow-400 text-black text-sm font-semibold rounded-full mb-3">
                      {project.category}
                    </span>
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base">
                      {project.description}
                    </p>
                    <div className="flex items-center mt-4">
                      <div className="flex -space-x-2">
                        {project.images.slice(0, 3).map((img, idx) => (
                          <div 
                            key={idx}
                            className="w-8 h-8 rounded-full border-2 border-black overflow-hidden"
                          >
                            <img 
                              src={img.replace('w=1920', 'w=100')} 
                              alt="" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                        {project.images.length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-black/80 border-2 border-black flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              +{project.images.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                      <span className="text-gray-400 text-sm ml-3">
                        {project.images.length} photos
                      </span>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 mx-auto">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                      </div>
                      <p className="text-white text-lg font-semibold">View Gallery</p>
                      <p className="text-gray-300 text-sm">Click to explore</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal - Fixed version */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4">
          {/* Simple Close Button - Fixed positioning */}
          <button
            onClick={closeLightbox}
            className="fixed top-8 right-8 z-50 bg-red-600 hover:bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-colors duration-300"
          >
            ✕
          </button>

          {/* Project Info */}
          <div className="text-center mb-8 max-w-3xl">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
              {selectedProject.title}
            </h3>
            <p className="text-gray-300 text-lg">{selectedProject.description}</p>
          </div>

          {/* Main Swiper Container */}
          <div className="w-full max-w-6xl">
            <Swiper
              modules={[Navigation, Pagination, Thumbs]}
              spaceBetween={10}
              navigation
              pagination={{ clickable: true }}
              thumbs={{ swiper: thumbsSwiper }}
              className="rounded-xl"
            >
              {selectedProject.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-video bg-black flex items-center justify-center">
                    <img
                      src={image}
                      alt={`${selectedProject.title} - ${index + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Image Counter */}
          <div className="text-center mt-6">
            <p className="text-gray-400">
              <span className="text-yellow-400 font-semibold">1</span> / {selectedProject.images.length} images
            </p>
          </div>

          {/* Thumbnail Swiper */}
          <div className="w-full max-w-3xl mt-6">
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={8}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Thumbs]}
              className="thumbnail-swiper"
            >
              {selectedProject.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="aspect-video rounded-lg overflow-hidden cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                    <img
                      src={image.replace('w=1920', 'w=400')}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Close Button at Bottom */}
          <button
            onClick={closeLightbox}
            className="mt-8 px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full font-semibold transition-colors duration-300"
          >
            Close Gallery
          </button>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-yellow-400 to-orange-500 text-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Create Something Amazing?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">Let's work together to capture your unique story through our lens.</p>
          <NavLink to="/contact">
            <button className="bg-black text-white px-12 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-colors">
              Get In Touch
            </button>
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export default HomePage;