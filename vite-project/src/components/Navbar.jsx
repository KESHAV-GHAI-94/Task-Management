import React from "react";

const Navbar = () => {

  return (

    <div className="bg-white shadow px-6 py-3 flex justify-between">

      <div className="">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Dashboard
            </h1>

          </div>

      <div className="flex gap-4">

        <button className="bg-blue-500 text-white px-4 py-1 rounded">
          + Create Task
        </button>

        <button className="bg-green-500 text-white px-4 py-1 rounded">
          + Create Group
        </button>

      </div>

    </div>

  );

};

export default Navbar;
