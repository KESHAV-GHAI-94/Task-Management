import { useEffect, useState } from "react";
import Api from "../../Api"
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
  useEffect(() => {
    const fetchGroups = async () => {
      const res = await Api.get("/user/groups", {
        headers: {
          "Cache-Control": "no-cache"
        }
      });
      setGroups(res.data.groups);
    };
    fetchGroups();
  }, []);
  return (
    <div>
      <div className="bg-white rounded-xl mt-3 md:mt-0 shadow-sm p-4 sm:p-5">
        <div className="flex items-center justify-between pe-1 mb-2">
            <Link to="/groups">
          <div className="flex items-center gap-2">
            <UsersRound className="text-blue-500" size={20} />
            <h2 className="font-semibold text-sm md:text-lg text-gray-800">Groups</h2>
          </div></Link>
          {groups.length > groupsPerPage && (
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  setCurrentGroupPage((prev) => Math.max(prev - 1))
                }
                disabled={currentGroupPage === 0}
                className="flex items-center cursor-pointer justify-center h-6 w-6  md:w-8 md:h-8 rounded-md border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
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
                className="flex items-center cursor-pointer justify-center h-6 w-6  md:w-8 md:h-8 rounded-md border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
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
              <Link to={`/groups/${group.id}/members`} key={group.id} className="GroupData">
              <div
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
