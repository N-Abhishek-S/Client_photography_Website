// pages/Portfolio.js
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavLink } from 'react-router-dom';
import Certificate1 from '../assets/images/Certificate1.jpg';
import Certificate2 from '../assets/images/Certificate2.jpg';
import PImage from '../assets/images/PImage.jpg';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode } from 'swiper/modules';

// Icons import
import { X, ChevronLeft, ChevronRight, Award, Calendar, School } from 'lucide-react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';

gsap.registerPlugin(ScrollTrigger);

const Owner3DPortfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [certThumbsSwiper, setCertThumbsSwiper] = useState(null);
  
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const certificatesRef = useRef(null);
  const projectsRef = useRef([]);

  // Photographer Data - UPDATED WITH REAL CERTIFICATE INFO
  const photographer = {
    name: "Guru\u00A0 photo\u00A0flims",
    title: "Professional Photographer, Videographer & Album Designer",
    location: "Parli City",
    email: "guruphotofilms@gmail.com",
    phone: "+91 9651791010",
    experience: "8+ Years",
    bio: "I'm a passionate photographer with over 8 years of experience capturing life's most precious moments. My journey began with a simple camera and a dream to tell stories through visuals. Today, I specialize in wedding, portrait, and commercial photography, bringing creativity and technical excellence to every project.",
    profileImage: PImage,
    coverImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    education: [
      "Certified in Photography & Film Making - Symbiosis International University",
      "Professional Designer - Ganesh Albums Academy",
      "Adobe Certified Professional Training"
    ],
    achievements: [
      "Certified by Symbiosis International (Deemed University)",
      "Professional Designer Certification from Ganesh Albums Academy",
      "Expertise in AI-Based Photoshop Training",
      "500+ Happy Clients Served"
    ]
  };

  // Certificate Data using uploaded certificates
  const certificates = [
    {
      id: 1,
      title: "Photography & Film Making",
      issuer: "Symbiosis International (Deemed University)",
      date: "April 2025",
      duration: "1 Month Course",
      description: "Certificate course in Photography & Film Making from Symbiosis Centre for Skill Development",
      image: Certificate2,
      details: {
        course: "Photography & Film Making",
        period: "01/04/2025 to 30/04/2025",
        accreditation: "NAAC Grade 'A+' | UGC Category-1",
        issuer: "Dr. Jaiprakash M. Paliwal, Director, SCSD, Nagpur"
      }
    },
    {
      id: 2,
      title: "AI-Based Photoshop Training",
      issuer: "Ganesh Albums Academy of Photography",
      date: "Feb - Apr 2025",
      duration: "2 Month Course",
      description: "Professional Designer certification with AI-Based Photoshop Training",
      image: Certificate1,
      details: {
        course: "AI-Based Photoshop Training",
        period: "16th FEB 2025 to 16th APR 2025",
        accreditation: "Professional Designer Certification",
        issuer: "K. Ganesh, Director & Faculty, Adobe Certified Professional"
      }
    }
  ];

  // Portfolio Projects with multiple images
  const portfolioProjects = [
    {
      id: 1,
      title: "Sarah & James Wedding",
      category: "wedding",
      description: "A beautiful outdoor wedding ceremony captured with cinematic elegance",
      thumbnail: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1520854221256-17463ccb8b9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      ]
    },
    {
      id: 2,
      title: "Corporate Headshots",
      category: "portrait",
      description: "Professional headshots for TechStart Inc's executive team",
      thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false,
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      ]
    },
    {
      id: 3,
      title: "Luxury Watch Campaign",
      category: "commercial",
      description: "Product photography for ChronoLux Watches",
      thumbnail: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true,
      images: [
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      ]
    },
  ];

  // Skills and Specialties
  const skills = [
    {
      category: "Photography",
      items: ["Portrait Photography", "Wedding Photography", "Commercial Photography", "Event Photography", "Product Photography"]
    },
    {
      category: "Technical Skills",
      items: ["Lighting Techniques", "Photo Editing", "Color Grading", "Composition", "Studio Setup"]
    },
    {
      category: "Software",
      items: ["Adobe Photoshop", "Adobe Lightroom", "Capture One", "Final Cut Pro", "DaVinci Resolve"]
    }
  ];

  // Equipment
  const equipment = [
    { category: "Cameras", items: ["Canon EOS R5", "Sony A7IV", "Fujifilm X-T4"] },
    { category: "Lenses", items: ["Canon RF 50mm f/1.2", "Sony 24-70mm f/2.8", "Fujifilm 56mm f/1.2"] },
    { category: "Lighting", items: ["Profoto B10 Plus", "Godox AD200 Pro", "Studio Softboxes"] }
  ];

  const openLightbox = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const openCertificateModal = (certificate) => {
    setSelectedCertificate(certificate);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedProject(null);
    setSelectedCertificate(null);
    document.body.style.overflow = 'auto';
  };

  // ESC key and click outside to close
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && (selectedProject || selectedCertificate)) {
        closeLightbox();
      }
    };

    const handleClickOutside = (event) => {
      if ((selectedProject || selectedCertificate) && event.target.classList.contains('bg-black/95')) {
        closeLightbox();
      }
    };

    if (selectedProject || selectedCertificate) {
      document.addEventListener('keydown', handleEscKey);
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [selectedProject, selectedCertificate]);

  useEffect(() => {
    // Check if elements exist before animating
    const elements = [];
    
    // Hero animation
    if (heroRef.current) {
      gsap.fromTo(heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
      elements.push(heroRef.current);
    }

    // About section animation - WITH NULL CHECK
    if (aboutRef.current) {
      gsap.fromTo(aboutRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
      elements.push(aboutRef.current);
    }

    // Skills animation - WITH NULL CHECK AND PROPER SELECTOR
    if (skillsRef.current) {
      const skillItems = skillsRef.current.querySelectorAll('.skill-item');
      if (skillItems.length > 0) {
        gsap.fromTo(skillItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
              trigger: skillsRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
        elements.push(...Array.from(skillItems));
      }
    }

    // Certificates animation - WITH NULL CHECK
    if (certificatesRef.current) {
      const certificateItems = certificatesRef.current.querySelectorAll('.certificate-item');
      if (certificateItems.length > 0) {
        gsap.fromTo(certificateItems,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: certificatesRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
        elements.push(...Array.from(certificateItems));
      }
    }

    // Projects animation - WITH NULL CHECK
    const projectElements = projectsRef.current.filter(Boolean); // Filter out null/undefined
    if (projectElements.length > 0) {
      gsap.fromTo(projectElements,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.projects-section',
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
      elements.push(...projectElements);
    }

    // Cleanup function to kill all animations
    return () => {
      elements.forEach(element => {
        if (element && element._gsap) {
          gsap.killTweensOf(element);
        }
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []); // Empty dependency array - runs once on mount

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 bg-linear-to-br from-gray-900 to-black">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={photographer.coverImage}
            alt="Cover"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Profile Image */}
            <div className="lg:col-span-4 flex justify-start relative">
              <div className="relative group w-full max-w-md lg:max-w-full">
                <div className="
                    relative 
                    w-full 
                    h-[480px] sm:h-[520px] lg:h-[620px]
                    rounded-[3rem] 
                    overflow-hidden
                    bg-linear-to-br from-blue-600 via-orange-500/10 to-transparent
                    shadow-2xl shadow-yellow-400/10 
                    p-1 
                    backdrop-blur-sm
                  ">
                  <div className="
                      absolute inset-0 
                      rounded-[3rem] 
                      border-2 border-yellow-400/30 
                      animate-pulse 
                      group-hover:border-yellow-400/60 
                      transition-all duration-500
                    ">
                    <div className="
                        absolute inset-0 rounded-[3rem] 
                        bg-linear-to-br from-yellow-400/10 via-transparent to-orange-500/5 
                        blur-sm
                      "></div>
                  </div>
                  <img
                    src={photographer.profileImage}
                    alt={photographer.name}
                    className="
                      w-full 
                      h-full 
                      object-cover 
                      rounded-[2.8rem]
                      transform 
                      group-hover:scale-105 
                      transition-transform duration-700 ease-out
                    "
                  />
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="lg:col-span-8 text-center lg:text-left space-y-6 md:space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-black/40 backdrop-blur-sm 
                           rounded-full px-4 py-2 border border-yellow-400/20">
                <div className="w-2 h-2 rounded-full bg-linear-to-r from-yellow-400 to-orange-500 
                             animate-pulse"></div>
                <span className="text-xs font-medium tracking-widest uppercase text-yellow-400">
                  Professional Photographer
                </span>
              </div>
              
              {/* Name with Gradient */}
              <div className="relative">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                  <span className="bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 
                               bg-clip-text text-transparent animate-gradient bg-size-[200%_auto]">
                    {photographer.name.split(' ').map((word, i) => (
                      <span key={i} className="inline-block">
                        {word}
                        {i < photographer.name.split(' ').length - 1 && ' '}
                      </span>
                    ))}
                  </span>
                </h1>
                
                {/* Title */}
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mt-4 font-light 
                           tracking-wide max-w-2xl">
                  {photographer.title}
                </p>
              </div>
              
              {/* Bio */}
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-linear-to-b 
                             from-yellow-400 to-orange-500 rounded-full opacity-50"></div>
                <p className="text-base sm:text-lg text-gray-400 leading-relaxed pl-6 
                           max-w-2xl font-light">
                  {photographer.bio}
                </p>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                {[
                  { label: 'Projects', value: '500+', icon: '📸' },
                  { label: 'Clients', value: '150+', icon: '👥' },
                  { label: 'Experience', value: '8+ Years', icon: '⭐' },
                  { label: 'Awards', value: '25+', icon: '🏆' }
                ].map((stat, index) => (
                  <div key={index} 
                     className="bg-black/30 backdrop-blur-sm rounded-xl p-4 border border-yellow-400/10 
                             hover:border-yellow-400/30 transition-all duration-300 group/stat">
                    <div className="flex items-center space-x-3">
                      <div className="text-xl group-hover/stat:scale-110 transition-transform duration-300">
                        {stat.icon}
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Contact Button */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <NavLink 
                  to="/booknow"
                  className="group relative overflow-hidden rounded-full bg-linear-to-r 
                           from-yellow-400 to-orange-500 px-8 py-4 font-bold text-black 
                           hover:shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300
                           transform hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Book Session</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                               transition-opacity duration-300 rounded-full"></div>
                </NavLink>
                
                <button className="group flex items-center space-x-2 text-gray-400 
                                hover:text-white transition-colors duration-300">
                  <span className="text-sm font-medium">View Full Portfolio</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">↗</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-yellow-400/5 
                        to-orange-500/5 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-tr from-orange-500/5 
                        to-pink-500/5 rounded-full blur-3xl -z-10"></div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education - UPDATED */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-yellow-400">Education & Certifications</h2>
              <div className="space-y-6">
                {photographer.education.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full mt-2 shrink-0"></div>
                    <p className="text-gray-300 text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements - UPDATED */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-yellow-400">Achievements & Awards</h2>
              <div className="space-y-6">
                {photographer.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <span className="text-2xl">🏆</span>
                    <p className="text-gray-300 text-lg">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Certificates Section */}
      <section ref={certificatesRef} className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <Award className="w-8 h-8 text-yellow-400" />
              <h2 className="text-4xl md:text-5xl font-bold">Certifications</h2>
            </div>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              Recognized certifications from prestigious institutions in photography and design
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {certificates.map((certificate, index) => (
              <div
                key={certificate.id}
                className="certificate-item group relative bg-gray-800 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-400/10"
                onClick={() => openCertificateModal(certificate)}
              >
                {/* Certificate Preview */}
                <div className="relative aspect-4/3 overflow-hidden bg-gray-900">
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6">
                    <div className="text-center">
                      <Award className="w-12 h-12 text-yellow-400 mb-4 mx-auto" />
                      <p className="text-white text-lg font-semibold">View Certificate</p>
                      <p className="text-gray-300 text-sm">Click to view details</p>
                    </div>
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-white">{certificate.title}</h3>
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-400/20 text-yellow-400 rounded-full text-sm">
                      <Award className="w-4 h-4" />
                      Certified
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <School className="w-4 h-4" />
                      <span className="text-sm">{certificate.issuer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{certificate.date} • {certificate.duration}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm line-clamp-2">{certificate.description}</p>
                  
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 text-sm font-medium">
                      Click to View Full Certificate
                    </button>
                  </div>
                </div>

                {/* Corner Decoration */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-400 transform rotate-45 translate-x-8 -translate-y-8"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Accreditation Badges */}
          <div className="mt-16 pt-12 border-t border-gray-800">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-300">Accredited By</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center p-4 bg-gray-800 rounded-xl">
                <div className="text-yellow-400 font-bold text-lg mb-2">NAAC</div>
                <div className="text-sm text-gray-400">Grade "A+" Accredited</div>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-xl">
                <div className="text-yellow-400 font-bold text-lg mb-2">UGC</div>
                <div className="text-sm text-gray-400">Category-1 University</div>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-xl">
                <div className="text-yellow-400 font-bold text-lg mb-2">Symbiosis</div>
                <div className="text-sm text-gray-400">Deemed University</div>
              </div>
              <div className="text-center p-4 bg-gray-800 rounded-xl">
                <div className="text-yellow-400 font-bold text-lg mb-2">Adobe</div>
                <div className="text-sm text-gray-400">Certified Professional</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Skills & Expertise</h2>
          
          {/* Photography Skills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {skills.map((skillCategory, index) => (
              <div key={index} className="skill-item bg-gray-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-yellow-400 mb-4">{skillCategory.category}</h3>
                <ul className="space-y-2">
                  {skillCategory.items.map((skill, skillIndex) => (
                    <li key={skillIndex} className="flex items-center text-gray-300">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Equipment */}
          <div className="skill-item bg-gray-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-yellow-400 mb-6 text-center">Professional Equipment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {equipment.map((category, index) => (
                <div key={index} className="text-center">
                  <h4 className="text-lg font-semibold text-white mb-3">{category.category}</h4>
                  <div className="space-y-2">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="text-gray-300 text-sm bg-gray-700 rounded-lg py-2">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Projects Section */}
      <section className="projects-section py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">My Work</h2>
          <p className="text-gray-400 text-center text-xl mb-12 max-w-2xl mx-auto">
            A selection of my favorite projects that showcase my style and expertise
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['all', 'wedding', 'portrait', 'commercial'].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-linear-to-r from-yellow-400 to-orange-500 text-black'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects
              .filter(project => activeFilter === 'all' || project.category === activeFilter)
              .map((project, index) => (
                <div
                  key={project.id}
                  ref={el => projectsRef.current[index] = el}
                  onClick={() => openLightbox(project)}
                  className="group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 hover:scale-[1.02]"
                >
                  {project.featured && (
                    <div className="absolute top-6 left-6 z-10 bg-linear-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      Featured
                    </div>
                  )}
                  
                  {/* Main Image */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Project Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-block px-4 py-1 bg-black/60 backdrop-blur-sm text-yellow-400 text-sm font-semibold rounded-full mb-3">
                        {project.category.toUpperCase()}
                      </span>
                      <h3 className="text-white text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-300 text-sm">{project.description}</p>
                      
                      {/* Image Count */}
                      <div className="flex items-center mt-4">
                        <div className="flex -space-x-2">
                          {project.images.slice(0, 3).map((img, idx) => (
                            <div key={idx} className="w-8 h-8 rounded-full border-2 border-black overflow-hidden">
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
                    
                    {/* Hover Overlay */}
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

      {/* Philosophy Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="bg-linear-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 md:p-12 text-black text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">My Photography Philosophy</h2>
            <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto">
              "I believe every photograph should tell a story and evoke emotion. My approach combines technical expertise with artistic vision to create images that are not just seen, but felt. Whether it's a wedding, portrait, or commercial project, I strive to capture authentic moments that will be cherished for generations."
            </p>
            <div className="text-right">
              <p className="text-lg font-semibold">- {photographer.name}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Let's Create Together</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Ready to capture your special moments? I'd love to hear about your project and discuss how we can bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NavLink to="/booknow">
              <button className="bg-linear-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-yellow-400/30 transition-all duration-300 text-lg transform hover:-translate-y-1">
                Book a Session
              </button>
            </NavLink>
            <button className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 hover:text-black transition-all duration-300 text-lg">
              Download Portfolio PDF
            </button>
          </div>
        </div>
      </section>

      {/* Project Lightbox Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4">
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

          {/* Close Button at Bottom */}
          <button
            onClick={closeLightbox}
            className="mt-8 px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full font-semibold transition-colors duration-300"
          >
            Close Gallery
          </button>
        </div>
      )}

      {/* Certificate Detail Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 overflow-y-auto">
          <button
            onClick={closeLightbox}
            className="fixed top-8 right-8 z-50 bg-red-600 hover:bg-red-700 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold transition-colors duration-300 shadow-lg"
          >
            ✕
          </button>

          <div className="w-full max-w-6xl mt-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <Award className="w-10 h-10 text-yellow-400" />
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  {selectedCertificate.title}
                </h3>
              </div>
              <p className="text-gray-300 text-lg mb-2">{selectedCertificate.issuer}</p>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <span className="px-4 py-2 bg-yellow-400/20 text-yellow-400 rounded-full text-sm">
                  {selectedCertificate.date}
                </span>
                <span className="px-4 py-2 bg-blue-400/20 text-blue-400 rounded-full text-sm">
                  {selectedCertificate.duration}
                </span>
              </div>
            </div>

            {/* Certificate Image */}
            <div className="bg-gray-900 rounded-2xl p-6 mb-8 shadow-2xl">
              <div className="aspect-4/3 flex items-center justify-center bg-white rounded-xl overflow-hidden">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>

            {/* Certificate Details */}
            <div className="bg-gray-800 rounded-2xl p-8 mb-8">
              <h4 className="text-2xl font-bold text-yellow-400 mb-6">Certificate Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm text-gray-400 uppercase tracking-wider mb-1">Course</h5>
                    <p className="text-lg text-white">{selectedCertificate.details.course}</p>
                  </div>
                  <div>
                    <h5 className="text-sm text-gray-400 uppercase tracking-wider mb-1">Duration</h5>
                    <p className="text-lg text-white">{selectedCertificate.details.period}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm text-gray-400 uppercase tracking-wider mb-1">Accreditation</h5>
                    <p className="text-lg text-white">{selectedCertificate.details.accreditation}</p>
                  </div>
                  <div>
                    <h5 className="text-sm text-gray-400 uppercase tracking-wider mb-1">Issued By</h5>
                    <p className="text-lg text-white">{selectedCertificate.details.issuer}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = selectedCertificate.image;
                  link.download = `${selectedCertificate.title.replace(/\s+/g, '_')}_Certificate.jpg`;
                  link.click();
                }}
                className="px-8 py-3 bg-linear-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-full hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300"
              >
                Download Certificate
              </button>
              <button
                onClick={closeLightbox}
                className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-full transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Owner3DPortfolio;