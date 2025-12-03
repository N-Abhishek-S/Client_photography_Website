import React, { useRef, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import LOGOGURUWHITE from "../assets/images/LOGOGURUWHITE.png";

function Header() {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const buttonRef = useRef(null);
  const menuItemsRef = useRef([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Initial animations
    const tl = gsap.timeline();
    
    // Animate logo with smooth entrance
    tl.fromTo(
      logoRef.current,
      { 
        x: -50, 
        opacity: 0,
      },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.8,
        ease: "power3.out"
      }
    );
    
    // Animate menu items with staggered effect
    if (menuItemsRef.current.length > 0) {
      tl.fromTo(
        menuItemsRef.current,
        { 
          y: -20, 
          opacity: 0,
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.5)"
        },
        "-=0.4"
      );
    }
    
    // Animate button
    tl.fromTo(
      buttonRef.current,
      { 
        scale: 0, 
        opacity: 0,
      },
      { 
        scale: 1, 
        opacity: 1, 
        duration: 0.5,
        ease: "elastic.out(1, 0.5)"
      },
      "-=0.2"
    );

    // Scroll effects
    const handleScroll = () => {
      // Update scroll progress
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(Math.min(progress, 1));

      // Navbar background effect
      if (navRef.current) {
        if (window.scrollY > 50) {
          gsap.to(navRef.current, {
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            backdropFilter: "blur(20px)",
            padding: "0.75rem 0",
            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          gsap.to(navRef.current, {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(10px)",
            padding: "1rem 0",
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial call
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Courses", path: "/courses" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const navLinkClass = ({ isActive }) => {
    return `relative px-3 py-2 text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
      isActive 
        ? 'text-yellow-400' 
        : 'text-gray-300 hover:text-white'
    }`;
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 w-full bg-black/80 backdrop-blur-lg border-b border-white/10 transition-all duration-300"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo - Fixed Section */}
            <div ref={logoRef} className="flex items-center">
              <NavLink 
                to="/" 
                className="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 rounded-lg p-1"
              >
                <div className="relative">
                  <img 
                    src={LOGOGURUWHITE} 
                    alt="Guru Studio Logo" 
                    className="h-10 w-auto object-contain filter brightness-110 group-hover:brightness-125 transition-all duration-300"
                    loading="eager"
                  />
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-yellow-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                </div>
             
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item, index) => (
                <li
                  key={item.name}
                  ref={el => menuItemsRef.current[index] = el}
                  className="relative"
                >
                  <NavLink
                    to={item.path}
                    className={navLinkClass}
                  >
                    {item.name}
                    {/* Active/Hover underline */}
                    <span className={`absolute bottom-0 left-3 right-3 h-0.5 bg-linear-to-r from-yellow-400 to-orange-500 transform origin-left transition-transform duration-300 ${
                      location.pathname === item.path 
                        ? 'scale-x-100' 
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}></span>
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* CTA Button & Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              <NavLink 
                to="/booknow"
                ref={buttonRef}
                className={({ isActive }) => 
                  `relative overflow-hidden group bg-linear-to-r from-yellow-400 to-orange-500 text-black px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 ${
                    isActive ? 'ring-2 ring-white/30' : ''
                  }`
                }
              >
                <span className="relative z-10">Book Now</span>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300"></div>
              </NavLink>

              {/* Mobile Menu Button */}
              <button 
                onClick={toggleMenu}
                className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center group focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 rounded-lg"
                aria-label="Toggle menu"
              >
                <span 
                  className={`absolute w-6 h-0.5 bg-white transform transition-all duration-300 ease-out ${
                    isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                  }`}
                ></span>
                <span 
                  className={`absolute w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
                    isMenuOpen ? 'opacity-0 translate-x-4' : 'opacity-100'
                  }`}
                ></span>
                <span 
                  className={`absolute w-6 h-0.5 bg-white transform transition-all duration-300 ease-out ${
                    isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                  }`}
                ></span>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen 
                ? 'max-h-96 opacity-100 mt-4' 
                : 'max-h-0 opacity-0'
            }`}
          >
            <div className="bg-black/70 backdrop-blur-xl rounded-xl p-6 border border-white/10 shadow-2xl">
              <ul className="space-y-3">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => 
                        `block px-4 py-3 rounded-lg transition-all duration-300 font-medium text-sm uppercase tracking-wider ${
                          isActive
                            ? 'bg-linear-to-r from-yellow-400/20 to-orange-500/20 text-yellow-400 border-l-4 border-yellow-400'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
              
              {/* Mobile Contact Info */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="space-y-3 text-sm text-gray-400">
                  <div className="flex items-center space-x-3 hover:text-white transition-colors duration-300">
                    <div className="w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center">
                      <span className="text-yellow-400">📞</span>
                    </div>
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3 hover:text-white transition-colors duration-300">
                    <div className="w-8 h-8 rounded-full bg-yellow-400/10 flex items-center justify-center">
                      <span className="text-yellow-400">✉️</span>
                    </div>
                    <span>hello@gurustudio.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div 
          className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-yellow-400 via-orange-500 to-red-500 transform origin-left transition-transform duration-200 ease-out"
          style={{ 
            transform: `scaleX(${scrollProgress})`,
            width: '100%'
          }}
        />
      </nav>

      {/* Spacer for fixed header */}
      <div className="h-16"></div>
    </>
  );
}

export default Header;