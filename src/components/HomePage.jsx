// src/components/HomePage.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap'; // default import
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavLink } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const logoRef = useRef(null);
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);

  useEffect(() => {
    if (!pageRef.current) return;

    // scope animations to pageRef and enable safe cleanup
    const ctx = gsap.context(() => {
      // HERO
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }
        );

        // Parallax (guarded)
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
      const portfolioEls = portfolioRef.current ? Array.from(portfolioRef.current.querySelectorAll('.portfolio-item')) : [];
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
      // revert context (kills timelines & ScrollTriggers created within)
      ctx.revert();
    };
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-black/70 to-black/50 z-10"></div>
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1930&q=80")'
          }}
        />
        <div className="relative z-20 text-center px-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">GURU</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">Photo & Film Official</p>
          <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-gray-400">
            Capturing moments that tell your story. Professional photography and cinematography services.
          </p>
          <div className="space-x-4">
            <NavLink to="/portfolio">
            <button className="bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 transition-colors">
              View Portfolio
            </button>
            </NavLink>
            <NavLink to="/services">
            <button className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition-colors">
              Our Services
            </button>
            </NavLink>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
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
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Our Portfolio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="portfolio-item group relative overflow-hidden rounded-2xl cursor-pointer">
                <img
                  src={`https://images.unsplash.com/photo-15${item}06928472-5d3f3c6ede32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                  alt={`Portfolio ${item}`}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-xl font-semibold">View Project</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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