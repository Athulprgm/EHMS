import { createContext, useState, useEffect, useContext } from 'react';
import { patients as mockPatients, records as mockRecords, lab_reports as mockReports, users as mockUsers } from '../data/mockData';

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export function AppProvider({ children }) {
  // Initialize from LocalStorage or fallback to mock data
  const [users, setUsers] = useState(() => {
    const local = localStorage.getItem('app_users');
    if (local) return JSON.parse(local);
    // Add default passwords to mock users for login capability
    return mockUsers.map(u => ({ ...u, password: 'password123' }));
  });
  
  const [session, setSession] = useState(() => JSON.parse(localStorage.getItem('app_session')) || null);
  const [patients, setPatients] = useState(() => JSON.parse(localStorage.getItem('app_patients')) || mockPatients);
  const [records, setRecords] = useState(() => JSON.parse(localStorage.getItem('app_records')) || mockRecords);
  const [labReports, setLabReports] = useState(() => JSON.parse(localStorage.getItem('app_lab_reports')) || mockReports);

  // Sync to LS 
  useEffect(() => { localStorage.setItem('app_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('app_session', JSON.stringify(session)); }, [session]);
  useEffect(() => { localStorage.setItem('app_patients', JSON.stringify(patients)); }, [patients]);
  useEffect(() => { localStorage.setItem('app_records', JSON.stringify(records)); }, [records]);
  useEffect(() => { localStorage.setItem('app_lab_reports', JSON.stringify(labReports)); }, [labReports]);

  // Auth Operations
  const register = (name, email, password, role = "nurse") => {
    if (users.find(u => u.email === email)) return { error: "Email already exists" };
    const newUser = { id: Date.now(), name, email, password, role, status: "Active" };
    setUsers([...users, newUser]);
    return { success: true };
  };

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { error: "Invalid credentials" };
    setSession(user);
    return { success: true };
  };

  const logout = () => {
    setSession(null);
  };

  // Generic CRUD
  const addPatient = (patient) => setPatients([...patients, { id: Date.now(), ...patient }]);
  const updatePatient = (id, data) => setPatients(patients.map(p => p.id === id ? { ...p, ...data } : p));
  const deletePatient = (id) => setPatients(patients.filter(p => p.id !== id));
  
  const addRecord = (record) => setRecords([...records, { id: Date.now(), ...record }]);
  const updateRecord = (id, data) => setRecords(records.map(r => r.id === id ? { ...r, ...data } : r));
  const deleteRecord = (id) => setRecords(records.filter(r => r.id !== id));

  const addLabReport = (report) => setLabReports([...labReports, { id: Date.now(), ...report }]);
  
  const addUser = (user) => setUsers([...users, { id: Date.now(), ...user }]);
  const deleteUser = (id) => setUsers(users.filter(u => u.id !== id));

  return (
    <AppContext.Provider value={{
      users, session, patients, records, labReports,
      register, login, logout,
      addPatient, updatePatient, deletePatient,
      addRecord, updateRecord, deleteRecord,
      addLabReport,
      addUser, deleteUser
    }}>
      {children}
    </AppContext.Provider>
  );
}
