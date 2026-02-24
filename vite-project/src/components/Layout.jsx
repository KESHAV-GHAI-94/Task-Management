import React,{useState} from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import CreateGroupModal from "./modals/CreateGroupModal";
const Layout = () => {
    const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex min-h-screen w-full bg-gray-100 overflow-x-hidden">
    <div className="hidden md:block">
      <Sidebar />
    </div>
    <div className="flex-1">
      <Navbar onCreateGroup={() => setShowModal(true)} />
        <Outlet />
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