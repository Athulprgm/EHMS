export const patients = [
  { id: 1, name: "Arun Kumar", age: 34, phone: "9876543210", status: "Active" },
  { id: 2, name: "Fathima", age: 29, phone: "9123456780", status: "Inactive" }
];

export const records = [
  { id: 1, patient_id: 1, note: "Fever, prescribed meds", date: "2026-04-20" }
];

export const lab_reports = [
  { id: 1, patient_id: 2, file: "blood_test.pdf", status: "reviewed", date: "2026-04-22" }
];

export const users = [
  { id: 1, name: "Dr. Smith", email: "smith@ehs.com", role: "Doctor", status: "Active" },
  { id: 2, name: "Admin User", email: "admin@ehs.com", role: "Admin", status: "Active" }
];
