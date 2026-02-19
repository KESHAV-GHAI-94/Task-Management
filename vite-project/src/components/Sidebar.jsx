import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Columns,
  Users,
  Settings
} from "lucide-react";

const Sidebar = () => {

  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={18} />
    },
    {
      name: "Groups",
      path: "/groups",
      icon: <FolderKanban size={18} />
    },
    {
      name: "My Tasks",
      path: "/mytasks",
      icon: <CheckSquare size={18} />
    },
    {
      name: "Kanban",
      path: "/kanban",
      icon: <Columns size={18} />
    },
    {
      name: "Members",
      path: "/members",
      icon: <Users size={18} />
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={18} />
    }
  ];


  return (

    <div className="
      w-64
      h-screen
      bg-gray-900
      text-white
      flex
      flex-col
      border-r
      border-gray-800
    ">


      {/* Logo */}
      <div className="px-5 py-6 border-b border-gray-800">

        <h1 className="text-xl font-bold tracking-wide">
          Task Manager
        </h1>

      </div>



      {/* Menu */}
      <div className="flex-1 px-3 py-4">

        <ul className="space-y-1">

          {menu.map(item => {

            const isActive = location.pathname === item.path;

            return (

              <li key={item.name}>

                <Link
                  to={item.path}
                  className={`
                    flex items-center gap-3
                    px-3 py-2.5
                    rounded-lg
                    text-sm
                    transition
                    ${isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"}
                  `}
                >

                  {item.icon}

                  {item.name}

                </Link>

              </li>

            );

          })}

        </ul>

      </div>



      {/* Bottom section */}
      <div className="px-4 py-4 border-t border-gray-800 text-xs text-gray-400">

        Logged in as User

      </div>


    </div>

  );

};

export default Sidebar;
