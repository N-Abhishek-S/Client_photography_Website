// pages/Contact.js
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaInstagram, FaYoutube, FaFacebook, FaXTwitter, FaLinkedin } from "react-icons/fa6";


gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    // Form animation
    gsap.fromTo(formRef.current.querySelectorAll('.form-element'),
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Info animation
    gsap.fromTo(infoRef.current.querySelectorAll('.info-item'),
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email Us',
      details: 'guruphotofilms@gmail.com',
      subtitle: 'We\'ll reply within 24 hours'
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: '+91 9651791010',
      subtitle: 'Mon-Fri from 9am to 6pm'
    },
    {
      icon: '📍',
      title: 'Visit Studio',
      details: 'Guru Photofilms, Parmar Complex, Near Bus Stop, Parli Vaijnath, Dist. Beed, Pin Code-431515',
      subtitle: 'Book an appointment first'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      details: 'Available 24/7',
      subtitle: 'Get instant answers'
    }
  ];


const socialLinks = [
  { name: 'Instagram', icon: <FaInstagram color="#E4405F" />, url: 'https://www.instagram.com/guru_photofilms/' },
  { name: 'YouTube', icon: <FaYoutube color="#FF0000" />, url: '#' },
  { name: 'Facebook', icon: <FaFacebook color="#1877F2" />, url: 'https://www.facebook.com/guruphotofilms' },
  { name: 'Twitter', icon: <FaXTwitter color="#000000" />, url: '#' },
  { name: 'LinkedIn', icon: <FaLinkedin color="#0A66C2" />, url: '#' }
];

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="py-20 bg-linear-to-br from-gray-900 to-black">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Ready to create something amazing together? Let's discuss your project and bring your vision to life.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div ref={formRef} className="bg-gray-800 rounded-2xl p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-2">Send us a Message</h2>
              <p className="text-gray-400 mb-8">Fill out the form below and we'll get back to you ASAP</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="form-element grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="form-element">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div className="form-element">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="form-element w-full bg-linear-to-r from-yellow-400 to-orange-500 text-black py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div ref={infoRef}>
              <h2 className="text-3xl font-bold mb-8">Let's Connect</h2>
              
              {/* Contact Info Cards */}
              <div className="space-y-6 mb-12">
                {contactInfo.map((item, index) => (
                  <div key={index} className="info-item bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors duration-300 group">
                    <div className="flex items-start space-x-4">
                      <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                        <p className="text-yellow-400 text-lg mb-1">{item.details}</p>
                        <p className="text-gray-400 text-sm">{item.subtitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="info-item">
                <h3 className="text-2xl font-bold mb-6">Follow Our Journey</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={social.name}
                      href={social.url}
                      className="flex items-center space-x-3 bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition-colors duration-300 group"
                    >
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {social.icon}
                      </span>
                      <div>
                        <div className="font-semibold">{social.name}</div>
                        <div className="text-gray-400 text-sm">{social.handle}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Studio Hours */}
              <div className="info-item mt-12 bg-linear-to-r from-yellow-400 to-orange-500 text-black rounded-2xl p-6">
                <h3 className="text-2xl font-bold mb-4">Studio Hours</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-semibold">By Appointment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Visit Our Studio</h2>
          <div className="bg-gray-700 rounded-2xl p-8 text-center">
            <div className="h-96 bg-linear-to-br from-gray-600 to-gray-800 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📍</div>
                <h3 className="text-2xl font-bold mb-2">Guru Photo Film Studio</h3>
                <p className="text-gray-300">Guru Photofilms, Parmar Complex, Near Bus Stop, Parli Vaijnath, Dist.</p>
                <p className="text-gray-400"> Beed, Pin Code-431515</p>
              </div>
            </div>
            <div className="mt-6 text-gray-400">
              <p>Free parking available • Wheelchair accessible • Public transport nearby</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;