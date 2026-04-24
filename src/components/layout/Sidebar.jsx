import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, FileText, FlaskConical, Settings, Shield } from "lucide-react";

export function Sidebar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/", icon: <LayoutDashboard size={20} /> },
    { name: "Patients", path: "/patients", icon: <Users size={20} /> },
    { name: "Records", path: "/records", icon: <FileText size={20} /> },
    { name: "Lab Reports", path: "/lab-reports", icon: <FlaskConical size={20} /> },
    { name: "Users", path: "/users", icon: <Shield size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-screen fixed inset-y-0 left-0">
      <div className="p-6 flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <Shield size={20} className="text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">EHS Dashboard</h1>
      </div>
      
      <nav className="flex-1 mt-6 px-4 space-y-2">
        {links.map((link) => {
          const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
          return (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors group ${
                isActive 
                  ? "bg-primary text-white" 
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <div className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}>
                {link.icon}
              </div>
              <span className="font-medium">{link.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex flex-shrink-0 items-center justify-center text-white font-bold">
            JD
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">Dr. John Doe</p>
            <p className="text-xs text-gray-400 truncate">Administrator</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
