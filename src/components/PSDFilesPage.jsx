// pages/PSDFilesPage.js
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavLink } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';
// Import required modules
import { Navigation, Pagination, Zoom, Thumbs } from 'swiper/modules';

gsap.registerPlugin(ScrollTrigger);

const PSDFilesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
  const heroRef = useRef(null);
  const productsRef = useRef(null);
  const categoriesRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialsRef = useRef([]);

  // PSD File Categories
  const categories = [
    { id: 'all', name: 'All Products', icon: '📁' },
    // Photo Editing Essentials
    { id: 'presets', name: 'Lightroom Presets', icon: '🎨' },
    { id: 'actions', name: 'Photoshop Actions', icon: '⚡' },
    { id: 'lut', name: 'LUTs', icon: '🎬' },
    { id: 'brushes', name: 'Brushes', icon: '🖌️' },
    // PSD File Categories
    { id: 'wedding', name: 'Wedding PSD Files', icon: '💍' },
    { id: 'album', name: 'Album PSD Templates', icon: '📘' },
    { id: 'babyshoot', name: 'Baby Shoot PSD', icon: '👶' },
    { id: 'birthday', name: 'Birthday PSD Templates', icon: '🎉' },
    { id: 'festival', name: 'Festival PSD Files', icon: '🪔' },
    { id: 'poster', name: 'Poster / Banner PSD', icon: '🖼️' },
    { id: 'invitation', name: 'Invitation Card PSD', icon: '✉️' },
    { id: 'idcard', name: 'ID Card PSD Templates', icon: '🪪' },
    { id: 'certificate', name: 'Certificate PSD Templates', icon: '🏅' }
  ];

  // Enhanced PSD Products with more images for slideshow
  const psdProducts = [
    {
      id: 1,
      name: "Cinematic Wedding Presets",
      category: "presets",
      description: "Professional Lightroom presets that give your wedding photos a cinematic, film-like look.",
      features: ["15 unique presets", "Compatible with Lightroom CC", "Works on all RAW files", "Color grading included", "One-click apply", "Non-destructive editing"],
      compatibility: ["Lightroom Classic", "Lightroom CC", "Adobe Camera Raw"],
      fileType: ".lrtemplate, .xmp",
      fileSize: "85 MB",
      rating: 4.9,
      sales: 1247,
      price: 89,
      discountPrice: 59,
      featured: true,
      previewImage: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      beforeAfterImages: [
        {
          before: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=50",
          after: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ],
      layersPreview: [
        "https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      downloadLink: "#",
      videoTutorial: "#",
      whatsInside: [
        "15 Custom Lightroom Presets",
        "Installation Guide PDF",
        "Video Tutorials (30 mins)",
        "Before/After Examples",
        "Bonus: Mobile Presets"
      ]
    },
    {
      id: 2,
      name: "Professional Portrait Actions",
      category: "actions",
      description: "Advanced Photoshop actions for professional portrait retouching and enhancement.",
      features: ["10 retouching actions", "Skin smoothing", "Eye enhancement", "Hair detailing", "Frequency separation", "Color correction"],
      compatibility: ["Photoshop CC 2018+"],
      fileType: ".atn",
      fileSize: "45 MB",
      rating: 4.8,
      sales: 892,
      price: 79,
      discountPrice: 49,
      featured: true,
      previewImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1504257432389-52343af06ae3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1494790108755-2616b786d4d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      beforeAfterImages: [
        {
          before: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=50",
          after: "https://images.unsplash.com/photo-1494790108755-2616b786d4d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ],
      layersPreview: [
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      downloadLink: "#",
      videoTutorial: "#",
      whatsInside: [
        "10 Photoshop Actions (.atn)",
        "Layer Structure Guide",
        "Custom Brush Set",
        "PSD Template Files",
        "Video Walkthrough"
      ]
    },
    {
      id: 3,
      name: "Instagram Story Templates",
      category: "templates",
      description: "Professionally designed PSD templates for Instagram stories with editable layers.",
      features: ["50+ templates", "Fully editable", "Smart objects", "Multiple themes", "Organized layers", "Free fonts included"],
      compatibility: ["Photoshop CC+"],
      fileType: ".psd",
      fileSize: "120 MB",
      rating: 4.7,
      sales: 1567,
      price: 69,
      discountPrice: 39,
      featured: false,
      previewImage: "https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1611605698323-2323c516a379?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      beforeAfterImages: [],
      layersPreview: [
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      downloadLink: "#",
      videoTutorial: "#",
      whatsInside: [
        "50+ Instagram Story PSDs",
        "Font Files (.ttf)",
        "Color Palette Guide",
        "Social Media Sizes Guide",
        "Free Stock Photos"
      ]
    },
    {
      id: 4,
      name: "Cinematic LUT Pack",
      category: "lut",
      description: "Professional LUTs for video editing to achieve cinematic color grading.",
      features: ["25 unique LUTs", "For Premiere Pro", "For DaVinci Resolve", "For Final Cut Pro", "Film emulation", "Log correction"],
      compatibility: ["Premiere Pro", "DaVinci Resolve", "Final Cut Pro"],
      fileType: ".cube",
      fileSize: "15 MB",
      rating: 4.9,
      sales: 734,
      price: 89,
      discountPrice: 59,
      featured: true,
      previewImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1519642918688-7e43b19245d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      beforeAfterImages: [
        {
          before: "https://images.unsplash.com/photo-1519642918688-7e43b19245d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=50",
          after: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        }
      ],
      layersPreview: [],
      downloadLink: "#",
      videoTutorial: "#",
      whatsInside: [
        "25 CUBE LUT Files",
        "Installation Guides",
        "Video Examples",
        "Color Theory PDF",
        "Bonus: Film Grain Overlays"
      ]
    },
    {
      id: 5,
      name: "Professional Retouching Brushes",
      category: "brushes",
      description: "Custom Photoshop brushes for professional skin retouching and detailing.",
      features: ["20 custom brushes", "Skin texture", "Hair detailing", "Frequency separation", "Dodge & burn", "Blemish removal"],
      compatibility: ["Photoshop CC 2018+"],
      fileType: ".abr",
      fileSize: "35 MB",
      rating: 4.6,
      sales: 456,
      price: 49,
      discountPrice: 29,
      featured: false,
      previewImage: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      beforeAfterImages: [],
      layersPreview: [
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      downloadLink: "#",
      videoTutorial: "#",
      whatsInside: [
        "20 Photoshop Brushes (.abr)",
        "Brush Settings Guide",
        "Retouching Workflow PDF",
        "Example PSD Files",
        "Video Demonstration"
      ]
    },
    {
      id: 6,
      name: "Wedding Album Templates",
      category: "templates",
      description: "Professional wedding album design templates with editable layouts.",
      features: ["10 album layouts", "Print ready", "300 DPI", "CMYK ready", "Bleed included", "Smart objects"],
      compatibility: ["Photoshop CC+"],
      fileType: ".psd",
      fileSize: "250 MB",
      rating: 4.8,
      sales: 623,
      price: 129,
      discountPrice: 89,
      featured: true,
      previewImage: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
      ],
      beforeAfterImages: [],
      layersPreview: [
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      downloadLink: "#",
      videoTutorial: "#",
      whatsInside: [
        "10 Album Layout PSDs",
        "Print Specifications",
        "Font Files Included",
        "Color Management Guide",
        "Sample Album PDF"
      ]
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      profession: "Wedding Photographer",
      text: "The cinematic presets saved me hours of editing time. My wedding photos have never looked better!",
      rating: 5,
      product: "Cinematic Wedding Presets"
    },
    {
      name: "Mike Rodriguez",
      profession: "Commercial Photographer",
      text: "Best Photoshop actions I've ever purchased. The skin retouching tools are incredible.",
      rating: 5,
      product: "Professional Portrait Actions"
    },
    {
      name: "Emma Wilson",
      profession: "Content Creator",
      text: "The Instagram templates helped me grow my following by 30% in just 2 months!",
      rating: 4,
      product: "Instagram Story Templates"
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? psdProducts 
    : psdProducts.filter(product => product.category === selectedCategory);

  useEffect(() => {
    // Hero animation
    gsap.fromTo(heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    // Categories animation
    if (categoriesRef.current) {
      gsap.fromTo(categoriesRef.current.querySelectorAll('.category-btn'),
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          scrollTrigger: {
            trigger: categoriesRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Products animation
    if (productsRef.current) {
      gsap.fromTo(productsRef.current.querySelectorAll('.product-card'),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: productsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Features animation
    if (featuresRef.current) {
      gsap.fromTo(featuresRef.current.querySelectorAll('.feature-item'),
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Testimonials animation
    testimonialsRef.current.forEach((ref, index) => {
      if (ref) {
        gsap.fromTo(ref,
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: ref,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
  }, [selectedCategory]);

  const addToCart = (product) => {
    setCartItems(prev => [...prev, product]);
    setIsCartOpen(true);
    setTimeout(() => setIsCartOpen(false), 3000);
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setThumbsSwiper(null); // Reset thumbs swiper
    document.body.style.overflow = 'hidden';
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setThumbsSwiper(null);
    document.body.style.overflow = 'unset';
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.discountPrice, 0);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 text-white pt-20">
      {/* Floating Cart */}
      {isCartOpen && (
        <div className="fixed top-24 right-6 z-50 bg-linear-to-r from-green-500 to-emerald-600 rounded-xl p-4 shadow-2xl animate-bounce-in">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">✅</span>
            <div>
              <div className="font-semibold">Added to cart!</div>
              <div className="text-sm opacity-90">{cartItems[cartItems.length - 1]?.name}</div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {cartItems.length > 0 && (
        <div className="fixed top-24 right-6 z-40 bg-gray-800/90 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Your Cart ({cartItems.length})</h3>
            <button 
              onClick={() => setCartItems([])}
              className="text-xs text-gray-400 hover:text-white"
            >
              Clear
            </button>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="truncate max-w-[150px]">{item.name}</div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">${item.discountPrice}</span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-700">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span className="text-green-400">${calculateTotal()}</span>
            </div>
            <button className="w-full mt-3 bg-linear-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow">
              Checkout Now
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section ref={heroRef} className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-linear-to-r from-blue-500 to-purple-500 rounded-full px-4 py-2 mb-6">
              <span className="text-xl">💎</span>
              <span className="font-semibold">Premium Digital Products</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Professional PSD Files
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Download premium Photoshop resources created by industry professionals to enhance your workflow and creativity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-linear-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                Browse Products
              </button>
              <button className="border-2 border-gray-600 px-8 py-4 rounded-full font-semibold hover:border-purple-500 hover:text-purple-400 transition-colors">
                Watch Tutorials
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "5,000+", label: "Digital Assets" },
              { number: "10,000+", label: "Happy Customers" },
              { number: "4.8/5", label: "Average Rating" },
              { number: "24/7", label: "Instant Download" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section ref={categoriesRef} className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Browse by Category</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`category-btn flex items-center space-x-3 px-6 py-4 rounded-xl transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-2xl shadow-blue-500/25'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section ref={productsRef} className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group">
                {product.featured && (
                  <div className="absolute top-4 left-4 z-10 bg-linear-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                    🔥 Featured
                  </div>
                )}
                
                <div 
                  className="relative h-48 overflow-hidden cursor-pointer"
                  onClick={() => openProductModal(product)}
                >
                  <img
                    src={product.previewImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-medium">Quick Preview →</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm">{product.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-gray-500">📦</span>
                        <span className="text-gray-400">{product.sales} sales</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <span className="text-gray-500">⚡</span>
                        <span className="text-gray-400">{product.fileSize}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">${product.discountPrice}</div>
                      <div className="text-sm text-gray-500 line-through">${product.price}</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-linear-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-shadow"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => openProductModal(product)}
                      className="px-4 py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      👁️ Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section ref={featuresRef} className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose Our Products?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Instant Download",
                description: "Get immediate access to all files after purchase. No waiting time."
              },
              {
                icon: "🔄",
                title: "Free Updates",
                description: "All future updates included for free with your purchase."
              },
              {
                icon: "💬",
                title: "Community Support",
                description: "Join our community of photographers and get help when needed."
              },
              {
                icon: "🎓",
                title: "Video Tutorials",
                description: "Step-by-step tutorials included with every product."
              },
              {
                icon: "🔧",
                title: "Easy to Customize",
                description: "All files are fully editable and easy to customize."
              },
              {
                icon: "🛡️",
                title: "Commercial License",
                description: "Use our products in commercial projects without restrictions."
              }
            ].map((feature, index) => (
              <div key={index} className="feature-item bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 text-center group hover:bg-gray-800/50 transition-colors">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">What Photographers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                ref={el => testimonialsRef.current[index] = el}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700"
              >
                <div className="flex text-yellow-400 mb-4">
                  {"★".repeat(testimonial.rating)}
                </div>
                <p className="text-gray-300 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.profession}</div>
                  </div>
                  <div className="text-xs bg-gray-700 px-3 py-1 rounded-full">
                    {testimonial.product}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-r from-blue-600 to-purple-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Level Up Your Editing?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Join thousands of photographers who have transformed their workflow with our premium digital products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-blue-600 px-12 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all">
              View All Products
            </button>
            <NavLink
              to="/courses"
              className="border-2 border-white px-12 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-purple-700 transition-colors"
            >
              Bundle with Courses
            </NavLink>
          </div>
          <p className="mt-6 text-blue-100">
            💰 30-day money-back guarantee • Lifetime access • Free updates
          </p>
        </div>
      </section>

      {/* Product Modal with Swiper Slideshow */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm overflow-y-auto">
          <div className="bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative p-4">
              <button
                onClick={closeProductModal}
                className="absolute top-6 right-6 z-10 bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                ✕
              </button>

              {/* Main Product Gallery with Swiper */}
              <div className="mb-8">
                <Swiper
                  style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                  }}
                  zoom={true}
                  navigation={true}
                  pagination={{ clickable: true }}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[Zoom, Navigation, Pagination, Thumbs]}
                  className="h-96 rounded-xl overflow-hidden"
                >
                  {selectedProduct.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="swiper-zoom-container">
                        <img
                          src={image}
                          alt={`${selectedProduct.name} preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                  {/* Before/After Slides */}
                  {selectedProduct.beforeAfterImages && selectedProduct.beforeAfterImages.map((img, index) => (
                    <SwiperSlide key={`before-after-${index}`}>
                      <div className="relative h-full">
                        <div className="absolute inset-0 flex">
                          <div className="w-1/2 relative">
                            <img
                              src={img.before}
                              alt="Before"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded text-sm">
                              BEFORE
                            </div>
                          </div>
                          <div className="w-1/2 relative">
                            <img
                              src={img.after}
                              alt="After"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4 bg-green-600/70 px-3 py-1 rounded text-sm">
                              AFTER
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/80 px-4 py-2 rounded-full">
                          ↔️ Slide to Compare
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                  {/* Layers Preview Slides */}
                  {selectedProduct.layersPreview && selectedProduct.layersPreview.map((layer, index) => (
                    <SwiperSlide key={`layer-${index}`}>
                      <div className="relative h-full">
                        <img
                          src={layer}
                          alt={`Layer preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 left-4 bg-black/70 px-3 py-1 rounded text-sm">
                          📁 Layer Structure Preview
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Thumbnail Gallery */}
                {selectedProduct.images.length > 1 && (
                  <Swiper
                    onSwiper={setThumbsSwiper}
                    spaceBetween={10}
                    slidesPerView={4}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[Thumbs]}
                    className="mt-4 h-20"
                  >
                    {selectedProduct.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
                        />
                      </SwiperSlide>
                    ))}
                    {selectedProduct.beforeAfterImages && selectedProduct.beforeAfterImages.map((_, index) => (
                      <SwiperSlide key={`thumb-ba-${index}`}>
                        <div className="w-full h-full bg-linear-to-r from-blue-900 to-purple-900 rounded-lg flex items-center justify-center">
                          <span className="text-xs">Before/After</span>
                        </div>
                      </SwiperSlide>
                    ))}
                    {selectedProduct.layersPreview && selectedProduct.layersPreview.map((_, index) => (
                      <SwiperSlide key={`thumb-layer-${index}`}>
                        <div className="w-full h-full bg-linear-to-r from-green-900 to-emerald-900 rounded-lg flex items-center justify-center">
                          <span className="text-xs">Layers</span>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </div>

              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start mb-8">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{selectedProduct.name}</h2>
                    <p className="text-gray-300 text-lg">{selectedProduct.description}</p>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <div className="text-4xl font-bold text-green-400">${selectedProduct.discountPrice}</div>
                    <div className="text-gray-500 line-through">${selectedProduct.price}</div>
                    <div className="text-sm text-gray-400 mt-1">
                      ⭐ {selectedProduct.rating} • 📦 {selectedProduct.sales} sales
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* What's Inside Section */}
                    <div className="bg-gray-900/50 rounded-xl p-5">
                      <h4 className="text-lg font-bold text-white mb-4 flex items-center">
                        <span className="mr-2">📦</span> What's Inside
                      </h4>
                      <ul className="space-y-3">
                        {selectedProduct.whatsInside.map((item, index) => (
                          <li key={index} className="flex items-center text-gray-300">
                            <span className="text-blue-400 mr-3">→</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4">Features</h4>
                      <ul className="space-y-3">
                        {selectedProduct.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-300">
                            <span className="text-green-400 mr-3">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Details */}
                    <div>
                      <h4 className="text-lg font-bold text-white mb-4">Product Details</h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-gray-400 text-sm">Compatibility</div>
                            <div className="text-white text-sm">{selectedProduct.compatibility.join(', ')}</div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-sm">File Type</div>
                            <div className="text-white text-sm">{selectedProduct.fileType}</div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-sm">File Size</div>
                            <div className="text-white text-sm">{selectedProduct.fileSize}</div>
                          </div>
                          <div>
                            <div className="text-gray-400 text-sm">Category</div>
                            <div className="text-white text-sm">
                              {categories.find(c => c.id === selectedProduct.category)?.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-linear-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-5">
                      <h4 className="text-lg font-bold text-white mb-4">Quick Stats</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">{selectedProduct.rating}</div>
                          <div className="text-xs text-gray-400">Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400">{selectedProduct.sales}</div>
                          <div className="text-xs text-gray-400">Sales</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-400">
                            {selectedProduct.images.length + 
                             (selectedProduct.beforeAfterImages?.length || 0) + 
                             (selectedProduct.layersPreview?.length || 0)}
                          </div>
                          <div className="text-xs text-gray-400">Previews</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400">
                            {Math.round((selectedProduct.discountPrice / selectedProduct.price) * 100)}%
                          </div>
                          <div className="text-xs text-gray-400">Off</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      closeProductModal();
                    }}
                    className="flex-1 bg-linear-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    🛒 Add to Cart - ${selectedProduct.discountPrice}
                  </button>
                  <button className="flex-1 bg-linear-to-r from-gray-700 to-gray-800 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-600">
                    ▶️ Watch Tutorial
                  </button>
                  <button className="px-6 bg-linear-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    ⚡ Buy Now
                  </button>
                </div>

                {/* Gallery Navigation Hint */}
                <div className="mt-6 text-center text-gray-400 text-sm">
                  <span className="inline-flex items-center space-x-2">
                    <span>🖱️ Use mouse wheel to zoom • Click and drag to navigate • </span>
                    <span className="text-blue-400">← →</span>
                    <span> for slides</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PSDFilesPage;