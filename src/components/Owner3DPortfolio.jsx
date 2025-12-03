// pages/Portfolio.js
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavLink } from 'react-router-dom';
import PImage from '../assets/images/PImage.jpg';

gsap.registerPlugin(ScrollTrigger);

const Owner3DPortfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef([]);

  // Photographer Data
  const photographer = {
    name: "Guru\u00A0 offical\u00A0Studio",
    title: "Professional Photographer & Visual Storyteller",
    location: "Parli City",
    email: "guruphotofilms@gmail.com",
    phone: "+91 9651791010",
    experience: "8+ Years",
    bio: "I'm a passionate photographer with over 8 years of experience capturing life's most precious moments. My journey began with a simple camera and a dream to tell stories through visuals. Today, I specialize in wedding, portrait, and commercial photography, bringing creativity and technical excellence to every project.",
    profileImage: PImage ,
    coverImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    education: [
      "Bachelor of Fine Arts in Photography - New York University",
      "Certified Professional Photographer - PPA",
      "Advanced Lighting Techniques Masterclass"
    ],
    achievements: [
      "International Photography Awards 2023 - Winner",
      "Best Wedding Photographer 2022 - NYC Awards",
      "Featured in Photography Magazine",
      "500+ Happy Clients Served"
    ]
  };

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

  // Portfolio Projects
  const portfolioProjects = [
    {
      id: 1,
      title: "Sarah & James Wedding",
      category: "wedding",
      description: "A beautiful outdoor wedding ceremony captured with cinematic elegance",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 2,
      title: "Corporate Headshots",
      category: "portrait",
      description: "Professional headshots for TechStart Inc's executive team",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false
    },
    {
      id: 3,
      title: "Luxury Watch Campaign",
      category: "commercial",
      description: "Product photography for ChronoLux Watches",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      id: 4,
      title: "Family Portraits",
      category: "portrait",
      description: "Lifestyle family portraits in Central Park",
      image: "https://images.unsplash.com/photo-1682687221363-72518513620e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: false
    }
  ];

  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    // About section animation
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

    // Skills animation
    gsap.fromTo(skillsRef.current?.querySelectorAll('.skill-item'),
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

    // Projects animation
    gsap.fromTo(projectsRef.current,
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
  }, []);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

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
    {/* Profile Image - Modern Design */}
  <div className="lg:col-span-4 flex justify-start relative">
  <div className="relative group w-full max-w-md lg:max-w-full">

    {/* Big Full-Size Image Container */}
    <div className="
        relative 
        w-full 
        h-[480px] sm:h-[520px] lg:h-[620px]   /* FULL SIZE HEIGHT */
        rounded-[3rem] 
        overflow-hidden
        bg-linear-to-br from-blue-600 via-orange-500/10 to-transparent
        shadow-2xl shadow-yellow-400/10 
        p-1 
        backdrop-blur-sm
      ">

      {/* Animated Border */}
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

      {/* Profile Image */}
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


    {/* Profile Info - Modern Typography */}
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
            {/* Education */}
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

            {/* Achievements */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioProjects.map((project, index) => (
              <div
                key={project.id}
                ref={el => projectsRef.current[index] = el}
                className="group relative bg-gray-700 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-500 cursor-pointer"
                onClick={() => openProjectModal(project)}
              >
                {project.featured && (
                  <div className="absolute top-4 left-4 z-10 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                )}
                
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl mb-2">👁️</div>
                    <div className="text-white font-semibold">View Project</div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm">{project.description}</p>
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
            <button className="bg-yellow-400 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 transition-colors text-lg">
              Book a Session
            </button>
            </NavLink>
            <button className="border-2 border-yellow-400 text-yellow-400 px-8 py-4 rounded-full font-semibold hover:bg-yellow-400 hover:text-black transition-colors text-lg">
              Download Portfolio PDF
            </button>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-2xl max-w-2xl w-full">
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <button
                onClick={closeProjectModal}
                className="absolute top-4 right-4 bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
              <p className="text-gray-300 mb-4">{selectedProject.description}</p>
              <button className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                Book Similar Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Owner3DPortfolio;
