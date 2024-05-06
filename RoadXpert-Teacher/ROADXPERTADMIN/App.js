// Purpose: Main file for the app, contains the navigation stack for the app.
import React from "react";
import ProfessorApp from "./Router/Profesor";
import AdminApp from "./Router/Admin";

// Main App Component
export default function App() {
  return (
    <>
      <ProfessorApp />
      {/* <AdminApp /> */}
    </>
  );
}
