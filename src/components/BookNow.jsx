// pages/BookNow.js
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BookNow = () => {
  const [step, setStep] = useState(1);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
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
      price: '₹49,999 - ₹99,999',
      popular: true,
      icon: '💒'
    },
    {
      id: 'portrait',
      name: 'Portrait Session',
      description: 'Professional portraits for individuals, families, or couples',
      duration: '1-2 hours',
      price: '₹2,999 - ₹5,999',
      popular: false,
      icon: '📸'
    },
    {
      id: 'commercial',
      name: 'Commercial Photography',
      description: 'Product, brand, and business photography',
      duration: '2-4 hours',
      price: '₹4,999 - ₹14,999',
      popular: false,
      icon: '🏢'
    },
    {
      id: 'event',
      name: 'Event Coverage',
      description: 'Corporate events, parties, and special occasions',
      duration: '3-6 hours',
      price: '₹6,999 - ₹19,999',
      popular: false,
      icon: '🎉'
    },
    {
      id: 'video',
      name: 'Videography',
      description: 'Cinematic video production and editing',
      duration: 'Custom',
      price: '₹8,999 - ₹29,999',
      popular: true,
      icon: '🎥'
    },
    {
      id: 'consultation',
      name: 'Consultation',
      description: 'One-on-one creative planning session',
      duration: '1 hour',
      price: '₹999',
      popular: false,
      icon: '💬'
    }
  ];

  // Available time slots
  const timeSlots = [
     '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
  ];

  // Generate dates for the next 60 days
  const generateAllDates = useCallback(() => {
    const allDates = [];
    const today = new Date();
    
    // Generate next 60 days
    for (let i = 1; i <= 60; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Exclude Sundays (0 = Sunday)
      if (date.getDay() !== 0) {
        allDates.push({
          date: date.toISOString().split('T')[0],
          dateObj: date,
          month: date.getMonth(),
          year: date.getFullYear(),
          day: date.getDate(),
          timestamp: date.getTime(),
          isPast: date.getTime() < today.getTime()
        });
      }
    }
    
    return allDates;
  }, []);

  // Group dates by month
  const groupDatesByMonth = useCallback(() => {
    const allDates = generateAllDates();
    const grouped = {};
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    allDates.forEach(dateInfo => {
      const monthYear = `${dateInfo.month}-${dateInfo.year}`;
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      grouped[monthYear].push(dateInfo);
    });
    
    const monthEntries = Object.entries(grouped).map(([monthYear, dates]) => {
      const [month, year] = monthYear.split('-').map(Number);
      const isCurrentMonth = month === currentMonth && year === currentYear;
      const monthEndDate = new Date(year, month + 1, 0);
      const isMonthEnded = today > monthEndDate;
      
      return {
        month,
        year,
        dates,
        monthName: new Date(year, month).toLocaleDateString('en-US', { month: 'long' }),
        monthEndDate,
        isCurrentMonth,
        isPast: isMonthEnded
      };
    });
    
    // Sort by date
    return monthEntries.sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    });
  }, [generateAllDates]);

  // Get current month index
  const getInitialMonthIndex = useCallback((months) => {
    const today = new Date();
    
    for (let i = 0; i < months.length; i++) {
      const month = months[i];
      // Find the first month that is not ended yet
      if (!month.isPast) {
        return i;
      }
    }
    
    return 0;
  }, []);

  const months = groupDatesByMonth();
  const currentMonthData = months[currentMonthIndex];

  // Initialize current month index
  useEffect(() => {
    if (months.length > 0) {
      const initialIndex = getInitialMonthIndex(months);
      if (currentMonthIndex !== initialIndex) {
        setCurrentMonthIndex(initialIndex);
      }
    }
  }, [months, currentMonthIndex, getInitialMonthIndex]);

  // Auto-advance to next month when current month ends
  useEffect(() => {
    if (step === 2 && currentMonthData && currentMonthData.isPast) {
      // Auto-advance to next month if current month is past
      const nextIndex = currentMonthIndex + 1;
      if (nextIndex < months.length) {
        const timer = setTimeout(() => {
          gsap.to(calendarRef.current, {
            opacity: 0.7,
            scale: 0.95,
            duration: 0.3,
            onComplete: () => {
              setCurrentMonthIndex(nextIndex);
              gsap.to(calendarRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: "power2.out"
              });
            }
          });
        }, 1500);
        
        return () => clearTimeout(timer);
      }
    }
  }, [step, currentMonthData, currentMonthIndex, months.length]);

  // Set up interval to check for month end
  useEffect(() => {
    let intervalId;
    
    if (step === 2) {
      intervalId = setInterval(() => {
        const today = new Date();
        const currentMonthData = months[currentMonthIndex];
        
        if (currentMonthData && today > currentMonthData.monthEndDate) {
          // Month has ended, advance to next month
          const nextIndex = currentMonthIndex + 1;
          if (nextIndex < months.length) {
            setCurrentMonthIndex(nextIndex);
          }
        }
      }, 60000); // Check every minute
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [step, currentMonthIndex, months]);

  // Animation effects
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
    if (servicesRef.current) {
      gsap.fromTo(servicesRef.current.querySelectorAll('.service-card'),
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
    }
  }, []);

  // Animate month change
  const animateMonthChange = (newIndex) => {
    gsap.to(calendarRef.current, {
      opacity: 0.7,
      scale: 0.95,
      duration: 0.3,
      onComplete: () => {
        setCurrentMonthIndex(newIndex);
        gsap.to(calendarRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      }
    });
  };

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

  const handleMonthChange = (direction) => {
    if (direction === 'prev' && currentMonthIndex > 0) {
      animateMonthChange(currentMonthIndex - 1);
    }
    if (direction === 'next' && currentMonthIndex < months.length - 1) {
      animateMonthChange(currentMonthIndex + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
            
            <div ref={servicesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <span className="text-3xl">{service.icon}</span>
                      <h4 className="text-lg font-bold text-white">{service.name}</h4>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{service.description}</p>
                  
                  <div className="flex justify-between items-center mt-6">
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
        if (!currentMonthData) return null;
        
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

            {/* Calendar with Month Navigation */}
            <div ref={calendarRef} className="bg-gray-800/30 rounded-2xl p-6">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => handleMonthChange('prev')}
                  disabled={currentMonthIndex === 0}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    currentMonthIndex === 0 
                      ? 'opacity-50 cursor-not-allowed text-gray-500' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Previous Month</span>
                </button>
                
                <div className="text-center">
                  <h4 className="text-xl font-bold text-white">
                    {currentMonthData.monthName} {currentMonthData.year}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {currentMonthData.isCurrentMonth ? (
                      <span className="text-green-400 flex items-center justify-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        Current Month • Auto-advance active
                      </span>
                    ) : currentMonthData.isPast ? (
                      <span className="text-yellow-400">Past Month</span>
                    ) : (
                      'Future Month'
                    )}
                  </p>
                </div>
                
                <button
                  onClick={() => handleMonthChange('next')}
                  disabled={currentMonthIndex === months.length - 1}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    currentMonthIndex === months.length - 1
                      ? 'opacity-50 cursor-not-allowed text-gray-500' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <span>Next Month</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Month Indicator */}
              <div className="flex justify-center gap-2 mb-6 flex-wrap">
                {months.map((month, index) => (
                  <button
                    key={index}
                    onClick={() => animateMonthChange(index)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 relative ${
                      currentMonthIndex === index
                        ? 'bg-yellow-400 text-black shadow-lg'
                        : month.isCurrentMonth
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {month.monthName.substring(0, 3)}
                    {month.isCurrentMonth && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Auto-advance Notice */}
              {currentMonthData.isCurrentMonth && (
                <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3 mb-6">
                  <div className="flex items-center justify-center space-x-2 text-sm text-blue-300">
                    <svg className="w-4 h-4 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    <span>Calendar will auto-advance when this month ends</span>
                  </div>
                </div>
              )}

              {/* Calendar Grid */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-white mb-4">Select Date</h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
                  {/* Day Headers */}
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <div key={day} className="text-center py-2">
                      <div className="text-sm font-semibold text-gray-400">{day}</div>
                    </div>
                  ))}
                  
                  {/* Empty cells for alignment */}
                  {Array.from({ length: new Date(currentMonthData.year, currentMonthData.month, 1).getDay() - 1 }).map((_, index) => (
                    <div key={`empty-${index}`} className="h-12"></div>
                  ))}
                  
                  {/* Date Cells */}
                  {currentMonthData.dates.map((dateInfo, index) => {
                    const isToday = dateInfo.date === new Date().toISOString().split('T')[0];
                    const isSelected = bookingData.date === dateInfo.date;
                    
                    return (
                      <button
                        key={index}
                        onClick={() => handleDateSelect(dateInfo.date)}
                        disabled={dateInfo.isPast}
                        className={`relative h-12 rounded-lg transition-all duration-300 group ${
                          isSelected
                            ? 'bg-linear-to-r from-yellow-400 to-orange-500 text-black shadow-lg'
                            : dateInfo.isPast
                            ? 'bg-gray-900 text-gray-600 cursor-not-allowed'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                        } ${isToday ? 'ring-2 ring-yellow-400' : ''}`}
                      >
                        <div className="flex flex-col items-center justify-center h-full">
                          <div className={`text-sm font-semibold ${isSelected ? 'text-black' : dateInfo.isPast ? 'text-gray-600' : ''}`}>
                            {dateInfo.day}
                          </div>
                          {isToday && !isSelected && !dateInfo.isPast && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
                          )}
                          {dateInfo.isPast && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-8 h-0.5 bg-gray-700 transform rotate-45"></div>
                            </div>
                          )}
                        </div>
                        
                        {/* Hover tooltip */}
                        {!dateInfo.isPast && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-10">
                            {dateInfo.dateObj.toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Date Selection */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-3">Quick Select</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'This Weekend', getDate: () => {
                      const today = new Date();
                      const day = today.getDay();
                      const daysToAdd = day === 6 ? 1 : 6 - day;
                      const date = new Date(today);
                      date.setDate(today.getDate() + daysToAdd);
                      return date.toISOString().split('T')[0];
                    }},
                    { label: 'Next Weekend', getDate: () => {
                      const today = new Date();
                      const day = today.getDay();
                      const daysToAdd = day === 6 ? 8 : 13 - day;
                      const date = new Date(today);
                      date.setDate(today.getDate() + daysToAdd);
                      return date.toISOString().split('T')[0];
                    }},
                    { label: 'Next Week', getDate: () => {
                      const date = new Date();
                      date.setDate(date.getDate() + 7);
                      return date.toISOString().split('T')[0];
                    }}
                  ].map((quickOption, index) => {
                    const quickDate = quickOption.getDate();
                    const isAvailable = generateAllDates().some(d => d.date === quickDate && !d.isPast);
                    
                    return (
                      <button
                        key={index}
                        onClick={() => isAvailable && handleDateSelect(quickDate)}
                        disabled={!isAvailable}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          isAvailable
                            ? 'bg-linear-to-r from-blue-500 to-purple-600 text-white hover:opacity-90'
                            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {quickOption.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              {bookingData.date && (
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4">Available Time Slots</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {timeSlots.map((time, index) => (
                      <button
                        key={index}
                        onClick={() => handleTimeSelect(time)}
                        className={`p-4 rounded-xl text-center transition-all duration-300 group ${
                          bookingData.timeSlot === time
                            ? 'bg-linear-to-r from-yellow-400 to-orange-500 text-black shadow-lg'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                        }`}
                      >
                        <div className="font-semibold text-lg">{time}</div>
                        <div className={`text-xs mt-1 ${
                          bookingData.timeSlot === time ? 'text-black/80' : 'text-gray-400'
                        }`}>
                          Available
                        </div>
                        {bookingData.timeSlot === time && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        const selectedService = services.find(s => s.id === bookingData.serviceType);
        
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
                    {selectedService?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-white font-medium">
                    {bookingData.date && new Date(bookingData.date).toLocaleDateString('en-US', {
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
                      {selectedService?.price}
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
                    placeholder="+91 12345 67890"
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
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 text-white pt-20">
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
        <div className="container mx-auto px-4 sm:px-6">
          {/* Progress Steps */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex justify-between items-center mb-8">
              {['Choose Service', 'Pick Date & Time', 'Complete Booking'].map((label, index) => (
                <div key={index} className="text-center flex-1 px-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 ${
                    step > index + 1 
                      ? 'bg-green-500 text-white' 
                      : step === index + 1
                      ? 'bg-linear-to-r from-yellow-400 to-orange-500 text-black'
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
          <div ref={formRef} className="max-w-6xl mx-auto bg-gray-800/30 backdrop-blur-sm rounded-3xl p-6 md:p-8 lg:p-12 border border-gray-700">
            {renderStepContent()}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-800/50">
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
              <div key={index} className="bg-gray-900/50 rounded-xl p-6 hover:bg-gray-900/70 transition-all duration-300">
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
              <div className="bg-black/10 rounded-xl p-6 hover:bg-black/20 transition-all duration-300">
                <div className="text-2xl mb-3">📞</div>
                <h4 className="font-semibold mb-2">Call Us</h4>
                <p className="font-medium">+91 9651791010</p>
              </div>
              <div className="bg-black/10 rounded-xl p-6 hover:bg-black/20 transition-all duration-300">
                <div className="text-2xl mb-3">📧</div>
                <h4 className="font-semibold mb-2">Email Us</h4>
                <p className="font-medium">guruphotofilms@gmail.com</p>
              </div>
              <div className="bg-black/10 rounded-xl p-6 hover:bg-black/20 transition-all duration-300">
                <div className="text-2xl mb-3">💬</div>
                <h4 className="font-semibold mb-2">Live Chat</h4>
                <p className="font-medium">Available 9AM-9PM IST</p>
              </div>
            </div>
            <p className="text-black/70 text-sm">
              Response time: We typically respond within 2-4 hours during business hours.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookNow;