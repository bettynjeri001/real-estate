import React from 'react';
import{ useState, useEffect } from 'react';
import { FiSearch, FiHome, FiMapPin, FiDollarSign, FiAlertCircle, FiHeart, FiPhoneCall, FiVoicemail } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const [selectedCity, setSelectedCity] = useState('london');
  const [priceRange, setPriceRange] = useState([0, 150000]);
  const [propertyType, setPropertyType] = useState('all');
  const [loading, setLoading] = useState(false);
  const [apartments, setApartments] = useState([]);
  const [error, setError] = useState('');

  
  const cities = [
    { value: 'london', label: 'London' },
    { value: 'tokyo', label: 'Tokyo' },
    { value: 'new york', label: 'New York' },
    { value: 'cali', label: 'Cali' },
    { value: 'nairobi', label: 'Nairobi' }
  ];

  const mockData = [
    // London
    {
      id: 1,
      city: 'london',
      type: 'house',
      title: "Mayfair Luxury ",
      price: 850000,
      location: "Mayfair, London",
      bedrooms: 4,
      bathrooms: 5,
      size: 120,
      image:"https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bHV4dXJ5JTIwaG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  
    },
    {
      id: 2,
      city: 'london',
      type: 'condo',
      title: "luxury condo",
      price: 250000,
      location: "Hackney, London",
      bedrooms: 4,
      bathrooms: 5,
      size: 350,
      image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwYXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 3,
      city: 'london',
      type: 'apartment',
      title: "Band Executive Villa",
      price: 300000,
      location: "Springfield, London",
      bedrooms: 2,
      bathrooms: 3,
      size: 400,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
  
    // Tokyo
    {
      id: 4,
      city: 'tokyo',
      type: 'apartment',
      title: "Tokyo City Apartment",
      price: 60000,
      location: "Ginza, Tokyo",
      bedrooms: 2,
      bathrooms: 1,
      size: 100,
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 5,
      city: 'tokyo',
      type: 'house',
      title: "Old Town Family House",
      price: 75000,
      location: "Old Town, Tokyo",
      bedrooms: 3,
      bathrooms: 2,
      size: 180,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 6,
      city: 'tokyo',
      type: 'villa',
      title: "Sano Villa",
      price: 180000,
      location: "Greater Tokyo, Tokyo",
      bedrooms: 4,
      bathrooms: 3,
      size: 300,
      image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZpbGxhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
  
    // New York
    {
      id: 7,
      city: 'new york',
      type: 'apartment',
      title: "Manhattan York Apartment",
      price: 55000,
      location: "Manhattan, New York",
      bedrooms: 2,
      bathrooms: 1,
      size: 110,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 8,
      city: 'new york',
      type: 'house',
      title: "New York Lakeview House",
      price: 90000,
      location: "Brooklyn, New York",
      bedrooms: 3,
      bathrooms: 2,
      size: 200,
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 9,
      city: 'new york',
      type: 'villa',
      title: "Queens Hills Villa",
      price: 120000,
      location: "Queens, New York",
      bedrooms: 4,
      bathrooms: 3,
      size: 280,
      image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHZpbGxhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
  
    // Cali
    {
      id: 10,
      city: 'cali',
      type: 'apartment',
      title: "Easthill Apartment",
      price: 50000,
      location: "Cali, Colombia",
      bedrooms: 2,
      bathrooms: 1,
      size: 100,
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 11,
      city: 'cali',
      type: 'house',
      title: "Rosedale Family House",
      price: 85000,
      location: "Cerrito, Cali",
      bedrooms: 3,
      bathrooms: 2,
      size: 190,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 12,
      city: 'cali',
      type: 'villa',
      title: "Greenfields Villa",
      price: 130000,
      location: "Greenfields, Cali",
      bedrooms: 4,
      bathrooms: 3,
      size: 310,
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdXNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
  
    // Nairobi
    {
      id: 13,
      city: 'nairobi',
      type: 'apartment',
      title: "GTC Apartment",
      price: 48000,
      location: "Westlands, Nairobi",
      bedrooms: 2,
      bathrooms: 1,
      size: 105,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 14,
      city: 'nairobi',
      type: 'house',
      title: "Eden Bungalow",
      price: 70000,
      location: "Ngong, Nairobi",
      bedrooms: 3,
      bathrooms: 2,
      size: 220,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    },
    {
      id: 15,
      city: 'nairobi',
      type: 'villa',
      title: "Elgon View Villa",
      price: 110000,
      location: "Kilimani, Nairobi",
      bedrooms: 4,
      bathrooms: 3,
      size: 290,
      image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHZpbGxhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    }
  ];
  

  const fetchApartments = async () => {
    try {
      setLoading(true);
      setError('');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const filtered = mockData.filter(apt => 
        apt.city === selectedCity &&
        (propertyType === 'all' || apt.type === propertyType) &&
        apt.price >= priceRange[0] &&
        apt.price <= priceRange[1]
      );
      
      setApartments(filtered);
      if(filtered.length === 0) setError('No properties found matching your criteria');
    } catch (err) {
      setError('Failed to fetch properties. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchApartments();
  };

  useEffect(() => {
    fetchApartments();
  }, [selectedCity, priceRange, propertyType]);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c" 
            alt="City" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-center text-white px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Your Dream Home Awaits
          </h1>
          <p className="text-xl md:text-2xl mb-8">
          Redefining luxury one home at a time
          </p>
          <button
            onClick={() => document.querySelector('#searchSection').scrollIntoView({ behavior: 'smooth' })}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-medium"
          >
            Start Searching
          </button>
        </motion.div>
      </div>

      {/* Search Section */}
      <div id="searchSection" className="max-w-7xl mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="flex items-center gap-4 flex-wrap">
              {/* City Selector */}
              <div className="flex-1 min-w-[250px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg appearance-none"
                  >
                    {cities.map(city => (
                      <option key={city.value} value={city.value}>
                        {city.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price Range */}
              <div className="min-w-[250px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range (USD)
                </label>
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <div className="flex gap-2 pl-10">
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([e.target.value, priceRange[1]])}
                      className="w-1/2 py-3 border border-gray-200 rounded-lg"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
                      className="w-1/2 py-3 border border-gray-200 rounded-lg"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>

              {/* Property Type */}
              <div className="min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Property Type
                </label>
                <div className="relative">
                  <FiHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg appearance-none"
                  >
                    <option value="all">All Types</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="villa">Villa</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="self-end h-[52px] px-6 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all flex items-center gap-2"
              >
                <FiSearch className="text-lg" />
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Results Section */}
        <div className="py-8">
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center p-8 bg-white rounded-xl shadow-sm"
            >
              <FiAlertCircle className="mx-auto text-4xl text-gray-400 mb-4" />
              <p className="text-gray-600">{error}</p>
            </motion.div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="animate-pulse">
                    <div className="h-48 bg-gray-200" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                      <div className="h-4 bg-gray-200 rounded w-1/4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : apartments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apartments.map((apartment) => (
                <motion.div
                  key={apartment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img
                    src={apartment.image}
                    alt={apartment.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {apartment.title}
                    </h3>
                    <div className="flex items-center gap-2 text-red-600 mb-3">
                      <FiDollarSign />
                      <span className="font-medium">USD {apartment.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <FiMapPin />
                      <span>{apartment.location}</span>
                    </div>
                    <div className="flex gap-4 text-sm text-red-700">
                      <span>{apartment.bedrooms} beds</span>
                      <span>{apartment.bathrooms} baths</span>
                      <span>{apartment.size} sq.m</span>
                      <button
                type="submit"
                className="self-end h-[52px] px-4 bg-red-400 hover:bg-red-500 text-white font-small rounded-lg transition-all flex items-center gap-1"
              >
                <FiHeart className="text-2xl" />
                {'Add to Wishlist'}
                
              </button>
              <button 
      onClick={() => navigate('./pages/ContactPage')}
      className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded"
    >
      Contact Agent
    </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;