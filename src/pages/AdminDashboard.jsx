import { useState } from 'react';
import { 
  FiHome, 
  FiUsers, 
  FiDollarSign, 
  FiPieChart, 
  FiSettings,
  FiBell,
  FiSearch,
  FiMenu
} from 'react-icons/fi';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample data
  const stats = [
    { title: 'Total Properties', value: '142', change: '+12%', icon: <FiHome /> },
    { title: 'Active Listings', value: '89', change: '+5%', icon: <FiHome /> },
    { title: 'Agents', value: '24', change: '+3%', icon: <FiUsers /> },
    { title: 'Monthly Revenue', value: '$48,500', change: '+18%', icon: <FiDollarSign /> }
  ];

  const recentProperties = [
    { id: 1, address: '123 Main St', price: '$450,000', status: 'Active', agent: 'Sarah Johnson' },
    { id: 2, address: '456 Oak Ave', price: '$320,000', status: 'Pending', agent: 'Mike Chen' },
    { id: 3, address: '789 Pine Rd', price: '$525,000', status: 'Sold', agent: 'Lisa Wong' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-blue-800 text-white ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold">RealEstatePro</h1>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-xl">
            <FiMenu />
          </button>
        </div>
        <nav className="mt-8">
          {[
            { icon: <FiPieChart />, name: 'Dashboard', id: 'dashboard' },
            { icon: <FiHome />, name: 'Properties', id: 'properties' },
            { icon: <FiUsers />, name: 'Agents', id: 'agents' },
            { icon: <FiUsers />, name: 'Clients', id: 'clients' },
            { icon: <FiDollarSign />, name: 'Transactions', id: 'transactions' },
            { icon: <FiSettings />, name: 'Settings', id: 'settings' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center w-full p-4 ${activeTab === item.id ? 'bg-blue-700' : 'hover:bg-blue-600'}`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="ml-3">{item.name}</span>}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-96">
            <FiSearch className="text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none w-full" 
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative">
              <FiBell className="text-xl" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
            </button>
            <div className="flex items-center">
              <img 
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="Admin" 
                className="h-8 w-8 rounded-full mr-2" 
              />
              {sidebarOpen && <span>Admin</span>}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                    <p className="text-green-500 text-sm mt-1">{stat.change}</p>
                  </div>
                  <div className="text-blue-500 text-2xl p-2 bg-blue-100 rounded-full">
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Properties Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">Recent Properties</h3>
              <button className="text-blue-500 hover:text-blue-700">View All</button>
            </div>
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Agent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentProperties.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{property.id}</td>
                    <td className="px-6 py-4 font-medium">{property.address}</td>
                    <td className="px-6 py-4">{property.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        property.status === 'Active' ? 'bg-green-100 text-green-800' :
                        property.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">{property.agent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;