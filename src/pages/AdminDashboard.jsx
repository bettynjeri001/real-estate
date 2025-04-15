import { motion } from 'framer-motion';
import { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('listings');
  const [listings, setListings] = useState([
    { id: 1, title: 'Beachfront Villa', price: 1200000, description: 'Luxury villa with ocean views',  image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80'},
    { id: 2, title: 'Skyline One', price: 650000, description: 'Bold, minimal, and elevated with unmatched skyline views.', image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&auto=format&fit=crop&q=80'},
    { id: 3, title: 'Palms Of Alta', price: 350000, description: 'Lush surroundings meet resort-inspired design in this luxury oasis', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=80' },
    { id: 4, title: 'Azure Heights', price: 200000, description: 'A serene elevation with ocean-hued interiors and open-air design.', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80', },
    { id: 5, title: 'Vantage Point', price: 600000, description: 'perched for privacy and panoramic views.', image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&auto=format&fit=crop&q=80',
    },
    { id: 6, title: 'Opal Ridge', price: 320000, description: 'Understated luxury glows in this hillside gem of glass and stone.', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop&q=80', }
  ]);
  const [isAddingListing, setIsAddingListing] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const addListing = (newListing) => {
    setListings([...listings, {
      ...newListing,
      id: Date.now()
    }]);
    setIsAddingListing(false);
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-6xl mx-auto p-6 min-h-screen bg-gray-50"
    >
      {/* Dashboard Header */}
      <motion.header 
        variants={itemVariants}
        className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200"
      >
        <h1 className="text-3xl font-bold text-gray-800">Agent Dashboard</h1>
        <nav className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2 rounded-md ${activeTab === 'listings' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Listings
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-md ${activeTab === 'analytics' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Analytics
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-md ${activeTab === 'messages' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            Messages
          </motion.button>
        </nav>
      </motion.header>

      {/* Main Content */}
      <motion.main variants={itemVariants}>
        {activeTab === 'listings' && (
          <div className="mt-6">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAddingListing(true)}
              className="px-5 py-3 bg-gray-500 text-white rounded-md cursor-pointer text-lg mb-6"
            >
              + Add New Listing
            </motion.button>

            {isAddingListing && (
              <AddListingForm 
                onAdd={addListing} 
                onCancel={() => setIsAddingListing(false)}
              />
            )}

            <ListingsGrid listings={listings} setListings={setListings} />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Analytics Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-blue-50 p-4 rounded-lg border border-blue-100"
              >
                <h3 className="text-lg font-medium text-red-800">Total Listings</h3>
                <p className="text-3xl font-bold text-red-600">{listings.length}</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-green-50 p-4 rounded-lg border border-green-100"
              >
                <h3 className="text-lg font-medium text-gray-800">Active Views</h3>
                <p className="text-3xl font-bold text-gray-600">124</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-purple-50 p-4 rounded-lg border border-purple-100"
              >
                <h3 className="text-lg font-medium text-red-800">Messages</h3>
                <p className="text-3xl font-bold text-red-600">8</p>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Messages</h2>
            <div className="space-y-4">
              {[1, 2, 3].map(msg => (
                <motion.div 
                  key={msg}
                  whileHover={{ x: 5 }}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium">Inquiry about property #{msg}</h3>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-gray-600 mt-1">Hello, I'm interested in learning more about this property...</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.main>
    </motion.div>
  );
};

// Listing Form Component
const AddListingForm = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    images: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({
      ...formData,
      price: Number(formData.price)
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white p-6 rounded-lg shadow-sm mb-8"
    >
      <h2 className="text-2xl font-semibold mb-4">Add New Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input 
            type="text" 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <div className="relative">
            <span className="absolute left-3 top-2">$</span>
            <input 
              type="number" 
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-full pl-8 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[120px]"
            required
          />
        </div>
        
        <div className="flex justify-end gap-3 pt-4">
          <motion.button 
            type="button"
            onClick={onCancel}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </motion.button>
          <motion.button 
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-red-600"
          >
            Add Listing
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

// Listings Grid Component
const ListingsGrid = ({ listings, setListings }) => {
  const deleteListing = (id) => {
    setListings(listings.filter(listing => listing.id !== id));
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 }
        }
      }}
    >
      {listings.map((listing) => (
        <motion.div 
          key={listing.id}
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1 }
          }}
          whileHover={{ y: -5 }}
          className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
        >
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold text-gray-800">{listing.title}</h3>
              <p className="text-lg font-bold text-red-600">${listing.price.toLocaleString()}</p>
            </div>
            <p className="text-gray-600 mt-2">{listing.description}</p>
            <div className="flex gap-2 mt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 bg-blue-100 text-red-600 rounded-md text-sm"
              >
                Edit
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => deleteListing(listing.id)}
                className="px-3 py-1 bg-red-100 text-red-600 rounded-md text-sm"
              >
                Delete
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 bg-green-100 text-gray-600 rounded-md text-sm ml-auto"
              >
                View
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AdminDashboard;