// pages/Services.js
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavLink } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    // Services animation
    gsap.fromTo(servicesRef.current.querySelectorAll('.service-card'),
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Process animation
    gsap.fromTo(processRef.current.querySelectorAll('.process-step'),
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.3,
        scrollTrigger: {
          trigger: processRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // CTA animation
    gsap.fromTo(ctaRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const services = [
    {
      icon: "📸",
      title: "Portrait Photography",
      description: "Professional portrait sessions that capture personality and emotion in stunning detail.",
      features: ["Individual & Family Portraits", "Professional Headshots", "Maternity & Newborn", "Senior Portraits"],
      startingPrice: "$299",
      image: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: "💒",
      title: "Wedding Photography",
      description: "Capture your special day with beautiful, timeless wedding photography that tells your unique story.",
      features: ["Full Day Coverage", "Engagement Sessions", "Album Design", "Digital Gallery"],
      startingPrice: "$1,999",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      featured: true
    },
    {
      icon: "🏢",
      title: "Commercial Photography",
      description: "Professional business photography for brands, products, and corporate needs.",
      features: ["Product Photography", "Corporate Headshots", "Architecture", "Brand Storytelling"],
      startingPrice: "$499",
      image: "https://images.unsplash.com/photo-1464822759844-d62ea2ef67f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: "🎥",
      title: "Videography Services",
      description: "Cinematic video production for weddings, commercials, and special events.",
      features: ["4K Video Production", "Drone Footage", "Color Grading", "Professional Editing"],
      startingPrice: "$899",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: "🎬",
      title: "Photo & Video Editing",
      description: "Professional editing services to enhance and transform your photos and videos.",
      features: ["Color Correction", "Retouching", "Video Editing", "Special Effects"],
      startingPrice: "$199",
      image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: "🚀",
      title: "Creative Consultation",
      description: "Strategic planning and creative direction for your photography and video projects.",
      features: ["Creative Direction", "Project Planning", "Style Development", "Brand Strategy"],
      startingPrice: "$150",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Consultation",
      description: "We discuss your vision, requirements, and create a customized plan for your project.",
      icon: "💬"
    },
    {
      step: "02",
      title: "Planning",
      description: "Detailed planning including locations, timing, equipment, and creative direction.",
      icon: "📋"
    },
    {
      step: "03",
      title: "Production",
      description: "Professional execution of the shoot with attention to detail and creative excellence.",
      icon: "🎯"
    },
    {
      step: "04",
      title: "Delivery",
      description: "Careful editing and delivery of final products that exceed your expectations.",
      icon: "🎁"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="py-20 bg-linear-to-br from-gray-900 to-black">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Professional photography and videography services tailored to capture your most important moments 
            with creativity, technical excellence, and artistic vision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NavLink to="/booknow">
            <button className="bg-yellow-400 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 transition-colors text-lg">
              Book a Service
            </button>
            </NavLink>
            <NavLink to="/portfolio">
            <button className="border-2 border-gray-600 px-8 py-4 rounded-full font-semibold hover:border-yellow-400 hover:text-yellow-400 transition-colors text-lg">
              View Portfolio
            </button>
            </NavLink>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What We Offer</h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Comprehensive photography and videography services for every occasion and need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`service-card bg-gray-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group ${
                  service.featured ? 'ring-2 ring-yellow-400' : ''
                }`}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {service.featured && (
                    <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full font-semibold">
                    From {service.startingPrice}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold">{service.title}</h3>
                  </div>
                  
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
                      Book Now
                    </button>
                    <button className="bg-gray-700 text-gray-300 px-4 py-3 rounded-lg hover:bg-gray-600 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Process</h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              A seamless experience from concept to delivery, ensuring your vision comes to life perfectly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-black text-yellow-400 rounded-full flex items-center justify-center text-sm font-bold border-2 border-yellow-400">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Choose Guru Studio?</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Professional Expertise",
                    description: "Over 8 years of experience in professional photography and videography"
                  },
                  {
                    title: "State-of-the-Art Equipment",
                    description: "Latest camera gear and editing technology for superior results"
                  },
                  {
                    title: "Creative Vision",
                    description: "Unique artistic perspective that sets your content apart"
                  },
                  {
                    title: "Client-Focused Approach",
                    description: "Personalized service tailored to your specific needs and vision"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <span className="text-black text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-linear-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 text-black">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-lg mb-6">
                Contact us today for a free consultation and let's discuss how we can bring your vision to life.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span>📞</span>
                  <span>+91 9651791010</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span>📧</span>
                  <span>guruphotofilms@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span>🕒</span>
                  <span>Available 7 days a week</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-20 bg-linear-to-r from-yellow-400 to-orange-500 text-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Let's work together to capture your unique story through our lens. Get in touch to discuss your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <NavLink to="/booknow">
            <button className="bg-black text-yellow-400 px-12 py-4 rounded-full text-lg font-semibold hover:bg-gray-900 transition-colors">
              Book Your Session
            </button>
            </NavLink>
            <button className="border-2 border-black px-12 py-4 rounded-full text-lg font-semibold hover:bg-black hover:text-yellow-400 transition-colors">
              Get Free Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;