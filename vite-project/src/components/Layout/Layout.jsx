import React,{useState} from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import CreateGroupModal from "../modals/CreateGroupModal";
const Layout = () => {
    const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex h-screen w-full bg-gray-100 overflow-hidden">
    <div className="hidden md:block h-screen">
      <Sidebar />
    </div>
    <div className="flex flex-col flex-1 h-screen overflow-hidden">
      <Navbar onCreateGroup={() => setShowModal(true)} />
        <main className="flex-1 overflow-y-auto p-0">
        <Outlet />
        </main>
      </div>
      {showModal && (
        <CreateGroupModal
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Layout;