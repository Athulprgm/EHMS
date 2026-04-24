import { useState } from "react";
import { UploadCloud, FileText, CheckCircle2, Search, Download } from "lucide-react";
import { lab_reports, patients } from "../data/mockData";

export function LabReports() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Lab Reports</h1>
        <p className="text-gray-500 mt-1">Manage and view diagnostic reports</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-dashed border-gray-300 flex flex-col items-center justify-center text-center hover:bg-gray-50/50 transition-colors cursor-pointer group">
        <div className="w-16 h-16 rounded-full bg-blue-50 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <UploadCloud size={32} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Upload New Report</h3>
        <p className="text-sm text-gray-500 max-w-sm">
          Drag and drop your PDF or image files here, or click to browse. simulated upload (no backend)
        </p>
        <button className="mt-4 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 shadow-sm">
          Select Files
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search reports by patient or file name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50/80 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold">File Name</th>
                <th className="px-6 py-4 font-semibold">Patient</th>
                <th className="px-6 py-4 font-semibold">Date</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {lab_reports.map((report) => {
                const patient = patients.find(p => p.id === report.patient_id);
                return (
                  <tr key={report.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <FileText size={18} className="text-gray-400" />
                        <span className="font-medium text-primary hover:underline cursor-pointer">{report.file}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-medium">{patient?.name || 'Unknown'}</td>
                    <td className="px-6 py-4 text-gray-600">{report.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1.5">
                        <CheckCircle2 size={16} className="text-green-500" />
                        <span className="text-xs font-medium text-gray-700 capitalize">{report.status}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-primary transition-colors opacity-0 group-hover:opacity-100 p-2 hover:bg-blue-50 rounded-lg">
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
