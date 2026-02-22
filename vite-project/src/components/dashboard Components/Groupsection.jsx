import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight, UsersRound } from "lucide-react";
import {Link} from "react-router-dom"
const Groupsection = () => {
  const [groups, setGroups] = useState([]);
  const [currentGroupPage, setCurrentGroupPage] = useState(0);
  const groupsPerPage = 3;
  const totalGroupPages = Math.ceil(groups.length / groupsPerPage);
  const visibleGroups = groups.slice(
    currentGroupPage * groupsPerPage,
    currentGroupPage * groupsPerPage + groupsPerPage,
  );
  const fetchGroups = async () => {
    const res = await axios.get("http://localhost:4000/user/groups", {
      withCredentials: true,
    });
    setGroups(res.data.groups);
  };
  useEffect(() => {
    fetchGroups();
  }, []);
  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
        <div className="flex items-center justify-between pe-1 mb-2">
            <Link to="/groups">
          <div className="flex items-center gap-2">
            <UsersRound className="text-blue-500" size={20} />
            <h2 className="font-semibold text-lg text-gray-800">Groups</h2>
          </div></Link>
          {groups.length > groupsPerPage && (
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setCurrentGroupPage((prev) => Math.max(prev - 1))
                }
                disabled={currentGroupPage === 0}
                className="flex items-center z-50 justify-center w-8 h-8 rounded-md border border-gray-200 hover:bg-gray-100disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() =>
                  setCurrentGroupPage((prev) =>
                    Math.min(prev + 1, totalGroupPages - 1),
                  )
                }
                disabled={currentGroupPage === totalGroupPages - 1}
                className="flex items-center z-50 justify-center w-8 h-8 rounded-md border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
        {/* Groups list */}
        {groups.length === 0 ? (
          <p className="text-gray-400  bg-[#F4F4F9] text-sm">No groups found</p>
        ) : (
          <div >
            {visibleGroups.map((group) => (
              <Link to={`/groups/${group.id}/members`} className="GroupData">
              <div
                key={group.id}
                className="flex bg-[#F4F4F9]  items-center justify-between p-2.5 mb-1 rounded-xl hover:bg-blue-50 cursor-pointer transition group"
              >
                <span className="font-medium text-sm sm:text-base text-gray-800 group-hover:text-blue-600">
                  {group.name}
                </span>
                <span className="text-xs sm:text-sm text-gray-400 bg-gray-100 px-2 py-0.5 rounded">
                  {group.role}
                </span>
              </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Groupsection;
