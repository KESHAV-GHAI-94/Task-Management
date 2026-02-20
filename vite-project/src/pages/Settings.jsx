import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from "../components/Navbar"
const Settings = () => {
  return (
    <div>
        <div className="flex min-h-screen w-full bg-gray-100 overflow-x-hidden">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Navbar />
        </div>
        </div>
    </div>
  );
};

export default Settings;