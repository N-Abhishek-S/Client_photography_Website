import React, { useRef, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { gsap } from "gsap";

function Header() {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const buttonRef = useRef(null);
  const menuItemsRef = useRef([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Animate logo with more dynamic effect
    tl.fromTo(
      logoRef.current,
      { 
        x: -100, 
        opacity: 0,
        rotation: -10 
      },
      { 
        x: 0, 
        opacity: 1, 
        rotation: 0,
        duration: 1,
        ease: "elastic.out(1, 0.8)"
      }
    );
    
    // Animate menu items with staggered effect
    tl.fromTo(
      menuItemsRef.current,
      { 
        y: -30, 
        opacity: 0,
        scale: 0.8 
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)"
      },
      "-=0.5"
    );
    
    // Animate button with bounce effect
    tl.fromTo(
      buttonRef.current,
      { 
        scale: 0, 
        opacity: 0,
        rotation: -180 
      },
      { 
        scale: 1, 
        opacity: 1, 
        rotation: 0,
        duration: 0.8,
        ease: "bounce.out"
      },
      "-=0.3"
    );

    // Add scroll effect
    const handleScroll = () => {
      if (window.scrollY > 100) {
        gsap.to(navRef.current, {
          backgroundColor: "rgba(0, 0, 0, 0.95)",
          backdropFilter: "blur(20px)",
          padding: "1rem 0",
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        gsap.to(navRef.current, {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(10px)",
          padding: "1.5rem 0",
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
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

  // NavLink active class function
  const navLinkClass = ({ isActive }) => {
    return `transition-colors duration-300 font-medium text-sm uppercase tracking-wider ${
      isActive ? 'text-yellow-400' : 'text-gray-300 hover:text-white'
    }`;
  };

  return (
    <div>
      <nav
        ref={navRef}
        className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 transition-all duration-300"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo with gradient effect */}
            <NavLink 
              to="/"
              ref={logoRef}
              className="flex items-center space-x-2 group"
            >
              <div className="w-3 h-3 bg-linear-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse group-hover:scale-150 transition-transform duration-300"></div>
              <span className="text-2xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent tracking-widest">
                GURU
              </span>
              <span className="text-xs text-gray-400 font-light hidden sm:block group-hover:text-yellow-400 transition-colors duration-300">
                STUDIO
              </span>
            </NavLink>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item, index) => (
                <li
                  key={item.name}
                  ref={el => menuItemsRef.current[index] = el}
                  className="relative group"
                >
                  <NavLink
                    to={item.path}
                    className={navLinkClass}
                  >
                    {item.name}
                  </NavLink>
                  {/* Active indicator */}
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => 
                      `absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-yellow-400 to-orange-500 group-hover:w-full transition-all duration-300 ${
                        isActive ? 'w-full' : ''
                      }`
                    }
                  >
                    {/* Empty element for active state */}
                    <span className="opacity-0">{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <NavLink 
                to="/booknow"
                ref={buttonRef}
                className={({ isActive }) => 
                  `relative group bg-linear-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full font-semibold hover:shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105 ${
                    isActive ? 'ring-2 ring-white ring-opacity-50' : ''
                  }`
                }
              >
                <span className="relative z-10">Book Now</span>
                <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </NavLink>

              {/* Mobile Menu Button */}
              <button 
                onClick={toggleMenu}
                className="lg:hidden flex flex-col space-y-1.5 w-6 h-6 justify-center items-center group"
              >
                <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
          }`}>
            <div className="bg-black/50 rounded-2xl p-6 backdrop-blur-lg border border-white/10">
              <ul className="space-y-4">
                {menuItems.map((item, index) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => 
                        `block transition-colors duration-300 font-medium py-2 border-b ${
                          isActive
                            ? 'text-yellow-400 border-yellow-400/50'
                            : 'text-gray-300 hover:text-white border-white/5 hover:border-yellow-400/50'
                        }`
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex flex-col space-y-3 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <span>📞</span>
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>✉️</span>
                    <span>hello@gurustudio.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div 
          className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-yellow-400 to-orange-500 transform scale-x-0 origin-left transition-transform duration-300"
          style={{ 
            transform: `scaleX(${Math.min(window.scrollY / (document.body.scrollHeight - window.innerHeight), 1)})` 
          }}
        >
        </div>
      </nav>

      {/* Add some spacing for fixed header */}
      <div className="h-20"></div>
    </div>
  );
}

export default Header;