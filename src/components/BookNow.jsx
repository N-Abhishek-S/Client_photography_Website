// pages/BookNow.js
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BookNow = () => {
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    serviceType: '',
    date: '',
    timeSlot: '',
    duration: '',
    location: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventType: '',
    guestCount: '',
    specialRequests: ''
  });

  const heroRef = useRef(null);
  const formRef = useRef(null);
  const servicesRef = useRef(null);
  const calendarRef = useRef(null);

  // Available services
  const services = [
    {
      id: 'wedding',
      name: 'Wedding Photography',
      description: 'Full day coverage, engagement session, album design',
      duration: '8-12 hours',
      price: '$1,999 - $3,999',
      popular: true,
      icon: '💒'
    },
    {
      id: 'portrait',
      name: 'Portrait Session',
      description: 'Professional portraits for individuals, families, or couples',
      duration: '1-2 hours',
      price: '$299 - $599',
      popular: false,
      icon: '📸'
    },
    {
      id: 'commercial',
      name: 'Commercial Photography',
      description: 'Product, brand, and business photography',
      duration: '2-4 hours',
      price: '$499 - $1,499',
      popular: false,
      icon: '🏢'
    },
    {
      id: 'event',
      name: 'Event Coverage',
      description: 'Corporate events, parties, and special occasions',
      duration: '3-6 hours',
      price: '$699 - $1,999',
      popular: false,
      icon: '🎉'
    },
    {
      id: 'video',
      name: 'Videography',
      description: 'Cinematic video production and editing',
      duration: 'Custom',
      price: '$899 - $2,999',
      popular: true,
      icon: '🎥'
    },
    {
      id: 'consultation',
      name: 'Consultation',
      description: 'One-on-one creative planning session',
      duration: '1 hour',
      price: '$99',
      popular: false,
      icon: '💬'
    }
  ];

  // Available time slots
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  // Available dates (next 30 days)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0) { // Exclude Sundays
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  const availableDates = generateAvailableDates();

  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    // Form animation
    gsap.fromTo(formRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Services animation
    gsap.fromTo(servicesRef.current?.querySelectorAll('.service-card'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceSelect = (serviceId) => {
    const selectedService = services.find(s => s.id === serviceId);
    setBookingData(prev => ({
      ...prev,
      serviceType: serviceId,
      duration: selectedService.duration
    }));
    setStep(2);
  };

  const handleDateSelect = (date) => {
    setBookingData(prev => ({
      ...prev,
      date: date
    }));
  };

  const handleTimeSelect = (time) => {
    setBookingData(prev => ({
      ...prev,
      timeSlot: time
    }));
    setStep(3);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, this would send data to backend
    console.log('Booking submitted:', bookingData);
    alert('Booking request submitted successfully! We will contact you within 24 hours to confirm.');
    
    // Reset form
    setBookingData({
      serviceType: '',
      date: '',
      timeSlot: '',
      duration: '',
      location: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      eventType: '',
      guestCount: '',
      specialRequests: ''
    });
    setStep(1);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-4">Select Your Service</h3>
            <p className="text-gray-400 mb-6">Choose the photography service that best fits your needs</p>
            
            <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map(service => (
                <div
                  key={service.id}
                  className={`service-card bg-gray-800 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 group ${
                    bookingData.serviceType === service.id ? 'ring-2 ring-yellow-400' : ''
                  } ${service.popular ? 'border border-yellow-400/50' : ''}`}
                  onClick={() => handleServiceSelect(service.id)}
                >
                  {service.popular && (
                    <div className="inline-block bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-semibold mb-4">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{service.icon}</span>
                      <h4 className="text-lg font-bold text-white">{service.name}</h4>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-gray-300 text-sm">Duration</div>
                      <div className="text-white font-medium">{service.duration}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-300 text-sm">Starting from</div>
                      <div className="text-yellow-400 font-bold text-lg">{service.price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Select Date & Time</h3>
              <p className="text-gray-400">Choose your preferred date and time slot</p>
            </div>

            {/* Selected Service Summary */}
            {bookingData.serviceType && (
              <div className="bg-gray-800/50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">
                      {services.find(s => s.id === bookingData.serviceType)?.icon}
                    </span>
                    <div>
                      <div className="font-semibold text-white">
                        {services.find(s => s.id === bookingData.serviceType)?.name}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {bookingData.duration} session
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="text-yellow-400 hover:text-yellow-300 text-sm font-medium"
                  >
                    Change Service
                  </button>
                </div>
              </div>
            )}

            {/* Date Selection */}
            <div ref={calendarRef}>
              <h4 className="text-lg font-semibold text-white mb-4">Select Date</h4>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-8">
                {availableDates.slice(0, 10).map((date, index) => {
                  const dateObj = new Date(date);
                  const formattedDate = dateObj.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  });
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleDateSelect(date)}
                      className={`p-3 rounded-lg text-center transition-all duration-300 ${
                        bookingData.date === date
                          ? 'bg-yellow-400 text-black'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <div className="text-sm font-semibold">
                        {formattedDate.split(' ')[0]}
                      </div>
                      <div className="text-lg font-bold mt-1">
                        {formattedDate.split(' ')[2]}
                      </div>
                      <div className="text-xs opacity-75">
                        {formattedDate.split(' ')[1]}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Time Selection */}
              {bookingData.date && (
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Available Time Slots</h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {timeSlots.map((time, index) => (
                      <button
                        key={index}
                        onClick={() => handleTimeSelect(time)}
                        className={`p-4 rounded-lg text-center transition-all duration-300 ${
                          bookingData.timeSlot === time
                            ? 'bg-yellow-400 text-black'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <div className="font-semibold">{time}</div>
                        <div className="text-xs opacity-75 mt-1">Available</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Complete Your Booking</h3>
              <p className="text-gray-400">Fill in your details to finalize the booking</p>
            </div>

            {/* Booking Summary */}
            <div className="bg-gray-800/50 rounded-xl p-6 mb-6">
              <h4 className="text-lg font-semibold text-white mb-4">Booking Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Service:</span>
                  <span className="text-white font-medium">
                    {services.find(s => s.id === bookingData.serviceType)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-white font-medium">
                    {new Date(bookingData.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Time:</span>
                  <span className="text-white font-medium">{bookingData.timeSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white font-medium">{bookingData.duration}</span>
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Total:</span>
                    <span className="text-yellow-400 font-bold text-lg">
                      {services.find(s => s.id === bookingData.serviceType)?.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={bookingData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={bookingData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={bookingData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Event Type (if applicable)
                </label>
                <select
                  name="eventType"
                  value={bookingData.eventType}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                >
                  <option value="">Select event type</option>
                  <option value="wedding">Wedding</option>
                  <option value="engagement">Engagement</option>
                  <option value="birthday">Birthday</option>
                  <option value="corporate">Corporate Event</option>
                  <option value="family">Family Gathering</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Number of Guests (approx.)
                </label>
                <input
                  type="number"
                  name="guestCount"
                  value={bookingData.guestCount}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                  placeholder="e.g., 50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location / Venue
                </label>
                <input
                  type="text"
                  name="location"
                  value={bookingData.location}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                  placeholder="Where will the session take place?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Special Requests or Notes
                </label>
                <textarea
                  name="specialRequests"
                  value={bookingData.specialRequests}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
                  placeholder="Any specific requirements, themes, or special requests..."
                ></textarea>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400"
                />
                <label htmlFor="terms" className="text-sm text-gray-300">
                  I agree to the terms and conditions and understand that a 25% deposit is required to secure the booking.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-r from-yellow-400 to-orange-500 text-black py-4 rounded-lg font-semibold text-lg hover:shadow-2xl hover:shadow-yellow-400/25 transition-all duration-300 transform hover:scale-105"
              >
                Complete Booking Request
              </button>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="py-20 bg-linear-to-br from-gray-900 to-black">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Book Your Session
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Secure your photography session in just a few simple steps. Let's create something amazing together!
          </p>
        </div>
      </section>

      {/* Booking Process */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {/* Progress Steps */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex justify-between items-center mb-8">
              {['Choose Service', 'Pick Date & Time', 'Complete Booking'].map((label, index) => (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 ${
                    step > index + 1 
                      ? 'bg-green-500 text-white' 
                      : step === index + 1
                      ? 'bg-yellow-400 text-black'
                      : 'bg-gray-800 text-gray-400'
                  }`}>
                    {step > index + 1 ? '✓' : index + 1}
                  </div>
                  <div className={`text-sm font-medium ${
                    step >= index + 1 ? 'text-white' : 'text-gray-500'
                  }`}>
                    {label}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Progress Bar */}
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-linear-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Container */}
          <div ref={formRef} className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-700">
            {renderStepContent()}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "What's included in the photography package?",
                a: "All packages include professional photography, edited high-resolution images, online gallery, and print release. Additional services like albums, prints, and extra hours can be added."
              },
              {
                q: "How do I secure my booking?",
                a: "A 25% non-refundable deposit is required to secure your date and time. The remaining balance is due 7 days before your session."
              },
              {
                q: "What's your cancellation policy?",
                a: "Cancellations made more than 30 days in advance receive a full refund of the deposit. Cancellations within 30 days are subject to the deposit being retained."
              },
              {
                q: "How long until I receive my photos?",
                a: "Delivery times vary by package but typically range from 2-4 weeks for portraits and 4-8 weeks for weddings. Rush processing is available for an additional fee."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-900/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-linear-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 md:p-12 text-black text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Help Booking?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Our team is here to help you every step of the way. Contact us for personalized assistance.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black/10 rounded-xl p-6">
                <div className="text-2xl mb-3">📞</div>
                <h4 className="font-semibold mb-2">Call Us</h4>
                <p>+91 9651791010</p>
              </div>
              <div className="bg-black/10 rounded-xl p-6">
                <div className="text-2xl mb-3">📧</div>
                <h4 className="font-semibold mb-2">Email Us</h4>
                <p>guruphotofilms@gmail.com</p>
              </div>
              <div className="bg-black/10 rounded-xl p-6">
                <div className="text-2xl mb-3">💬</div>
                <h4 className="font-semibold mb-2">Live Chat</h4>
                <p>Available 9AM-6PM EST</p>
              </div>
            </div>
            <p className="text-black/70">
              Response time: We typically respond within 2-4 hours during business hours.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookNow;