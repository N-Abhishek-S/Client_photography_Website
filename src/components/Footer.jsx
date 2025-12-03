import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { NavLink } from "react-router-dom";


import {
  FaInstagram,
  FaYoutube,
  FaFacebook,
  FaXTwitter,
  FaLinkedin,
} from "react-icons/fa6";

function Footer() {
  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const columnsRef = useRef([]);
  const socialRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 80%",
        end: "bottom bottom",
        toggleActions: "play none none reverse",
      },
    });

    // Animate logo
    tl.fromTo(
      logoRef.current,
      {
        y: 50,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      }
    );

    // Animate columns with stagger
    tl.fromTo(
      columnsRef.current,
      {
        y: 30,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // Animate social icons
    tl.fromTo(
      socialRef.current?.querySelectorAll(".social-icon"),
      {
        scale: 0,
        rotation: -180,
      },
      {
        scale: 1,
        rotation: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "elastic.out(1, 0.8)",
      },
      "-=0.2"
    );

    // Animate bottom section
    tl.fromTo(
      bottomRef.current,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.3"
    );
  }, []);

   const menuItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Courses", path: "/courses" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" }
  ];

  const services = [
    "Photography",
    "Videography",
    "Editing",
    "Consultation",
    "Courses",
    "PSD Files",
  ];
  const contactInfo = [
    { icon: "✉️", text: "guruphotofilms@gmail.com" },
    { icon: "📞", text: "+91 9651791010" },
    {
      icon: "📍",
      text: "Guru Photofilms, Parmar Complex, Near Bus Stop, Parli Vaijnath, Dist. Beed, Pin Code-431515",
    },
  ];

const socialLinks = [
  { name: 'Instagram', icon: <FaInstagram color="#E4405F" />, url: 'https://www.instagram.com/guru_photofilms/' },
  { name: 'YouTube', icon: <FaYoutube color="#FF0000" />, url: '#' },
  { name: 'Facebook', icon: <FaFacebook color="#1877F2" />, url: 'https://www.facebook.com/guruphotofilms' },
  { name: 'Twitter', icon: <FaXTwitter color="#000000" />, url: '#' },
  { name: 'LinkedIn', icon: <FaLinkedin color="#0A66C2" />, url: '#' }
];

  return (
    <div>
      <footer ref={footerRef} className="bg-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-6 py-16 relative z-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-6 gap-8 mb-12">
            {/* Brand Column */}
            <div className="xl:col-span-2">
              <div ref={logoRef} className="mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 bg-linear-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                  <h3 className="text-3xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    GURU
                  </h3>
                </div>
                <p className="text-gray-400 text-lg mb-6 max-w-md">
                  Creating timeless visual stories through professional
                  photography and cinematography. Let us capture your moments
                  with artistic excellence.
                </p>

                {/* Newsletter Signup */}
                <div className="bg-gray-800/50 rounded-2xl p-6 backdrop-blur-sm border border-gray-700">
                  <h4 className="font-semibold text-white mb-3">
                    Stay Updated
                  </h4>
                  <div className="flex space-x-2">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                    />
                    <button className="bg-linear-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-lg font-semibold hover:shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105">
                      Join
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
          <div ref={(el) => (columnsRef.current[0] = el)}>
  <h4 className="font-semibold text-white mb-6 text-lg relative inline-block">
    Quick Links
    <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-yellow-400 to-orange-500"></div>
  </h4>

  <ul className="space-y-3">
    {menuItems.map((item) => (
      <li key={item.name}>
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `flex items-center group transition-all duration-300 ${
              isActive ? "text-yellow-400" : "text-gray-400"
            }`
          }
        >
          <span
            className={`w-2 h-2 rounded-full mr-3 transition-all duration-300 ${
              /* Bullet turns yellow when active/hover */
              window.location.pathname === item.path
                ? "bg-yellow-400 scale-150"
                : "bg-gray-600 group-hover:bg-yellow-400 group-hover:scale-150"
            }`}
          ></span>

          {item.name}
        </NavLink>
      </li>
    ))}
  </ul>
</div>


            {/* Services */}
            <div ref={(el) => (columnsRef.current[1] = el)}>
              <h4 className="font-semibold text-white mb-6 text-lg relative inline-block">
                Services
                <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-linear-to-r from-yellow-400 to-orange-500"></div>
              </h4>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={service}>
                    <a
                      href={`#${service.toLowerCase()}`}
                      className="text-gray-400 hover:text-yellow-400 transition-all duration-300 flex items-center group"
                    >
                      <span className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:bg-yellow-400 group-hover:scale-150 transition-all duration-300"></span>
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div ref={(el) => (columnsRef.current[2] = el)}>
              <h4 className="font-semibold text-white mb-6 text-lg relative inline-block">
                Contact
                <div className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-linear-to-r from-yellow-400 to-orange-500"></div>
              </h4>
              <ul className="space-y-4">
                {contactInfo.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start space-x-3 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <span className="text-yellow-400 mt-1">{item.icon}</span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>

              {/* Social Links */}
              <div ref={socialRef} className="mt-8">
                <h5 className="font-semibold text-white mb-4">Follow Us</h5>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="social-icon bg-gray-800 w-10 h-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-yellow-400 hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 hover:shadow-lg hover:shadow-yellow-400/20"
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div ref={bottomRef} className="border-t border-gray-800 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
              <div className="text-gray-400 text-center lg:text-left">
                <p>
                  &copy; 2024 Guru Photo Film Official. All rights reserved.
                </p>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-end space-x-6 text-sm text-gray-500">
                <a
                  href="#"
                  className="hover:text-yellow-400 transition-colors duration-300"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="hover:text-yellow-400 transition-colors duration-300"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="hover:text-yellow-400 transition-colors duration-300"
                >
                  Cookie Policy
                </a>
                <a
                  href="#"
                  className="hover:text-yellow-400 transition-colors duration-300"
                >
                  Sitemap
                </a>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="flex justify-center mt-8 space-x-6 opacity-60">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">5K+</div>
                <div className="text-xs text-gray-400">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">10+</div>
                <div className="text-xs text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">500+</div>
                <div className="text-xs text-gray-400">Projects Done</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-10 right-10 w-4 h-4 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute bottom-20 left-10 w-6 h-6 bg-orange-500 rounded-full opacity-30 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-yellow-400 rounded-full opacity-40 animate-bounce"></div>
      </footer>
    </div>
  );
}

export default Footer;
