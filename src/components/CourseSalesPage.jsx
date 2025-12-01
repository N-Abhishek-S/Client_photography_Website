// pages/Courses.js
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Courses = () => {
  const heroRef = useRef(null);
  const coursesRef = useRef(null);
  const pricingRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    // Courses animation
    gsap.fromTo(coursesRef.current.querySelectorAll('.course-card'),
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: coursesRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Pricing animation
    gsap.fromTo(pricingRef.current.querySelectorAll('.pricing-card'),
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: pricingRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'photography', name: 'Photography' },
    { id: 'editing', name: 'Editing' },
    { id: 'business', name: 'Business' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const courses = [
    {
      id: 1,
      title: "Mastering Portrait Photography",
      description: "Learn professional portrait techniques from lighting to posing and create stunning portraits.",
      duration: "8 hours",
      lessons: 24,
      level: "Intermediate",
      category: "photography",
      image: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$149",
      featured: true,
      instructor: "Alex Johnson",
      rating: 4.9,
      students: 1247
    },
    {
      id: 2,
      title: "Advanced Lightroom Editing",
      description: "Transform your photos with professional editing workflows and advanced techniques.",
      duration: "6 hours",
      lessons: 18,
      level: "All Levels",
      category: "editing",
      image: "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$129",
      featured: false,
      instructor: "Mike Rodriguez",
      rating: 4.8,
      students: 892
    },
    {
      id: 3,
      title: "Commercial Photography Pro",
      description: "Shoot for brands and businesses like a professional with commercial photography mastery.",
      duration: "10 hours",
      lessons: 30,
      level: "Advanced",
      category: "photography",
      image: "https://images.unsplash.com/photo-1464822759844-d62ea2ef67f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$199",
      featured: true,
      instructor: "Alex Johnson",
      rating: 4.9,
      students: 567
    },
    {
      id: 4,
      title: "Photoshop Masterclass",
      description: "Master Adobe Photoshop with advanced compositing, retouching, and creative techniques.",
      duration: "12 hours",
      lessons: 36,
      level: "Intermediate",
      category: "editing",
      image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$179",
      featured: false,
      instructor: "Mike Rodriguez",
      rating: 4.7,
      students: 734
    },
    {
      id: 5,
      title: "Photography Business Blueprint",
      description: "Build and scale a successful photography business from the ground up.",
      duration: "5 hours",
      lessons: 15,
      level: "All Levels",
      category: "business",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$99",
      featured: false,
      instructor: "Emily Parker",
      rating: 4.8,
      students: 456
    },
    {
      id: 6,
      title: "Cinematic Videography",
      description: "Create stunning cinematic videos with professional filming and editing techniques.",
      duration: "9 hours",
      lessons: 27,
      level: "Intermediate",
      category: "advanced",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$169",
      featured: true,
      instructor: "Sarah Chen",
      rating: 4.9,
      students: 623
    }
  ];

  const psdFiles = [
    {
      id: 1,
      name: "Professional Portrait Presets",
      category: "Lightroom Presets",
      files: 15,
      compatible: "Lightroom & Photoshop",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$79"
    },
    {
      id: 2,
      name: "Cinematic Color Grading Pack",
      category: "LUTs & Presets",
      files: 25,
      compatible: "Premiere Pro, DaVinci",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$89"
    },
    {
      id: 3,
      name: "Advanced Photoshop Actions",
      category: "PSD Templates",
      files: 20,
      compatible: "Photoshop CC+",
      image: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "$99"
    }
  ];

  const pricingTiers = [
    {
      id: 'basic',
      name: 'Starter Pack',
      price: '$97',
      description: 'Perfect for beginners starting their journey',
      features: [
        '1 Course of Choice',
        '5 PSD Files',
        'Community Access',
        'Email Support',
        'Basic Tutorials',
        'Lifetime Access to Purchased Content'
      ],
      buttonText: 'Get Started'
    },
    {
      id: 'pro',
      name: 'Professional Bundle',
      price: '$297',
      description: 'Most Popular Choice',
      popular: true,
      features: [
        'All 6 Courses',
        'All PSD Files (60+)',
        'Premium Community Access',
        'Priority Email Support',
        'Advanced Tutorials',
        '2 x 1-on-1 Mentoring Sessions',
        'Certificate of Completion',
        'Lifetime Updates'
      ],
      buttonText: 'Get Professional'
    },
    {
      id: 'master',
      name: 'Master Collection',
      price: '$497',
      description: 'For Serious Professionals',
      features: [
        'All Courses + Future Courses',
        'All PSD Files + Future Releases',
        'VIP Community Access',
        '24/7 Priority Support',
        'Master Tutorials Library',
        '4 x 1-on-1 Mentoring Sessions',
        'Premium Certificate',
        'Commercial License',
        'Early Access to New Content'
      ],
      buttonText: 'Become Master'
    }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      {/* Hero Section */}
      <section ref={heroRef} className="py-20 bg-linear-to-br from-gray-900 to-black">
        <div className="container mx-auto px-6 text-center">
          <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 rounded-full px-6 py-2 mb-6">
            <span className="text-yellow-400 font-semibold">🎓 Professional Photography Education</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Master Photography
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transform your photography skills with our premium courses and professional PSD files. 
            Learn from industry experts and elevate your craft to professional levels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-yellow-400 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 transition-colors text-lg">
              Explore Courses
            </button>
            <button className="border-2 border-gray-600 px-8 py-4 rounded-full font-semibold hover:border-yellow-400 hover:text-yellow-400 transition-colors text-lg">
              Watch Free Lessons
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Video Lessons" },
              { number: "60+", label: "PSD Files" },
              { number: "5,000+", label: "Students" },
              { number: "4.9/5", label: "Rating" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-yellow-400">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section ref={coursesRef} className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Premium Courses</h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-8">
              Comprehensive photography courses designed to take your skills to the next level
            </p>
            
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-yellow-400 text-black'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div key={course.id} className="course-card bg-gray-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {course.featured && (
                    <div className="absolute top-4 left-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 rounded-full font-semibold">
                    {course.price}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold">{course.title}</h3>
                  </div>
                  <p className="text-gray-400 mb-4 text-sm">{course.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="flex items-center mr-4">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                      {course.level}
                    </span>
                    <span>👤 {course.instructor}</span>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>📚 {course.lessons} lessons</span>
                    <span>⏱️ {course.duration}</span>
                    <span>⭐ {course.rating}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <button className="flex-1 bg-yellow-400 text-black py-3 rounded-lg font-semibold hover:bg-yellow-300 transition-colors mr-3">
                      Enroll Now
                    </button>
                    <button className="bg-gray-700 text-gray-300 p-3 rounded-lg hover:bg-gray-600 transition-colors">
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PSD Files Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Professional Resources</h2>
          <p className="text-gray-400 text-center text-xl mb-16 max-w-2xl mx-auto">
            Ready-to-use Photoshop files, presets, and templates to speed up your workflow
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {psdFiles.map((file) => (
              <div key={file.id} className="bg-gray-900 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img 
                    src={file.image} 
                    alt={file.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-green-400 text-black px-3 py-1 rounded-full font-semibold">
                    {file.price}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-green-400 mb-2">{file.category}</div>
                  <h3 className="text-xl font-bold mb-3">{file.name}</h3>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>📁 {file.files} files</span>
                    <span>💻 {file.compatible}</span>
                  </div>
                  <button className="w-full bg-green-400 text-black py-3 rounded-lg font-semibold hover:bg-green-300 transition-colors">
                    Download Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Choose Your Learning Path</h2>
          <p className="text-gray-400 text-center text-xl mb-16 max-w-2xl mx-auto">
            Flexible pricing options for photographers at every level of their journey
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier) => (
              <div 
                key={tier.id}
                className={`pricing-card relative rounded-2xl p-8 transition-all duration-300 ${
                  tier.popular 
                    ? 'bg-linear-to-br from-yellow-400 to-orange-500 text-black scale-105 shadow-2xl' 
                    : 'bg-gray-800 text-white'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black text-yellow-400 px-4 py-1 rounded-full font-semibold text-sm">
                    MOST POPULAR
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <p className={`mb-6 ${tier.popular ? 'text-gray-800' : 'text-gray-400'}`}>
                  {tier.description}
                </p>
                
                <div className="text-4xl font-bold mb-6">
                  {tier.price}
                  <span className="text-lg font-normal">/ lifetime</span>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="mr-3">✅</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`w-full py-4 rounded-lg font-semibold transition-colors ${
                    tier.popular 
                      ? 'bg-black text-yellow-400 hover:bg-gray-900' 
                      : 'bg-yellow-400 text-black hover:bg-yellow-300'
                  }`}
                >
                  {tier.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-yellow-400 to-orange-500 text-black">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Start Your Photography Journey Today
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Join thousands of photographers who have transformed their skills with our courses and resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-black text-yellow-400 px-12 py-4 rounded-full text-lg font-semibold hover:bg-gray-900 transition-colors">
              Get Full Access Now
            </button>
            <button className="border-2 border-black px-12 py-4 rounded-full text-lg font-semibold hover:bg-black hover:text-yellow-400 transition-colors">
              Free Sample Lesson
            </button>
          </div>
          <p className="mt-6 text-gray-800">
            ⚡ 30-day money-back guarantee • Lifetime access • Free updates
          </p>
        </div>
      </section>
    </div>
  );
};

export default Courses;