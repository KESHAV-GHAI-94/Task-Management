import useGroups from "../../hooks/Groups/useGroups";
import { useMemo,useState } from "react";
import { Link } from "react-router-dom";
import { UsersRound } from "lucide-react";
import SortDropdown from "../../components/SortDropdown"
const Groups = () => {
  const [sortType, setSortType] = useState("dateDesc");
  const { groups, loading, setSelectedGroup } = useGroups();
const sortedGroups = useMemo(()=>{
  const sorted = [...groups];
  switch (sortType) {
      case "nameAsc":
        return sorted.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      case "nameDesc":
        return sorted.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      case "dateDesc":
        return sorted.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      default:
        return sorted;
    }
  }, [groups, sortType]);

  return (
    <div className="p-4 sm:p-6 ">
      <div className="flex justify-between items-center mb-4">
  <h2 className="text-xl font-semibold">Your Groups</h2>
  <SortDropdown sortType={sortType} setSortType={setSortType}/>
</div>
      {loading ? (
        <p>Loading...</p>
      ) : groups.length === 0 ? (
        <p>No groups found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 sm:gap-5 ">
          {sortedGroups.map((group) => (
            <Link
              key={group.id}
              to={`/groups/${group.id}/members`}
              onClick={() => setSelectedGroup(group)}
              className="group block"
            >
              <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 transition-all duration-200 hover:shadow-lg hover:border-taupe-400 hover:-translate">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-linear-to-r from-taupe-400 to-taupe-600 text-white flex items-center justify-center font-semibold text-sm sm:text-lg">
                    {group.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h3 className="font-bold text-sm sm:text-base lg:text-lg text-gray-900 group-hover:text-taupe-600 truncate">
                      {group.name}
                    </h3>
                    <span className="text-[10px] sm:text-xs text-gray-500">
                      Group #{group.id}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 sm:mt-5">
                  <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full bg-taupe-100 text-taupe-900 font-medium">
                    {group.role}
                  </span>
                  <div className="flex items-center gap-1 text-gray-600">
                    <UsersRound size={16} className="sm:w-[18px] sm:h-[18px]" />
                    <span className="text-xs sm:text-sm font-medium">
                      {group.memberCount}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Groups;
