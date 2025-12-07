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

    if (logoRef.current) {
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
          ease: "power3.out",
        }
      );
    }

    if (menuItemsRef.current && menuItemsRef.current.length > 0) {
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
          ease: "back.out(1.5)",
        },
        "-=0.4"
      );
    }

    if (buttonRef.current) {
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
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.2"
      );
    }

    // Scroll effects with reddish touch
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress =
        totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(Math.min(progress, 1));

      if (!navRef.current) return;

      if (window.scrollY > 50) {
        gsap.to(navRef.current, {
          backgroundColor: "rgba(25, 0, 0, 0.95)",
          backdropFilter: "blur(20px)",
          padding: "0.75rem 0",
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(navRef.current, {
          backgroundColor: "rgba(30, 0, 0, 0.8)",
          backdropFilter: "blur(10px)",
          padding: "1rem 0",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      tl.kill();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "psdfile", path: "/psdfile" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Courses", path: "/courses" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const navLinkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium uppercase tracking-wider transition-colors duration-300 ${
      isActive
        ? "text-red-400"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 w-full bg-linear-to-b from-black/90 via-black/80 to-[#1a0000] backdrop-blur-lg border-b border-red-900/20 transition-all duration-300"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div ref={logoRef} className="flex items-center">
              <NavLink
                to="/"
                className="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 rounded-lg p-1"
              >
                <div className="relative">
                  <img
                    src={LOGOGURUWHITE}
                    alt="Guru Studio Logo"
                    className="h-10 w-auto object-contain filter brightness-110 group-hover:brightness-125 transition-all duration-300"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-red-500/30 via-red-600/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                </div>
              </NavLink>
            </div>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item, index) => (
                <li
                  key={item.name}
                  ref={(el) => (menuItemsRef.current[index] = el)}
                  className="relative group"
                >
                  <NavLink to={item.path} className={navLinkClass}>
                    {item.name}
                    <span
                      className={`absolute bottom-0 left-3 right-3 h-0.5 bg-linear-to-r from-red-500 via-red-600 to-red-700 transform origin-left transition-transform duration-300 ${
                        location.pathname === item.path
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                    {location.pathname === item.path && (
                      <span className="absolute inset-0 bg-red-500/5 rounded-md animate-pulse" />
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center space-x-4">
              <NavLink
                to="/booknow"
                ref={buttonRef}
                className={({ isActive }) =>
                  `relative overflow-hidden group bg-linear-to-r from-red-600 via-red-500 to-red-700 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 hover:shadow-lg hover:shadow-red-500/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 ${
                    isActive ? "ring-2 ring-white/30" : ""
                  }`
                }
              >
                <span className="relative z-10 flex items-center">
                  Book Now
                  <svg
                    className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                <div className="absolute top-0 left-0 w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </NavLink>

              <button
                onClick={toggleMenu}
                className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center group focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 rounded-lg"
                aria-label="Toggle menu"
              >
                <div className="absolute inset-0 bg-red-900/0 group-hover:bg-red-900/10 rounded-lg transition-colors duration-300" />

                <span
                  className={`absolute w-6 h-0.5 bg-linear-to-r from-gray-300 to-white transform transition-all duration-300 ease-out ${
                    isMenuOpen
                      ? "rotate-45 translate-y-0 bg-linear-to-r from-red-400 to-red-500"
                      : "-translate-y-2"
                  }`}
                />
                <span
                  className={`absolute w-6 h-0.5 bg-linear-to-r from-gray-300 to-white transition-all duration-300 ease-out ${
                    isMenuOpen ? "opacity-0 translate-x-4" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute w-6 h-0.5 bg-linear-to-r from-gray-300 to-white transform transition-all duration-300 ease-out ${
                    isMenuOpen
                      ? "-rotate-45 translate-y-0 bg-linear-to-r from-red-400 to-red-500"
                      : "translate-y-2"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-linear-to-b from-black/90 to-[#1a0000] backdrop-blur-xl rounded-xl p-6 border border-red-900/30 shadow-2xl shadow-red-900/10">
              <ul className="space-y-3">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-lg transition-all duration-300 font-medium text-sm uppercase tracking-wider group ${
                          isActive
                            ? "bg-linear-to-r from-red-900/30 via-red-800/20 to-red-900/10 text-red-400 border-l-4 border-red-500"
                            : "text-gray-300 hover:text-white hover:bg-linear-to-r hover:from-red-900/10 hover:via-red-800/5 hover:to-transparent"
                        }`
                      }
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="flex items-center">
                        {item.name}
                        <svg
                          className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-red-900/30">
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3 hover:text-white text-gray-400 transition-all duration-300 group">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-red-900/20 to-red-800/10 flex items-center justify-center group-hover:from-red-800/30 group-hover:to-red-700/20 transition-all duration-300">
                      <span className="text-red-400 group-hover:scale-110 transition-transform">
                        📞
                      </span>
                    </div>
                    <span>9651791010</span>
                  </div>
                  <div className="flex items-center space-x-3 hover:text-white text-gray-400 transition-all duration-300 group">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-red-900/20 to-red-800/10 flex items-center justify-center group-hover:from-red-800/30 group-hover:to-red-700/20 transition-all duration-300">
                      <span className="text-red-400 group-hover:scale-110 transition-transform">
                        ✉️
                      </span>
                    </div>
                    <span>guruphotofilms@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Progress Bar */}
        <div
          className="absolute bottom-0 left-0 h-1 bg-linear-to-r from-red-600 via-red-500 to-red-700 transform origin-left transition-transform duration-200 ease-out shadow-lg shadow-red-500/20"
          style={{
            transform: `scaleX(${scrollProgress})`,
            width: "100%",
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-red-500/30 to-transparent" />
      </nav>

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
}

export default Header;
