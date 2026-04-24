import { Users, FileText, Activity } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export function Dashboard() {
  const { patients, records, users, labReports } = useAppContext();
  const stats = [
    { 
      name: "Total Patients", 
      value: patients.length.toString(), 
      trend: "Total registered",
      icon: <Users className="text-blue-500" size={24} />,
      bg: "bg-blue-50" 
    },
    { 
      name: "Total Reports", 
      value: labReports.length.toString(), 
      trend: "Uploaded reports",
      icon: <FileText className="text-green-500" size={24} />,
      bg: "bg-green-50" 
    },
    { 
      name: "Active Users", 
      value: users.length.toString(), 
      trend: "System staff",
      icon: <Activity className="text-purple-500" size={24} />,
      bg: "bg-purple-50" 
    }
  ];

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2">Welcome back. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-gray-500">
              <span className="text-green-600 font-medium mr-1">{stat.trend.split(' ')[0]}</span>
              {stat.trend.substring(stat.trend.indexOf(' '))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-lg font-semibold text-gray-900">Recent Patients</h3>
            <button className="text-sm font-medium text-primary hover:text-blue-700">View All</button>
          </div>
          <div className="divide-y divide-gray-100">
            {patients.map(p => (
              <div key={p.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                    {p.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{p.name}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Age: {p.age} • Ph: {p.phone}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  p.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {p.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h3 className="text-lg font-semibold text-gray-900">Recent Records</h3>
            <button className="text-sm font-medium text-primary hover:text-blue-700">View All</button>
          </div>
          <div className="divide-y divide-gray-100">
            {records.map(r => {
              const p = patients.find(pat => pat.id === r.patient_id);
              return (
                <div key={r.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-semibold text-gray-900">Patient: {p?.name}</h4>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{r.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{r.note}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
