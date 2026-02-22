  import React, { useState, useEffect } from "react";
  import Sidebar from "../components/Sidebar";
  import Navbar from "../components/Navbar";
  import CreateGroupModal from "../components/modals/CreateGroupModal";
  import axios from "axios";
  import {Link} from "react-router-dom"
  import {UsersRound} from "lucide-react"
  const Groups = () => {
    const [showModal, setShowModal] = useState(false);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchGroups = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/user/groups",
          { withCredentials: true }
        );
        setGroups(res.data.groups);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchGroups();
    }, []);
    return (

      <div className="flex min-h-screen w-full bg-gray-100 overflow-x-hidden">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="flex-1">
          <Navbar onCreateGroup={() => setShowModal(true)} />
          {showModal && (
            <CreateGroupModal
              onClose={() => setShowModal(false)}
            />
          )}
          <div className="p-4 sm:p-6">
            <h2 className="text-xl font-semibold mb-3.5">Your Groups</h2>
            {loading ? (
              <p>Loading...</p>
            ) : groups.length === 0 ? (
              <p>No groups found</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2   gap-2 sm:gap-4">
                {groups.map(group => (
                  <>
                  <Link to={`/groups/${group.id}/members`} className="GroupData">
                  <div
                    key={group.id}
                    className="bg-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 rounded-xl shadow hover:shadow-md cursor-pointer transition"
                  >
                    <h3 className="font-semibold text-base sm:text-lg">
                      {group.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Role: {group.role}
                    </p>
                    <p className="text-sm flex text-gray-500">
                      <UsersRound className="text-blue-500" size={20} /> {group.memberCount}
                    </p>
                  </div>
                  </Link>
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default Groups;