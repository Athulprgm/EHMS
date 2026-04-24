import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, User, Phone, Calendar, FileText, FlaskConical } from "lucide-react";
import { useAppContext } from "../context/AppContext";

export function PatientDetails() {
  const { id } = useParams();
  const { patients, records, labReports } = useAppContext();
  const patient = patients.find(p => p.id === parseInt(id));
  const [activeTab, setActiveTab] = useState("records");

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-semibold text-gray-700">Patient not found</h2>
        <Link to="/patients" className="mt-4 text-primary hover:underline">Return to Patients</Link>
      </div>
    );
  }

  const patientRecords = records.filter(r => r.patient_id === patient.id);
  const patientLabs = labReports.filter(l => l.patient_id === patient.id);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 fade-in">
      <div className="flex items-center space-x-4">
        <Link to="/patients" className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Patient Profile</h1>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-3xl">
          {patient.name.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
            <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
              patient.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {patient.status}
            </span>
          </div>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar size={16} className="mr-2 text-gray-400" />
              <span>{patient.age} years old</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone size={16} className="mr-2 text-gray-400" />
              <span>{patient.phone}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <User size={16} className="mr-2 text-gray-400" />
              <span>ID: PAT-{patient.id.toString().padStart(4, '0')}</span>
            </div>
          </div>
        </div>
        <button className="bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium text-sm transition-colors shadow-sm self-start md:self-center whitespace-nowrap">
          Edit Profile
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
          <button 
            className={`flex-1 py-4 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'records' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('records')}
          >
            <div className="flex items-center justify-center space-x-2">
              <FileText size={18} />
              <span>Clinical Records</span>
            </div>
          </button>
          <button 
            className={`flex-1 py-4 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'labs' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('labs')}
          >
            <div className="flex items-center justify-center space-x-2">
              <FlaskConical size={18} />
              <span>Lab Reports</span>
            </div>
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'records' && (
            <div className="space-y-6">
              {patientRecords.length > 0 ? (
                <div className="relative border-l border-gray-200 ml-3 space-y-8 pb-4">
                  {patientRecords.map((r, i) => (
                    <div key={r.id} className="relative pl-6">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1.5 border border-white"></div>
                      <div className="text-sm font-medium text-gray-500">{r.date}</div>
                      <div className="mt-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-gray-800">{r.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No clinical records found for this patient.</p>
              )}
            </div>
          )}

          {activeTab === 'labs' && (
            <div>
              {patientLabs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {patientLabs.map(l => (
                    <div key={l.id} className="flex items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 mr-4">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{l.file}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{l.date} • {l.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No lab reports found for this patient.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
