import { useState, useEffect } from "react";
import { Save, Monitor, Moon, Sun } from "lucide-react";

export function Settings() {
  const [appName, setAppName] = useState(() => localStorage.getItem('ehs_app_name') || "EHS Dashboard");
  const [theme, setTheme] = useState(() => localStorage.getItem('ehs_theme') || "light");
  const [savedMessage, setSavedMessage] = useState('');

  const handleSave = () => {
    localStorage.setItem('ehs_app_name', appName);
    localStorage.setItem('ehs_theme', theme);
    
    // Apply theme class to body
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    setSavedMessage('Settings successfully saved to local storage!');
    setTimeout(() => setSavedMessage(''), 3000);
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 fade-in max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage system configurations</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">General Settings</h3>
          {savedMessage && <span className="text-sm font-medium text-green-600 animate-in fade-in">{savedMessage}</span>}
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Application Name</label>
            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="w-full max-w-md px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <p className="mt-1.5 text-xs text-gray-500">This name will appear in the sidebar and top navigation.</p>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-3">Theme Preferences</label>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setTheme('light')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  theme === 'light' ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Sun size={24} className={`mb-2 ${theme === 'light' ? 'text-primary' : 'text-gray-400'}`} />
                <span className={`text-sm font-medium ${theme === 'light' ? 'text-primary' : 'text-gray-600'}`}>Light Layout</span>
              </button>
              
              <button 
                onClick={() => setTheme('dark')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  theme === 'dark' ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Moon size={24} className={`mb-2 ${theme === 'dark' ? 'text-primary' : 'text-gray-400'}`} />
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-primary' : 'text-gray-600'}`}>Dark Layout</span>
              </button>

              <button 
                onClick={() => setTheme('system')}
                className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
                  theme === 'system' ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Monitor size={24} className={`mb-2 ${theme === 'system' ? 'text-primary' : 'text-gray-400'}`} />
                <span className={`text-sm font-medium ${theme === 'system' ? 'text-primary' : 'text-gray-600'}`}>System Match</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
          <button onClick={handleSave} className="flex items-center space-x-2 bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors shadow-sm focus:ring-4 focus:ring-primary/20">
            <Save size={18} />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
