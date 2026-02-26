import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import CreateGroupModal from "../modals/CreateGroupModal";

const Layout = () => {
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
      <div className="hidden md:block h-screen">
        <Sidebar />
      </div>
      <div className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${sidebarOpen ? "visible" : "invisible"}`}>
        <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${ sidebarOpen ? "opacity-20" : "opacity-0"}`}
          onClick={() => setSidebarOpen(false)}/>
        <div
          className={`absolute top-0 left-0 h-full w-64 transform bg-taupe-800 transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar  closeSidebar={() => setSidebarOpen(false)} />
        </div>
      </div>
      <div className="flex flex-col flex-1 h-screen overflow-hidden">
        <Navbar
          onCreateGroup={() => setShowModal(true)}
          onToggleSidebar={() => setSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
      {showModal && (
        <CreateGroupModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default Layout;