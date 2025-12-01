// pages/About.js
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const teamRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    // Story animation
    gsap.fromTo(storyRef.current.querySelectorAll('.story-element'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Team animation
    gsap.fromTo(teamRef.current.querySelectorAll('.team-member'),
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Stats animation
    gsap.fromTo(statsRef.current.querySelectorAll('.stat-item'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Lead Photographer & Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "With over 12 years of experience, Alex specializes in portrait and commercial photography.",
      specialties: ["Portrait", "Commercial", "Lighting"]
    },
    {
      name: "Sarah Chen",
      role: "Videography Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Sarah brings stories to life through cinematic videography and creative direction.",
      specialties: ["Cinematography", "Storytelling", "Editing"]
    },
    {
      name: "Mike Rodriguez",
      role: "Creative Editor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Mike transforms raw footage and photos into stunning visual masterpieces.",
      specialties: ["Color Grading", "Retouching", "Visual Effects"]
    },
    {
      name: "Emily Parker",
      role: "Studio Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Emily ensures every client experience is seamless and unforgettable.",
      specialties: ["Client Relations", "Project Management", "Production"]
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "8+", label: "Years Experience" },
    { number: "150+", label: "Happy Clients" },
    { number: "25+", label: "Industry Awards" }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Excellence",
      description: "We strive for perfection in every shot, ensuring the highest quality results."
    },
    {
      icon: "💡",
      title: "Creativity",
      description: "Pushing boundaries and exploring new perspectives to tell unique stories."
    },
    {
      icon: "🤝",
      title: "Collaboration",
      description: "Working closely with clients to bring their vision to life together."
    },
    {
      icon: "⚡",
      title: "Innovation",
      description: "Embracing the latest technology and techniques to stay ahead."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="py-20 bg-linear-to-br from-gray-900 to-black">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Capturing life's most precious moments with passion, creativity, and technical excellence since 2016.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                <div className="text-gray-300 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section ref={storyRef} className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="story-element">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">From Passion to Profession</h2>
              <div className="space-y-4 text-gray-300 text-lg">
                <p>
                  Founded in 2016 by Alex Johnson, Guru Photo Film started as a small studio with a big vision: 
                  to transform ordinary moments into extraordinary memories through the lens of creativity and technical expertise.
                </p>
                <p>
                  What began as a one-person operation has grown into a full-service photography and videography studio, 
                  serving clients across the nation with a team of passionate professionals who share the same commitment to excellence.
                </p>
                <p>
                  Our journey has been shaped by countless stories, from intimate weddings to large corporate events, 
                  each teaching us something new about the art of visual storytelling.
                </p>
              </div>
            </div>
            <div className="story-element">
              <div className="bg-linear-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 text-black">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-lg mb-6">
                  To capture authentic moments that tell compelling stories, using our technical expertise 
                  and creative vision to exceed expectations and create lasting memories.
                </p>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-lg">
                  To be the most trusted creative partner for individuals and businesses seeking exceptional 
                  photography and videography services that inspire and endure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Meet Our Team</h2>
          <p className="text-gray-400 text-center text-xl mb-16 max-w-2xl mx-auto">
            Passionate professionals dedicated to bringing your vision to life
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member bg-gray-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-yellow-400 mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, specIndex) => (
                      <span 
                        key={specIndex}
                        className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-yellow-400 to-orange-500 text-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Work With Us?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Let's create something amazing together. Get in touch to discuss your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/contact" 
              className="bg-black text-yellow-400 px-12 py-4 rounded-full text-lg font-semibold hover:bg-gray-900 transition-colors"
            >
              Start Your Project
            </a>
            <a 
              href="/portfolio" 
              className="border-2 border-black px-12 py-4 rounded-full text-lg font-semibold hover:bg-black hover:text-yellow-400 transition-colors"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;