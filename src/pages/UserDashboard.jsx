import { useState, useEffect } from 'react';
import { FiHeart, FiUser, FiMail, FiHome, FiMapPin, FiDollarSign } from 'react-icons/fi';
import { motion } from 'framer-motion';

const UserDashboard = () => {
  // User state
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  });

  // Listings data with working image URLs
  const [listings, setListings] = useState([
    {
      id: 1,
      title: 'Luxury Penthouse',
      price: 1200000,
      location: 'Manhattan, NY',
      bedrooms: 3,
      bathrooms: 2,
      size: 1800,
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
      saved: false
    },
    {
      id: 2,
      title: 'Beachfront Villa',
      price: 850000,
      location: 'Malibu, CA',
      bedrooms: 4,
      bathrooms: 3,
      size: 2200,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      saved: false
    },
    {
      id: 3,
      title: 'Modern Loft',
      price: 650000,
      location: 'Chicago, IL',
      bedrooms: 2,
      bathrooms: 2,
      size: 1500,
      image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
      saved: false
    }
  ]);

  // Load saved listings from localStorage
  useEffect(() => {
    const savedListings = localStorage.getItem('savedListings');
    if (savedListings) {
      const savedIds = JSON.parse(savedListings);
      setListings(prev => prev.map(listing => ({
        ...listing,
        saved: savedIds.includes(listing.id)
      })));
    }
  }, []);

  // Toggle saved status and update localStorage
  const toggleSaved = (id) => {
    setListings(prev => {
      const updated = prev.map(listing => 
        listing.id === id ? { ...listing, saved: !listing.saved } : listing
      );
      
      // Update localStorage
      const savedIds = updated.filter(l => l.saved).map(l => l.id);
      localStorage.setItem('savedListings', JSON.stringify(savedIds));
      
      return updated;
    });
  };

  // Filter listings
  const [filter, setFilter] = useState('all');
  const filteredListings = listings.filter(listing => 
    filter === 'all' || (filter === 'saved' && listing.saved)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">My Dashboard</h1>
          <div className="flex items-center space-x-4">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="h-10 w-10 rounded-full"
            />
            <span className="text-gray-700">{user.name}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* User Info Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <div className="flex items-center space-x-6">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="h-20 w-20 rounded-full"
            />
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <div className="flex items-center mt-2 text-gray-600">
                <FiMail className="mr-2" />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 font-medium ${filter === 'all' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            All Listings
          </button>
          <button
            onClick={() => setFilter('saved')}
            className={`px-4 py-2 font-medium ${filter === 'saved' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Saved Properties
          </button>
        </div>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => toggleSaved(listing.id)}
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur rounded-full shadow-sm"
                  aria-label={listing.saved ? "Remove from saved" : "Save property"}
                >
                  <FiHeart
                    className={`w-5 h-5 ${listing.saved ? 'text-red-500 fill-red-500' : 'text-gray-400 hover:text-red-400'}`}
                  />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <FiMapPin className="mr-2" />
                  <span>{listing.location}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-4 text-sm text-gray-500">
                    <span>{listing.bedrooms} beds</span>
                    <span>{listing.bathrooms} baths</span>
                    <span>{listing.size} sq.ft</span>
                  </div>
                  <div className="flex items-center text-blue-600 font-medium">
                    <FiDollarSign />
                    <span>{listing.price.toLocaleString()}</span>
                  </div>
                </div>
                <button className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FiHome className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              {filter === 'saved' ? 'No saved properties' : 'No listings available'}
            </h3>
            <p className="mt-1 text-gray-500">
              {filter === 'saved' 
                ? 'Save properties to see them here' 
                : 'Check back later for new listings'}
            </p>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default UserDashboard;