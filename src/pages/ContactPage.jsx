import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial="hidden"
        animate="show"
        variants={container}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={item} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Our Team</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our properties or services? Reach out to our expert agents who are ready to assist you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div 
            variants={item}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Information</h2>
              
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FiMail className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Email</h3>
                    <p className="text-gray-600">info@addressly.com</p>
                    <p className="text-gray-600">support@addresslyrealestate.com</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FiPhone className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-gray-600">Mon-Fri: 9am-6pm</p>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-start"
                >
                  <div className="bg-purple-100 p-3 rounded-full mr-4">
                    <FiMapPin className="text-red-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Office</h3>
                    <p className="text-gray-600">123  Estate Ave</p>
                    <p className="text-gray-600">New York, NY 10001</p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                    <motion.a
                      key={social}
                      whileHover={{ y: -3 }}
                      href="#"
                      className="bg-gray-100 hover:bg-gray-200 p-3 rounded-full transition-colors"
                    >
                      <span className="sr-only">{social}</span>
                      <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            variants={item}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
              
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 text-red-700 px-4 py-3 rounded mb-6"
                >
                  Thank you! Your message has been sent successfully.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <FiSend className="mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Map Section */}
        <motion.div 
          variants={item}
          className="mt-16 bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Find Our Office</h2>
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
              {/* Replace with your actual map embed */}
              <div className="w-full h-96 flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
                <p className="text-gray-500">Map would be displayed here</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
