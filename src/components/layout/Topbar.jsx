import { Search, Bell, Menu, LogOut } from "lucide-react";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

export function Topbar() {
  const { session, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex flex-1 items-center">
        <button className="md:hidden mr-4 text-gray-500 hover:text-gray-700">
          <Menu size={24} />
        </button>
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search patients, records..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-blue-400 flex items-center justify-center text-white font-medium cursor-pointer shadow-sm hover:shadow-md transition-shadow">
          {session?.name?.charAt(0) || 'U'}
        </div>
        <button onClick={handleLogout} className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-red-50 transition-colors" title="Logout">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
