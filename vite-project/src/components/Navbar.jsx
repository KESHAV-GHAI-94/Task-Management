  import React,{useEffect,useState} from "react";
  import { useLocation,Link} from "react-router-dom";
  import {Clock} from "lucide-react";
  const Navbar = ({ onCreateGroup }) => {
    const [Time,setTime] = useState();
    const location = useLocation();
  useEffect(() => {
      const updateTime = () => {
        const now = new Date();
        setTime(now.toLocaleString());
      };
      updateTime();
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
    }, []);
    const PageTitle = () => {

  switch (true) {

    case location.pathname.startsWith("/dashboard"):
      return "Dashboard";

    case location.pathname.startsWith("/groups"):
      return "Groups";

    case location.pathname.startsWith("/tasks"):
      return "Tasks";

    case location.pathname.startsWith("/kanban"):
      return "Kanban";

    case location.pathname.startsWith("/settings"):
      return "Settings";

    default:
      return "Dashboard";
  }

};

    return (
      <div className="bg-taupe-100 border-b border-taupe-200 px-6 py-3 flex justify-between items-center shadow-sm">
        <h1 className="text-xl sm:text-2xl font-semibold text-taupe-800">
          {PageTitle()}
        </h1>

        <div className="flex gap-20 text-center">
          <div className="flex text-center gap-3 cursor-pointer items-center "><Clock />
    <div className="text-center clock bg-taupe-300 px-3 rounded-xl text-lg" id="localTime">{Time}</div>
  </div>
          <div className="flex gap-3">
          {location.pathname==="/groups" &&(
          <button className="
            bg-taupe-500
            hover:bg-taupe-600
            text-white
            px-4
            py-1.5
            rounded-lg
            text-sm
            transition
          "
          onClick={onCreateGroup}>
            + Create Group
          </button>
          )}
          <Link to="/tasks">
          <button className="
            bg-taupe-700
            hover:bg-taupe-800
            text-white
            px-4
            py-1.5
            rounded-lg
            text-sm
            transition
          ">
            + Create Task
          </button>
          </Link>
        </div>
      </div>
      </div>
    );
  };



  export default Navbar;